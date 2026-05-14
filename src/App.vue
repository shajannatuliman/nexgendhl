<template>
  <div v-if="$route.name === 'login'" class="login-fullscreen">
    <router-view></router-view>
  </div>

  <div v-else>
    <AppHeader :currentUser="currentUser" @logout="logout" />
    
    <div class="layout">
      <AppSidebar 
        :currentTab="$route.name" 
        @change-tab="$router.push({ name: $event })" 
      />
      
      <div class="main-content">
        <router-view
          :sops="sops" 
          :sopToEdit="selectedSop"
          :currentUser="currentUser"
          @add-sop="addSop"
          @edit-sop="openEditor"
          @update-sop="saveSop"
          @delete-sop="deleteSop"
          @refresh-sops="loadSops"
          @go-back="$router.push('/viewer')"
        ></router-view>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader, 
    AppSidebar, 
    AppFooter
  },
  data() {
    return {
      selectedSop: null, 
      sops: [],
      currentUser: null
    }
  },
  
  async mounted() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    await this.loadSops();
  },

  watch: {
    '$route.name': {
      handler(routeName) {
        if (routeName !== 'login') {
          this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        }
      },
      immediate: true
    }
  },
  
  methods: {
    async loadSops() {
      try {
        const response = await fetch('http://localhost:3000/sops');
        this.sops = await response.json();
      } catch (error) {
        console.error("Error fetching SOPs:", error);
      }
    },

    async addSop(newSop) {
      newSop.id = String(newSop.id);
      newSop.creator = this.currentUser?.username || newSop.creator;
      newSop.versionHistory = [
        {
          timestamp: new Date().toISOString(),
          status: newSop.status,
          user: newSop.creator,
          note: 'Created by upload console.'
        }
      ];
      
      try {
        const response = await fetch('http://localhost:3000/sops', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSop)
        });
        await response.json();
        
        // Refresh the SOPs list to include the new one
        await this.loadSops();
        this.$router.push('/viewer'); 
      } catch (error) {
        console.error("Error saving new SOP:", error);
      }
    },

    openEditor(sop) {
      this.selectedSop = sop;
      this.$router.push('/draft-builder'); 
    },

    async saveSop(updatedSop) {
      const existing = this.sops.find(s => s.id === updatedSop.id) || {};
      updatedSop.versionHistory = updatedSop.versionHistory || [];
      updatedSop.versionHistory.push({
        timestamp: new Date().toISOString(),
        status: updatedSop.status,
        user: this.currentUser?.username || updatedSop.creator || 'Unknown',
        note: existing.status === updatedSop.status ? 'Updated content.' : `Status changed from ${existing.status || 'Unknown'} to ${updatedSop.status}`
      });
      updatedSop.lastUpdated = new Date().toISOString();
      
      try {
        const response = await fetch(`http://localhost:3000/sops/${updatedSop.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedSop)
        });
        const finalSop = await response.json();
        
        const index = this.sops.findIndex(s => s.id === finalSop.id);
        if (index !== -1) {
          this.sops[index] = finalSop;
        }
        
        this.$router.push('/viewer'); 
        this.selectedSop = null;
      } catch (error) {
        console.error("Error updating SOP:", error);
      }
    },

    async deleteSop(id) {
      if (!confirm("Are you sure you want to delete this SOP?")) return;

      try {
        await fetch(`http://localhost:3000/sops/${id}`, {
          method: 'DELETE'
        });
        
        this.sops = this.sops.filter(sop => sop.id !== id);
      } catch (error) {
        console.error("Error deleting SOP:", error);
      }
    },

    logout() {
      localStorage.removeItem('currentUser');
      this.currentUser = null;
      this.$router.push('/');
    }
  }
}
</script>

<style>
/* Global DHL Theme Variables */
:root {
  --dhl-red: #D40511;
  --dhl-yellow: #FFCC00;
  --dark-bg: #1A1A1A; 
  --bg-light: #F0F4F8; 
  --surface: #FFFFFF;
  --text-dark: #2D3748; 
  --border-soft: #E2E8F0;
}

* { box-sizing: border-box; }
body { 
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; 
  margin: 0; 
  background-color: var(--bg-light); 
  color: var(--text-dark); 
}

/* NEW: Styles specifically to center the Login screen */
.login-fullscreen {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-light);
}

.layout { 
  display: flex; 
  min-height: calc(100vh - 150px); 
}

.main-content { 
  flex: 1; 
  padding: 40px; 
  background: var(--bg-light); 
  box-shadow: inset 4px 0 10px rgba(0,0,0,0.02); 
}

.main-content h2 { 
  margin-top: 0; 
  padding-bottom: 12px; 
  border-bottom: 3px solid var(--dhl-red); 
  color: var(--dark-bg); 
  font-weight: 800;
  letter-spacing: -0.5px; 
}
</style>