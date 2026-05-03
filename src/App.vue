<template>
  <AppHeader />
  
  <div class="layout">
    <AppSidebar />
    
    <div class="main-content">
      <!-- Pass 'sops' instead of 'articles' -->
      <ViewerView 
        v-if="activeTab === 'viewer'" 
        :sops="sops" 
      />
      
      <!-- Listen for 'add-sop' instead of 'add-article' -->
      <UploadConsoleView 
        v-else-if="activeTab === 'upload'" 
        @add-sop="addSop" 
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

export default {
  name: 'App',
  components: {
    AppHeader,
    AppSidebar,
    AppFooter,
    ViewerView
  },
  data() {
    return {
      activeTab: 'viewer',
      sops: [
        {
          id: 1,
          title: "SOP: Handling MS Teams Damaged Cargo Reports",
          status: "Published",
          creator: "AI Auto-Bot",
          date: "2026-05-01",
          tags: ["Cargo", "Damage", "MS Teams"]
        },
        {
          id: 2,
          title: "Procedure for Missing Telegram Waybills",
          status: "Draft",
          creator: "John Doe (Reviewer)",
          date: "2026-05-03",
          tags: ["Waybill", "Telegram", "Error"]
        },
        {
          id: 3,
          title: "Warehouse Safety Guidelines (from PPT)",
          status: "Reviewed",
          creator: "Jane Smith",
          date: "2026-05-02",
          tags: ["Safety", "Warehouse", "Training"]
        }
      ]
    }
  },
  methods: {
    // Changed from addArticle to addSop
    addSop(newSop) {
      this.sops.push(newSop);
      this.activeTab = 'viewer'; 
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

* {
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  background-color: var(--bg-light);
  color: var(--text-dark);
}

.layout {
  display: flex;
  min-height: calc(100vh - 150px); /* Keeps footer at the bottom */
}

.main-content {
  flex: 1;
  padding: 30px;
  background: var(--surface);
  box-shadow: inset 0 0 10px rgba(0,0,0,0.02);
}

.main-content h2 {
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--dhl-red);
  color: var(--dark-bg);
}
</style>