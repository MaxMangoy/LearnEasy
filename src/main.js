// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import axios from 'axios'; // Importar axios globalmente si es el que usan los componentes
import { useUserStore } from '@/stores/user'; // Importar tu userStore

import './assets/css/main.css';

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);

// IMPORTANTE: Después de que Pinia se haya inicializado y usado
// para que el store esté disponible y pueda rehidratar su estado.
// Accede al store después de que Pinia esté disponible para la app
app.config.globalProperties.$_userStore = useUserStore(); // Hace el store accesible globalmente (opcional, pero útil)

// Lógica para configurar el header de Axios al inicio de la aplicación
// Esto se ejecutará cada vez que la aplicación cargue
const userStore = useUserStore(); // Obtén la instancia del store
if (userStore.token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${userStore.token}`;
  console.log('Token reestablecido en axios.defaults.headers.common al cargar la app.');
} else {
  console.log('No hay token al cargar la app, limpiando axios auth header.');
  delete axios.defaults.headers.common['Authorization'];
}


app.use(router); // Monta el router después de configurar axios

app.mount('#app');