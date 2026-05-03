<template>
  <div class="upload-console-view">
    <div class="page-header">
      <h2>Data Ingestion Console</h2>
      <p>Upload unstructured logistics data. The UiPath RPA bot will process it into a standardized Knowledge Base Draft.</p>
    </div>
    
    <div class="content-wrapper">
      <!-- 
        We listen for the 'process-upload' event from the child form.
        When it happens, we immediately emit an 'add-sop' event UP to App.vue,
        passing along the $event (which is the new SOP object data).
      -->
      <UploadForm @process-upload="$emit('add-sop', $event)" />
      
      <!-- Optional: Add a visual sidebar or instructions area for realism -->
      <div class="info-panel">
        <h3>Supported Formats</h3>
        <ul>
          <li><strong>Text:</strong> Direct paste from MS Teams or Telegram.</li>
          <li><strong>PDF:</strong> Scanned manual documents or invoices.</li>
          <li><strong>Word (.docx):</strong> Legacy training materials.</li>
        </ul>
        <p class="note">Note: Processing time varies based on file size. The RPA bot runs on a continuous schedule.</p>
      </div>
    </div>
  </div>
</template>

<script>
// Import the form component so we can use it in the template
import UploadForm from '../components/UploadForm.vue'

export default {
  name: 'UploadConsoleView',
  components: {
    UploadForm
  },
  // Declare the event this view will emit to App.vue
  emits: ['add-sop'] 
}
</script>

<style scoped>
.page-header {
  margin-bottom: 30px;
}

.page-header h2 {
  color: var(--text-dark);
  margin-bottom: 5px;
}

.page-header p {
  color: #666;
  font-size: 15px;
  margin: 0;
}

.content-wrapper {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

/* Make sure the form component takes up a good amount of space */
:deep(.upload-form) {
  flex: 2;
}

.info-panel {
  flex: 1;
  background: var(--surface-warm); /* Using a variable from your App.vue if you have it, or fallback */
  background-color: #fef7e0; 
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ffe082;
}

.info-panel h3 {
  margin-top: 0;
  font-size: 16px;
  color: var(--dhl-red);
}

.info-panel ul {
  padding-left: 20px;
  margin-bottom: 15px;
}

.info-panel li {
  margin-bottom: 8px;
  font-size: 14px;
}

.note {
  font-size: 13px;
  color: #666;
  font-style: italic;
}

/* Responsive design for smaller screens */
@media (max-width: 900px) {
  .content-wrapper {
    flex-direction: column;
  }
  .info-panel {
    width: 100%;
  }
}
</style>