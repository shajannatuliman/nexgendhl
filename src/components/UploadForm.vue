<template>
  <!-- Added ref="uploadForm" to safely reset the form -->
  <form ref="uploadForm" @submit.prevent="submitUpload" class="upload-form">

    <!-- TITLE -->
    <div class="form-group">
      <label for="doc-title">Document Title</label>
      <input 
        id="doc-title" 
        type="text" 
        v-model="formData.title" 
        placeholder="e.g., Damaged Cargo Report.txt"
        required 
      />
    </div>

    <!-- EXTRACTED CONTENT -->
    <div class="form-group">
      <label for="raw-content">Raw Extracted Content</label>
      <textarea 
        id="raw-content" 
        v-model="formData.content" 
        rows="6" 
        placeholder="Bot will paste extracted text here..."
        required
      ></textarea>
    </div>

    <!-- FILE UPLOAD -->
    <div class="form-group">
      <label for="file-upload">Attach Original File(s)</label>
      <input 
        id="file-upload" 
        type="file" 
        multiple
        accept=".pdf,.docx,.png,.jpg,.jpeg,.txt,.msg"
        @change="handleFileUpload"
        class="file-input"
      />
      <small class="hint">
        Upload original source files (PDF, DOCX, images, emails, etc.)
      </small>
    </div>

    <!-- SHOW SELECTED FILES -->
    <div v-if="formData.files.length > 0" class="file-list">
      <p><b>Selected Files:</b></p>
      <ul>
        <li v-for="(file, index) in formData.files" :key="index">
          {{ file.name }}
        </li>
      </ul>
    </div>

    <!-- SUBMIT -->
    <button id="btn-submit-draft" type="submit" class="submit-btn">
      Process into Draft
    </button>

  </form>
</template>

<script>
export default {
  name: "UploadForm",
  emits: ["process-upload"],

  data() {
    return {
      formData: {
        title: "",
        content: "",
        files: [] 
      }
    };
  },

  methods: {
    handleFileUpload(event) {
      const files = Array.from(event.target.files);
      this.formData.files = files;
    },

    submitUpload() {
      // Safety validation
      if (!this.formData.title || !this.formData.content) {
        alert("Please fill in all required fields");
        return;
      }

      // Build SOP object (RPA-ready structure)
      const newSop = {
        id: Date.now().toString(),
        title: this.formData.title,
        status: "Draft",
        creator: "System RPA Bot",
        date: new Date().toISOString().split("T")[0],
        tags: ["Auto-Generated", "Document", "RPA"],
        content: this.formData.content,
        attachments: this.formData.files.map(file => ({
          name: file.name,
          type: file.type,
          size: file.size
        }))
      };

      // Send to parent
      this.$emit("process-upload", newSop);

      // Reset form data state
      this.formData.title = "";
      this.formData.content = "";
      this.formData.files = [];

      // Safely reset the actual HTML form (clears the file input)
      this.$refs.uploadForm.reset(); 
    }
  }
};
</script>

<style scoped>
/* Your existing CSS remains exactly the same! */
.upload-form {
  background: white;
  padding: 30px;
  border-radius: 8px;
  border: 1px solid var(--border-soft);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 15px;
}

input, textarea {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #d40511;
}

.hint {
  font-size: 12px;
  color: #777;
  margin-top: 5px;
}

.file-list {
  background: #f9f9f9;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
}

.submit-btn {
  background: #d40511;
  color: #ffcc00;
  border: none;
  padding: 14px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
}

.submit-btn:hover {
  background: #b3040e;
}
</style>