<template>
  <div class="viewer-view">
    <h2>Knowledge Base Dashboard</h2>
    <p>Search and filter standardized SOPs generated from raw logs.</p>

    <!-- Search and Filter Controls -->
    <div class="controls">
      <input type="text" v-model="searchQuery" placeholder="Search by title, tag, or creator..." class="search-bar">
      <select v-model="statusFilter" class="filter-dropdown">
        <option value="">All Statuses</option>
        <option value="Draft">Draft</option>
        <option value="Reviewed">Reviewed</option>
        <option value="Published">Published</option>
      </select>
    </div>

    <div v-if="filteredSops.length > 0">
      <!-- Added the @delete-sop listener here -->
      <SopsCard 
        v-for="sop in filteredSops" 
        :key="sop.id" 
        :sop="sop"
        @edit-sop="$emit('edit-sop', $event)" 
        @delete-sop="$emit('delete-sop', $event)"
      />
    </div>
    
    <div v-else class="empty-state">
      <p>No SOPs found matching your criteria.</p>
    </div>
  </div>
</template>

<script>
import SopsCard from '../components/SopsCard.vue'

export default {
  name: 'ViewerView',
  // Added 'delete-sop' to the emits array
  emits: ['edit-sop', 'delete-sop'],
  components: {
    SopsCard
  },
  props: {
    sops: {  // Expecting 'sops' array from App.vue
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchQuery: '',
      statusFilter: ''
    }
  },
  computed: {
    filteredSops() { 
      return this.sops.filter(sop => { 
        const matchesSearch = sop.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                              sop.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
                              sop.creator.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        const matchesStatus = this.statusFilter === '' || sop.status === this.statusFilter;
        
        return matchesSearch && matchesStatus;
      });
    }
  }
}
</script>

<style scoped>
.controls { display: flex; gap: 15px; margin-bottom: 25px; background: var(--bg-light); padding: 15px; border-radius: 8px; border: 1px solid var(--border-soft); }
.search-bar { flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; }
.filter-dropdown { padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; background: white; }
.empty-state { text-align: center; padding: 40px; background: var(--surface-warm); border: 1px dashed #ccc; border-radius: 8px; color: #666; }
</style>