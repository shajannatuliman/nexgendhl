<template>
  <AppHeader />
  
  <div class="layout">
    <!-- 1. Pass currentTab and LISTEN for change-tab -->
    <AppSidebar 
      :currentTab="activeTab" 
      @change-tab="activeTab = $event" 
    />
    
    <div class="main-content">
      <!-- 2. v-if checks the activeTab variable to show the right page -->
      <ViewerView 
        v-if="activeTab === 'viewer'" 
        :sops="sops" 
        @edit-sop="openEditor"
      />
      
      <UploadConsoleView 
        v-else-if="activeTab === 'upload'" 
        @add-sop="addSop" 
      />

      <DraftBuilderView
        v-else-if="activeTab === 'draft'"
        :sopToEdit="selectedSop"
        @update-sop="saveSop"
        @go-back="activeTab = 'viewer'"
      />
    </div>
  </div>

  <AppFooter />
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import AppFooter from './components/AppFooter.vue'
import ViewerView from './views/ViewerView.vue'
import UploadConsoleView from './views/UploadConsoleView.vue'
import DraftBuilderView from './views/DraftBuilderView.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppSidebar,
    AppFooter,
    ViewerView,
    UploadConsoleView,
    DraftBuilderView
  },
  data() {
    return {
      activeTab: 'viewer', 
      selectedSop: null, // ERROR 1 FIXED: Added this missing variable!
      sops: [
        {
          id: 1,
          title: "SOP: Handling MS Teams Damaged Cargo Reports",
          status: "Published",
          creator: "AI Auto-Bot",
          date: "2026-05-01",
          tags: ["Cargo", "Damage", "MSTeams"]
        },
        {
          id: 2,
          title: "Procedure for Missing Telegram Waybills",
          status: "Draft",
          creator: "John Doe (Reviewer)",
          date: "2026-05-03",
          tags: ["Waybill", "Telegram", "Error"]
        }
      ]
    }
  },
  methods: {
    addSop(newSop) {
      this.sops.push(newSop);
      this.activeTab = 'viewer'; 
    },
    openEditor(sop) {
      this.selectedSop = sop;
      this.activeTab = 'draft';
    },
    // ERROR 2 FIXED: Added the missing saveSop method!
    saveSop(updatedSop) {
      // Find the specific SOP in the array and update it
      const index = this.sops.findIndex(s => s.id === updatedSop.id);
      if (index !== -1) {
        this.sops[index] = updatedSop;
      }
      // Clear the selection and go back to the dashboard
      this.activeTab = 'viewer';
      this.selectedSop = null;
    }
  }
}
</script>

<style>
/* Global DHL Theme Variables */
:root {
  --dhl-red: #D40511;
  --dhl-yellow: #FFCC00;
  --dark-bg: #222222;
  --bg-light: #F4F7F9;
  --surface: #FFFFFF;
  --text-dark: #333333;
  --border-soft: #DDDDDD;
}

* { box-sizing: border-box; }
body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; margin: 0; background-color: var(--bg-light); color: var(--text-dark); }
.layout { display: flex; min-height: calc(100vh - 150px); }
.main-content { flex: 1; padding: 30px; background: var(--surface); box-shadow: inset 0 0 10px rgba(0,0,0,0.02); }
.main-content h2 { margin-top: 0; padding-bottom: 10px; border-bottom: 2px solid var(--dhl-red); color: var(--dark-bg); }
</style>