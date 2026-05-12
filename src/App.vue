<template>
  <div v-if="$route.name === 'login'" class="login-fullscreen">
    <router-view></router-view>
  </div>

  <div v-else>
    <AppHeader />
    
    <div class="layout">
      <AppSidebar 
        :currentTab="$route.name" 
        @change-tab="$router.push({ name: $event })" 
      />
      
      <div class="main-content">
        <router-view
          :sops="sops" 
          :sopToEdit="selectedSop"
          @add-sop="addSop"
          @edit-sop="openEditor"
          @update-sop="saveSop"
          @delete-sop="deleteSop"
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
      sops: [] 
    }
  },
  
  async mounted() {
    try {
      const response = await fetch('http://localhost:3000/sops');
      this.sops = await response.json();
    } catch (error) {
      console.error("Error fetching SOPs:", error);
    }
  },
  
  methods: {
    async addSop(newSop) {
      newSop.id = String(newSop.id); 
      
      try {
        const response = await fetch('http://localhost:3000/sops', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSop)
        });
        const savedSop = await response.json();
        
        this.sops.push(savedSop); 
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