<template>
  <form @submit.prevent="submitUpload" class="upload-form">
    
    <div class="form-group">
      <label>Information Source</label>
      <select v-model="sourceType" required>
        <option value="" disabled>Select the data source...</option>
        <option value="MS Teams">MS Teams Chat</option>
        <option value="Telegram">Telegram Message</option>
        <option value="Email">Email Thread</option>
        <option value="Document">Manual Document / PPT</option>
      </select>
    </div>

    <div class="form-group">
      <label>Upload File (PDF, DOCX, PNG/JPG)</label>
      <input type="file" accept=".pdf, .docx, .png, .jpg" @change="handleFileUpload">
      <small class="hint">Leave blank if you are pasting raw text below.</small>
    </div>

    <div class="form-group">
      <label>Or Paste Raw Unstructured Text</label>
      <textarea 
        v-model="rawText" 
        rows="6" 
        placeholder="Paste the messy chat log, email thread, or rough notes here..."
      ></textarea>
    </div>

    <button type="submit" class="submit-btn">Submit for RPA / AI Processing</button>
    
  </form>
</template>

<script>
export default {
  name: 'UploadForm',
  emits: ['process-upload'],
  
  data() {
    return {
      sourceType: '',
      rawText: '',
      fileName: null
    }
  },
  
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.fileName = file.name;
      }
    },
    
    submitUpload(event) {
      // 1. Create a dynamic title based on whether a file was uploaded!
      let dynamicTitle = `AI Draft generated from ${this.sourceType} data`;
      
      if (this.fileName) {
        // If they attached a file, use the file name in the title
        dynamicTitle = `SOP Draft: Extracted from ${this.fileName}`;
      } else if (this.rawText) {
        // Optional: If they just pasted text, add a little snippet of it
        dynamicTitle = `AI Draft: ${this.rawText.substring(0, 15)}...`;
      }

      // 2. Create the mock SOP using our new dynamic title
      const newSop = {
        id: Date.now(), 
        title: dynamicTitle, // <-- Use the smart title here!
        status: "Draft",
        creator: "System RPA Bot",
        date: new Date().toISOString().split('T')[0], 
        tags: ["Auto-Generated", this.sourceType.replace(/\s+/g, '')]
      };

      // 3. Emit this new SOP object UP
      this.$emit('process-upload', newSop);

      // 4. Clear the form
      this.sourceType = '';
      this.rawText = '';
      this.fileName = null;
      event.target.reset(); 
      
      alert("Raw data submitted successfully! Generating draft SOP...");
    }
  }
}
</script>

<style scoped>
.upload-form {
  background: white;
  padding: 30px;
  border-radius: 8px;
  border: 1px solid var(--border-soft);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.form-group {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-dark);
  font-size: 15px;
}

select, input[type="file"], textarea {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
  background-color: #fafafa;
  transition: border-color 0.2s, box-shadow 0.2s;
}

select:focus, textarea:focus, input[type="file"]:focus {
  outline: none;
  border-color: var(--dhl-red);
  background-color: white;
  box-shadow: 0 0 0 3px rgba(212, 5, 17, 0.1);
}

.hint {
  color: #777;
  font-size: 12px;
  margin-top: 6px;
}

.submit-btn {
  background: var(--dhl-red);
  color: var(--dhl-yellow);
  border: none;
  padding: 14px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
  margin-top: 10px;
}

.submit-btn:hover {
  background: #b3040e; /* Slightly darker DHL Red on hover */
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(212, 5, 17, 0.2);
}
</style>