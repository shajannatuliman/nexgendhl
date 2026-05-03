<template>
  <div class="sidebar">
    <h3>Navigation</h3>
    <ul class="side-menu">
      <li>
        <!-- Emits 'viewer' when clicked -->
        <a href="#" 
           :class="['menu-link', { active: currentTab === 'viewer' }]"
           @click.prevent="$emit('change-tab', 'viewer')">
           Dashboard Viewer
        </a>
      </li>
      <li>
        <!-- Emits 'upload' when clicked -->
        <a href="#" 
           :class="['menu-link', { active: currentTab === 'upload' }]"
           @click.prevent="$emit('change-tab', 'upload')">
           Upload Console
        </a>
      </li>
      <li>
        <a href="#" class="menu-link">Draft Builder</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppSidebar',
  props: ['currentTab'], // Receives the current active tab from App.vue
  emits: ['change-tab']  // Tells Vue this component can emit this event
}
</script>

<style scoped>
/* Keep your existing sidebar CSS here! */
.sidebar { width: 240px; background: var(--dark-bg); color: white; padding: 24px 18px; }
.sidebar h3 { margin: 0 0 18px 0; padding-bottom: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); font-size: 20px; font-weight: 700; }
.side-menu { list-style: none; padding: 0; margin: 0; }
.menu-link { display: block; text-decoration: none; color: rgba(255, 255, 255, 0.8); padding: 12px 14px; margin-bottom: 8px; border-radius: 6px; font-size: 15px; transition: 0.2s; }
.menu-link:hover { background: rgba(255, 255, 255, 0.1); color: var(--dhl-yellow); }
.menu-link.active { background: rgba(255, 255, 255, 0.15); color: var(--dhl-yellow); font-weight: bold; border-left: 4px solid var(--dhl-red); }
</style>