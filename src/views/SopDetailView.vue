<template>
  <div class="sop-detail-view">
    <div class="detail-header">
      <button class="back-btn" @click="goBack">← Back to Dashboard</button>
    </div>

    <div v-if="!editedSop" class="detail-empty">
      <p>Could not find the selected SOP. Please return to the dashboard and choose a SOP again.</p>
      <button class="back-btn" @click="goBack">Back to Dashboard</button>
    </div>

    <div v-else class="detail-form">
      <div class="form-heading">
        <h2>Edit SOP Details</h2>
        <p class="detail-subtitle">Update the SOP fields below, then save to apply changes.</p>
      </div>

      <div class="form-group">
        <label>Title</label>
        <input v-model="editedSop.title" type="text" />
      </div>

      <div class="form-group horizontal-grid">
        <label>
          Status
          <select v-model="editedSop.status">
            <option>Draft</option>
            <option>Reviewed</option>
            <option>Published</option>
          </select>
        </label>

        <label>
          Creator
          <input v-model="editedSop.creator" disabled />
        </label>
      </div>

      <div class="form-group horizontal-grid">
        <label>
          Date
          <input v-model="editedSop.date" disabled />
        </label>

        <label>
          Tags (comma-separated)
          <input v-model="tagsInput" />
        </label>
      </div>

      <div class="form-group">
        <label>Content</label>
        <textarea v-model="editedSop.content" rows="14"></textarea>
      </div>

      <div class="detail-actions">
        <button class="save-btn" @click="saveSop">Save Changes</button>
        <button class="cancel-btn" @click="goBack">Cancel</button>
        <button class="delete-btn" @click="confirmDelete">Delete SOP</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SopDetailView',
  props: {
    sops: {
      type: Array,
      required: true
    },
    sopToEdit: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      editedSop: null,
      tagsInput: ''
    }
  },
  watch: {
    sopToEdit: {
      immediate: true,
      handler(newSop) {
        this.initializeSop(newSop)
      }
    },
    sops: {
      immediate: true,
      handler() {
        if (!this.editedSop) {
          this.initializeSop(this.sopToEdit)
        }
      }
    },
    '$route.params.id': {
      immediate: true,
      handler() {
        if (!this.sopToEdit) {
          this.initializeSop(null)
        }
      }
    }
  },
  methods: {
    initializeSop(sop) {
      const selectedId = this.$route.params.id;
      const source = sop || this.sops.find(item => item.id === selectedId);
      if (source) {
        this.editedSop = JSON.parse(JSON.stringify(source));
        this.tagsInput = source.tags ? source.tags.join(', ') : '';
      } else {
        this.editedSop = null;
        this.tagsInput = '';
      }
    },
    saveSop() {
      if (!this.editedSop) return;
      this.editedSop.tags = this.tagsInput
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);
      this.$emit('update-sop', this.editedSop);
      this.$router.push({ name: 'viewer' });
    },
    confirmDelete() {
      if (!this.editedSop) return;
      if (confirm('Delete this SOP? This action cannot be undone.')) {
        this.$emit('delete-sop', this.editedSop.id);
        this.$router.push({ name: 'viewer' });
      }
    },
    goBack() {
      this.$router.push({ name: 'viewer' });
    }
  }
}
</script>

<style scoped>
.sop-detail-view { max-width: 980px; margin: 0 auto; padding: 30px 20px; }
.detail-header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 28px; }
.back-btn { border: 1px solid #d1d5db; background: white; color: #111827; padding: 10px 16px; border-radius: 8px; cursor: pointer; transition: background 0.2s ease; }
.back-btn:hover { background: #f3f4f6; }
.detail-header h2 { margin: 0; font-size: 28px; }
.detail-subtitle { margin: 6px 0 0; color: #4b5563; }
.detail-empty { border: 1px solid #e5e7eb; padding: 28px; border-radius: 16px; background: #ffffff; text-align: center; color: #374151; }
.detail-empty p { margin-bottom: 16px; }
.detail-form { background: white; border: 1px solid #e5e7eb; border-radius: 16px; padding: 28px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06); }
.form-heading { margin-bottom: 24px; }
.form-heading h2 { margin: 0 0 8px; font-size: 26px; }
.form-heading .detail-subtitle { margin: 0; color: #4b5563; }

.form-group { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
.horizontal-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.form-group label { font-weight: 600; color: #111827; }
input, select, textarea { border: 1px solid #d1d5db; border-radius: 12px; padding: 12px 14px; font-size: 15px; color: #111827; background: #fff; }
textarea { min-height: 220px; resize: vertical; }
.detail-actions { display: flex; flex-wrap: wrap; gap: 12px; justify-content: flex-start; margin-top: 10px; }
.save-btn { border: none; background: #d40511; color: white; padding: 12px 20px; border-radius: 12px; cursor: pointer; }
.cancel-btn { border: 1px solid #d1d5db; background: white; color: #111827; padding: 12px 20px; border-radius: 12px; cursor: pointer; }
.delete-btn { border: 1px solid #d9534f; background: white; color: #d9534f; padding: 12px 20px; border-radius: 12px; cursor: pointer; }
.save-btn:hover { background: #b4050f; }
.cancel-btn:hover, .delete-btn:hover { background: #f9fafb; }
</style>
