<template>
  <div class="sop-card">
    <div class="card-header">
      <!-- Changed 'article' to 'sop' -->
      <h3>{{ sop.title }}</h3>
      <span :class="['badge', sop.status.toLowerCase()]">
        {{ sop.status }}
      </span>
    </div>
    
    <div class="card-meta">
      <p><strong>Creator:</strong> {{ sop.creator }}</p>
      <p><strong>Date:</strong> {{ sop.date }}</p>
      <p v-if="sop.lastUpdated"><strong>Last Updated:</strong> {{ formatDate(sop.lastUpdated) }}</p>
    </div>

    <div class="card-tags">
      <span v-for="(tag, index) in sop.tags" :key="index" class="tag">
        #{{ tag }}
      </span>
    </div>

    <!-- Version History Summary -->
    <div v-if="sop.versionHistory && sop.versionHistory.length > 0" class="version-summary">
      <details class="history-details">
        <summary>📋 Version History ({{ sop.versionHistory.length }})</summary>
        <div class="history-list">
          <div v-for="(entry, idx) in sop.versionHistory" :key="idx" class="history-entry">
            <span class="history-status">{{ entry.status }}</span>
            <span class="history-user">by {{ entry.user }}</span>
            <span class="history-time">{{ formatDate(entry.timestamp) }}</span>
            <p class="history-note">{{ entry.note }}</p>
          </div>
        </div>
      </details>
    </div>
    
    <!-- Updated action buttons container -->
    <div class="card-actions">
      <button class="action-btn" @click="$emit('edit-sop', sop)">View / Edit Details</button>
      <button class="delete-btn" @click="$emit('delete-sop', sop.id)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SopsCard', // Updated component name
  emits: ['edit-sop', 'delete-sop'], // Added the delete emit here
  props: {
    sop: {          // Now expecting a single 'sop' object
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(isoString) {
      if (!isoString) return 'N/A';
      const date = new Date(isoString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
}
</script>

<style scoped>
.sop-card {
  background: white;
  border: none; /* Remove the harsh border */
  border-left: 6px solid var(--dhl-red);
  border-radius: 10px; /* Softer corners */
  padding: 20px;
  margin-bottom: 20px;
  /* Add a soft, modern drop shadow */
  box-shadow: 0 4px 15px rgba(0,0,0,0.05); 
  /* Add a smooth transition for the hover effect */
  transition: transform 0.2s ease, box-shadow 0.2s ease; 
}

/* When the mouse hovers over the card, it lifts up slightly */
.sop-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(212, 5, 17, 0.12); /* Subtle red shadow tint */
}

.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.card-header h3 { margin: 0; font-size: 18px; color: var(--text-dark); }

.badge { padding: 5px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
.published { background: #e6f4ea; color: #1e8e3e; }
.draft { background: #fef7e0; color: #b06000; }
.reviewed { background: #e8f0fe; color: #1a73e8; }

.card-meta { display: flex; gap: 20px; font-size: 13px; color: #666; margin-bottom: 10px; flex-wrap: wrap; }
.card-tags { margin-bottom: 15px; }
.tag { background: var(--bg-light); color: var(--text-dark); font-size: 12px; padding: 4px 8px; border-radius: 4px; margin-right: 6px; border: 1px solid #ccc; }

/* Version History Styles */
.version-summary { margin-bottom: 15px; margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee; }
.history-details { cursor: pointer; }
.history-details summary { font-weight: 600; color: var(--dhl-red); font-size: 13px; outline: none; user-select: none; }
.history-details summary:hover { text-decoration: underline; }
.history-list { margin-top: 10px; padding-left: 16px; border-left: 2px solid #ffd700; }
.history-entry { font-size: 12px; padding: 8px 0; color: #555; }
.history-status { display: inline-block; background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-weight: 600; margin-right: 6px; }
.history-user { color: #888; margin-right: 6px; }
.history-time { color: #aaa; font-style: italic; }
.history-note { margin: 4px 0 0; color: #666; font-style: italic; }

/* Action Buttons Styling */
.card-actions { display: flex; gap: 10px; }

.action-btn, .delete-btn { 
  background: transparent; 
  padding: 8px 16px; 
  border-radius: 6px; 
  cursor: pointer; 
  font-weight: 600; 
  transition: all 0.2s ease; 
}

.action-btn { color: var(--dhl-red); border: 1.5px solid var(--dhl-red); }
.action-btn:hover { background: var(--dhl-red); color: white; transform: scale(1.02); }

.delete-btn { color: #d9534f; border: 1.5px solid #d9534f; }
.delete-btn:hover { background: #d9534f; color: white; transform: scale(1.02); }
</style>