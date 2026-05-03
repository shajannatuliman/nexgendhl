<template>
  <div class="header">
    <h1>DHL SmartSOP</h1>
    <p>AI-Powered Logistics Knowledge Base</p>
  </div>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.header {
  background: var(--dhl-red);
  color: var(--dhl-yellow);
  padding: 20px 24px;
  text-align: center;
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
</style>