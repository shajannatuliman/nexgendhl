<template>
  <div class="footer">
    <p>© 2026 DHL Operations | SECJ3483 Web Technology Project</p>
  </div>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.footer {
  background: var(--dark-bg);
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 15px 20px;
  font-size: 13px;
  border-top: 2px solid var(--dhl-red);
}
</style>