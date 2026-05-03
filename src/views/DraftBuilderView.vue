<template>
  <div class="draft-builder">
    <div class="page-header">
      <h2>SOP Draft Builder & Editor</h2>
      <p>Review AI-proposed steps, resolve conflicts, and publish the final SOP.</p>
    </div>

    <!-- If no SOP is selected, show a message -->
    <div v-if="!localSop" class="no-selection">
      <p>Please select an SOP from the Dashboard Viewer to edit.</p>
      <button @click="$emit('go-back')" class="btn-secondary">Back to Dashboard</button>
    </div>

    <!-- The Editor Form -->
    <form v-else @submit.prevent="saveDraft" class="editor-form">
      <div class="form-group">
        <label>Document Title</label>
        <input type="text" v-model="localSop.title" required>
      </div>

      <div class="form-row">
        <div class="form-group half">
          <label>Status</label>
          <select v-model="localSop.status">
            <option value="Draft">Draft (Needs Work)</option>
            <option value="Reviewed">Reviewed (Pending Approval)</option>
            <option value="Published">Published (Live)</option>
          </select>
        </div>
        <div class="form-group half">
          <label>Creator / Reviewer</label>
          <input type="text" v-model="localSop.creator" required>
        </div>
      </div>

      <div class="form-group">
        <label>SOP Steps / Content</label>
        <textarea 
          v-model="sopContent" 
          rows="8" 
          placeholder="1. First step...&#10;2. Second step..."
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-secondary" @click="$emit('go-back')">Cancel</button>
        <button type="submit" class="btn-primary">Save & Update SOP</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'DraftBuilderView',
  props: ['sopToEdit'],
  emits: ['update-sop', 'go-back'],
  data() {
    return {
      // We make a local copy of the prop so we don't mutate the parent's data directly
      localSop: this.sopToEdit ? JSON.parse(JSON.stringify(this.sopToEdit)) : null,
      sopContent: "1. AI Proposed Step 1...\n2. AI Proposed Step 2..." // Mock content
    }
  },
  methods: {
    saveDraft() {
      // Emit the updated SOP back to App.vue
      this.$emit('update-sop', this.localSop);
      alert(`SOP successfully updated to: ${this.localSop.status}`);
    }
  }
}
</script>

<style scoped>
.page-header { margin-bottom: 20px; }
.page-header h2 { color: var(--text-dark); margin-bottom: 5px; }
.page-header p { color: #666; font-size: 15px; margin: 0; }
.no-selection { text-align: center; padding: 40px; background: #eee; border-radius: 8px; }
.editor-form { background: white; padding: 25px; border-radius: 8px; border: 1px solid var(--border-soft); box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.form-group { margin-bottom: 20px; display: flex; flex-direction: column; }
.form-row { display: flex; gap: 20px; }
.half { flex: 1; }
label { font-weight: bold; margin-bottom: 8px; font-size: 14px; }
input, select, textarea { padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-family: inherit; }
input:focus, select:focus, textarea:focus { outline: none; border-color: var(--dhl-red); }
.form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
.btn-primary { background: var(--dhl-red); color: var(--dhl-yellow); border: none; padding: 10px 20px; border-radius: 4px; font-weight: bold; cursor: pointer; }
.btn-secondary { background: #e0e0e0; color: #333; border: none; padding: 10px 20px; border-radius: 4px; font-weight: bold; cursor: pointer; }
.btn-primary:hover { background: #b3040e; }
.btn-secondary:hover { background: #ccc; }
</style>