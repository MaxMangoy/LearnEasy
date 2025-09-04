<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión Admin</h1>
        
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico:</label>
            <input
              type="email"  id="email"   v-model="email"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Introduce tu correo"
              required
            >
          </div>
          
          <div class="mb-6">
            <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Contraseña:</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Introduce tu contraseña"
              required
            >
          </div>
          
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Iniciar Sesión
            </button>
          </div>
  
          <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  errorMessage.value = ''; 

  try {
    // ¡¡¡CAMBIA 5000 A 8000 AQUÍ!!!
    const API_URL = 'http://localhost:8000/api/auth/login'; 

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    const data = await response.json(); 

    if (response.ok) { 
      if (data.access_token && data.role) {
        localStorage.setItem('userToken', data.access_token);
        localStorage.setItem('userRole', data.role);
        
        if (data.role === 'admin') {
          router.push('/admin');
        } else {
          errorMessage.value = 'Acceso denegado: Tus credenciales no corresponden a un administrador.';
          localStorage.removeItem('userToken');
          localStorage.removeItem('userRole');
        }
      } else {
        errorMessage.value = 'Respuesta del servidor incompleta (falta token o rol).';
      }
    } else {
      errorMessage.value = data.message || 'Error al iniciar sesión. Credenciales incorrectas.';
      console.error('Error del servidor:', data.message || response.statusText);
    }
  } catch (error) {
    console.error('Error de red o del servidor:', error);
    errorMessage.value = 'No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.';
  }
};
</script>

<style scoped>
/* Tus estilos existentes */
</style>