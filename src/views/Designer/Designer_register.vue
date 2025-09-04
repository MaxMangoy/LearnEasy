<template>
    <div class="min-h-screen flex flex-col bg-indigo-50">
      <header class="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg py-3 sm:py-4 md:py-5 z-50 flex items-center justify-center px-4 sm:px-6 border-b border-indigo-100 animate-fade-in-down">
        <button
          @click="goBack"
          class="absolute left-4 sm:left-6 p-2 rounded-full text-indigo-600 hover:bg-indigo-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          aria-label="Regresar"
        >
          <i class="fas fa-arrow-left text-lg"></i>
        </button>
  
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-indigo-900 leading-tight tracking-tight font-display text-center flex-grow">
          LEARN EASY
        </h1>
  
        <router-link
          :to="{ name: 'designerLogin' }"
          class="absolute right-4 sm:right-6 px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 text-xs sm:text-sm md:text-base transform hover:scale-105 whitespace-nowrap"
        >
          Iniciar Sesión
        </router-link>
      </header>
  
      <div class="flex-grow flex items-center justify-center pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div class="bg-white/80 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md border border-indigo-200 transform transition-all duration-300 ease-in-out hover:scale-[1.01]">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-center text-indigo-800 mb-6 sm:mb-8 font-heading">
            Registro de Diseñadores
          </h2>
          <form @submit.prevent="handleRegister" class="space-y-4 sm:space-y-6">
            <div class="form-group">
              <label for="name" class="block text-sm font-medium text-indigo-700 mb-1 sm:mb-2">Nombre Completo:</label>
              <div class="relative">
                <input
                  type="text"
                  id="name"
                  v-model="name"
                  required
                  autocomplete="name"
                  class="w-full px-4 py-2.5 sm:py-3 border border-indigo-300 rounded-lg text-gray-900 placeholder-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200 ease-in-out pl-10 text-sm sm:text-base"
                  placeholder="Tu nombre y apellido"
                />
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 text-base sm:text-lg">
                  <i class="fas fa-user"></i>
                </span>
              </div>
            </div>
  
            <div class="form-group">
              <label for="email" class="block text-sm font-medium text-indigo-700 mb-1 sm:mb-2">Correo Electrónico:</label>
              <div class="relative">
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  required
                  autocomplete="email"
                  class="w-full px-4 py-2.5 sm:py-3 border border-indigo-300 rounded-lg text-gray-900 placeholder-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200 ease-in-out pl-10 text-sm sm:text-base"
                  placeholder="tu.correo@ejemplo.com"
                />
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 text-base sm:text-lg">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
            </div>
  
            <div class="form-group">
              <label for="password" class="block text-sm font-medium text-indigo-700 mb-1 sm:mb-2">Contraseña:</label>
              <div class="relative">
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  required
                  autocomplete="new-password"
                  class="w-full px-4 py-2.5 sm:py-3 border border-indigo-300 rounded-lg text-gray-900 placeholder-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200 ease-in-out pl-10 text-sm sm:text-base"
                  placeholder="••••••••"
                />
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 text-base sm:text-lg">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
            </div>
  
            <div class="form-group">
              <label for="confirmPassword" class="block text-sm font-medium text-indigo-700 mb-1 sm:mb-2">Confirmar Contraseña:</label>
              <div class="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  required
                  autocomplete="new-password"
                  class="w-full px-4 py-2.5 sm:py-3 border border-indigo-300 rounded-lg text-gray-900 placeholder-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200 ease-in-out pl-10 text-sm sm:text-base"
                  placeholder="••••••••"
                />
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 text-base sm:text-lg">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
            </div>
  
            <button
              type="submit"
              class="w-full py-2.5 sm:py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 ease-in-out transform hover:-translate-y-0.5 text-base sm:text-lg"
            >
              Registrarme
            </button>
          </form>
          <p v-if="registerError" class="error-message mt-4 sm:mt-6 text-center text-red-600 font-semibold text-xs sm:text-sm">
            <i class="fas fa-exclamation-circle mr-2"></i>{{ registerError }}
          </p>
          <p v-if="registerSuccess" class="success-message mt-4 sm:mt-6 text-center text-green-600 font-semibold text-xs sm:text-sm">
            <i class="fas fa-check-circle mr-2"></i>{{ registerSuccess }}
          </p>
          <p class="mt-4 sm:mt-6 text-center text-indigo-700 text-xs sm:text-sm">
            ¿Ya tienes cuenta?
            <router-link :to="{ name: 'designerLogin' }" class="bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent font-semibold hover:underline transition-colors duration-200">
              Inicia sesión aquí
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DesignerRegister',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        registerError: '',
        registerSuccess: ''
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      handleRegister() {
        this.registerError = '';
        this.registerSuccess = '';
  
        if (this.password !== this.confirmPassword) {
          this.registerError = 'Las contraseñas no coinciden.';
          return;
        }
  
        // Simula una llamada a API para el registro
        setTimeout(() => {
          // En una aplicación real, enviarías esta información a tu backend
          // y manejarías la respuesta (éxito o error)
          console.log('Intentando registrar diseñador con:', {
            name: this.name,
            email: this.email,
            password: this.password // Enviarías un hash de la contraseña en una app real
          });
  
          // Simulación de registro exitoso
          this.registerSuccess = '¡Registro exitoso! Ahora puedes iniciar sesión.';
          // Opcional: redirigir al usuario al login después de un registro exitoso
          setTimeout(() => {
            this.$router.push({ name: 'designerLogin' });
          }, 2000);
  
          // Simulación de error de registro (ej. correo ya registrado)
          // if (this.email === 'existente@ejemplo.com') {
          //   this.registerError = 'Este correo electrónico ya está registrado.';
          // } else {
          //   this.registerSuccess = '¡Registro exitoso! Ahora puedes iniciar sesión.';
          //   setTimeout(() => {
          //     this.$router.push({ name: 'designerLogin' });
          //   }, 2000);
          // }
        }, 1000);
      }
    },
  };
  </script>
  
  <style scoped>
  /* Las mismas clases de estilo que ya tienes en tu login */
  .font-display {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
  }
  .font-heading {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
  }
  
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-down {
    animation: fadeInDown 0.5s ease-out forwards;
  }
  
  .bg-indigo-50 {
      background-color: #EEF2FF;
  }
  
  .min-h-screen {
    background-image: radial-gradient(#C7D2FE 1px, transparent 1px);
    background-size: 20px 20px;
  }
  </style>