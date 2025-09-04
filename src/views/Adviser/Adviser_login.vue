<template>
    <div>
      <header class="fixed top-0 left-0 w-screen bg-white/90 backdrop-blur-sm shadow-md py-3 sm:py-4 md:py-5 z-50 flex justify-center items-center px-4 sm:px-6 border-b border-gray-100 animate-fade-in-down">
        <h1 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
          LEARN EASY
        </h1>
      </header>
  
      <main class="pt-20"> <h2>Login as Designer</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <button type="submit">Login</button>
        </form>
        <p v-if="loginError" class="error-message">{{ loginError }}</p>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DesignerLogin',
    data() {
      return {
        username: '',
        password: '',
        loginError: ''
      };
    },
    methods: {
      handleLogin() {
        // In a real application, you would send these credentials to a backend
        if (this.username === 'designer' && this.password === 'password123') {
          alert('Login successful!');
          this.loginError = '';
          // Redirect or perform other actions upon successful login
        } else {
          this.loginError = 'Invalid username or password.';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* You'll need Tailwind CSS set up for the utility classes in the header to work */
  .designer-login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>