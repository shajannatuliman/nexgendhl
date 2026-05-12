<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="brand-accent"></div>
      
      <div class="login-header">
        <h2>System Login</h2>
        <p>Please enter your credentials to access the Knowledge Base.</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label>Username</label>
          <input 
            type="text" 
            v-model="username" 
            autocomplete="username" 
            required 
          />
        </div>
        
        <div class="input-group">
          <label>Password</label>
          <input 
            type="password" 
            v-model="password" 
            autocomplete="current-password" 
            required 
          />
        </div>
        
        <button type="submit" class="login-btn">
          Sign In
        </button>
        
        <div v-if="errorMessage" class="error-alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <span>{{ errorMessage }}</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await fetch(`http://localhost:3000/users?username=${username.value}&password=${password.value}`);
    const data = await response.json();

    if (data.length > 0) {
      const user = data[0];
      localStorage.setItem('currentUser', JSON.stringify(user));
      router.push('/viewer');
    } else {
      errorMessage.value = "Invalid username or password.";
    }
  } catch (error) {
    errorMessage.value = "Failed to connect to the API.";
    console.error(error);
  }
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background-color: var(--surface);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  position: relative;
}

.brand-accent {
  height: 6px;
  width: 100%;
  background-color: var(--dhl-yellow);
}

.login-header {
  padding: 40px 40px 20px;
  text-align: center;
}

.login-header h2 {
  margin: 0 0 8px;
  color: var(--dark-bg);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.login-header p {
  margin: 0;
  color: #718096;
  font-size: 14px;
  line-height: 1.5;
}

.login-form {
  padding: 0 40px 40px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-dark);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.input-group input {
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  color: var(--dark-bg);
  background-color: #F7FAFC;
  border: 1px solid var(--border-soft);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.input-group input:focus {
  outline: none;
  border-color: var(--dhl-red);
  background-color: var(--surface);
  box-shadow: 0 0 0 3px rgba(212, 5, 17, 0.1);
}

.login-btn {
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  font-size: 15px;
  font-weight: 700;
  color: white;
  background-color: var(--dhl-red);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.login-btn:hover {
  background-color: #B3000C;
}

.login-btn:active {
  transform: translateY(1px);
}

.error-alert {
  margin-top: 20px;
  padding: 12px;
  background-color: #FFF5F5;
  border-left: 4px solid var(--dhl-red);
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #C53030;
  font-size: 14px;
  font-weight: 500;
}
</style>