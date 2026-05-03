<template>
  <AppHeader />
  
  <div class="layout">
    <AppSidebar />
    
    <div class="main-content">
      <!-- We will put your Views here later -->
      <h2>System Initialization</h2>
      <p>Welcome to the DHL SmartSOP system. Select a module from the sidebar.</p>
    </div>
  </div>

  <AppFooter />
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