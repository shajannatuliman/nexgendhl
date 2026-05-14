<template>
  <div class="header">
    <div>
      <h1>DHL SmartSOP</h1>
      <p>AI-Powered Logistics Knowledge Base</p>
    </div>
    <div class="session-bar" v-if="currentUser">
      <div class="user-meta">
        <span>{{ currentUser.username }}</span>
        <small>{{ currentUser.role }}</small>
      </div>
      <button class="logout-btn" @click="$emit('logout')">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    currentUser: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--dhl-red);
  color: var(--dhl-yellow);
  padding: 20px 24px;
  border-bottom: 4px solid var(--dhl-yellow);
}
.header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 1px;
}
.header p {
  margin: 6px 0 0;
  font-size: 14px;
  color: white;
  opacity: 0.95;
}
.session-bar {
  display: flex;
  align-items: center;
  gap: 16px;
}
.user-meta {
  text-align: right;
}
.user-meta span {
  display: block;
  font-weight: 700;
}
.user-meta small {
  display: block;
  font-size: 12px;
  opacity: 0.9;
}
.logout-btn {
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.85);
  color: white;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.logout-btn:hover {
  background: rgba(255,255,255,0.2);
}
</style>