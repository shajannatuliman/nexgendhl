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
    </div>

    <div class="card-tags">
      <span v-for="(tag, index) in sop.tags" :key="index" class="tag">
        #{{ tag }}
      </span>
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

.card-meta { display: flex; gap: 20px; font-size: 13px; color: #666; margin-bottom: 10px; }
.card-tags { margin-bottom: 15px; }
.tag { background: var(--bg-light); color: var(--text-dark); font-size: 12px; padding: 4px 8px; border-radius: 4px; margin-right: 6px; border: 1px solid #ccc; }

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