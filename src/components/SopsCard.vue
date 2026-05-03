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
    
    <button class="action-btn">View Details</button>
  </div>
</template>

<script>
export default {
  name: 'SopsCard', // Updated component name
  props: {
    sop: {          // Now expecting a single 'sop' object
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
/* Keep the exact same CSS as before, just changed the main class name to .sop-card */
.sop-card {
  background: white;
  border: 1px solid var(--border-soft);
  border-left: 5px solid var(--dhl-red);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
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
.action-btn { background: transparent; color: var(--dhl-red); border: 1px solid var(--dhl-red); padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; }
.action-btn:hover { background: var(--dhl-red); color: white; }
</style>