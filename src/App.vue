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
        @delete-sop="deleteSop"
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
    AppHeader, AppSidebar, AppFooter, ViewerView, UploadConsoleView, DraftBuilderView
  },
  data() {
    return {
      activeTab: 'viewer', 
      selectedSop: null, 
      sops: [] // Start completely empty! Data comes from the API now.
    }
  },
  
  // 1. READ (GET) - Fetch data from db.json when the app loads
  async mounted() {
    try {
      const response = await fetch('http://localhost:3000/sops');
      this.sops = await response.json();
    } catch (error) {
      console.error("Error fetching SOPs:", error);
    }
  },
  
  methods: {
    // 2. CREATE (POST) - Send new uploaded data to the database
    async addSop(newSop) {
      newSop.id = String(newSop.id); // JSON Server v1+ requires IDs to be strings
      
      try {
        const response = await fetch('http://localhost:3000/sops', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSop)
        });
        const savedSop = await response.json();
        
        this.sops.push(savedSop); // Add it to the UI
        this.activeTab = 'viewer'; // Switch back to dashboard
      } catch (error) {
        console.error("Error saving new SOP:", error);
      }
    },

    openEditor(sop) {
      this.selectedSop = sop;
      this.activeTab = 'draft';
    },

    // 3. UPDATE (PUT) - Save edits from the Draft Builder to the database
    async saveSop(updatedSop) {
      try {
        const response = await fetch(`http://localhost:3000/sops/${updatedSop.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedSop)
        });
        const finalSop = await response.json();
        
        // Find the SOP in the UI array and update it
        const index = this.sops.findIndex(s => s.id === finalSop.id);
        if (index !== -1) {
          this.sops[index] = finalSop;
        }
        
        this.activeTab = 'viewer';
        this.selectedSop = null;
      } catch (error) {
        console.error("Error updating SOP:", error);
      }
    },

    // 4. DELETE - Remove SOP from the database
    async deleteSop(id) {
      // Add a quick confirmation popup so users don't delete by accident!
      if (!confirm("Are you sure you want to delete this SOP?")) return;

      try {
        // 1. Tell json-server to delete it from db.json
        await fetch(`http://localhost:3000/sops/${id}`, {
          method: 'DELETE'
        });
        
        // 2. Remove it from the Vue array so it disappears from the screen instantly
        this.sops = this.sops.filter(sop => sop.id !== id);
      } catch (error) {
        console.error("Error deleting SOP:", error);
      }
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