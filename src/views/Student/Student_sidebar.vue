<template>
  <aside 
    :class="[
      'fixed inset-y-0 left-0 w-64 text-white shadow-2xl z-40 overflow-hidden', 
      'transform transition-all duration-500 ease-out-expo', 
      isOpen ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0 md:static md:inset-0',
      'border-r border-indigo-500/20' 
    ]"
    style="background-color: #2F366E;" 
  >
    <div class="absolute inset-0 z-0 opacity-10 pattern-bg"></div>

    <div class="absolute inset-0 z-0 opacity-10">
      <div 
        v-for="i in 8" 
        :key="i"
        class="absolute rounded-full bg-white"
        :style="{
          width: `${Math.random() * 2 + 1}px`, 
          height: `${Math.random() * 2 + 1}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.2 + 0.05, 
          animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`, 
          animationDelay: `${Math.random() * 4}s`
        }"
      ></div>
    </div>

    <div class="relative z-10 flex flex-col h-full">
      <div class="h-20 flex items-center justify-between px-6 bg-white/5 backdrop-blur-md shadow-sm border-b border-white/10">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 border border-white/5">
            <i class="fas fa-graduation-cap text-xl text-white"></i>
          </div>
          <h2 class="text-xl font-bold text-white">
            <span class="block text-xs font-medium text-white/70 -mb-1">Portal del</span>
            Estudiante
          </h2>
        </div>
        <button 
          @click="closeSidebar" 
          class="text-white md:hidden focus:outline-none rounded-full p-1.5 hover:bg-white/10 transition-all"
          aria-label="Cerrar menú"
        >
          <i class="fas fa-times text-lg"></i>
        </button>
      </div>

      <nav class="mt-8 flex-1 overflow-y-auto custom-scrollbar pb-4">
        <ul class="space-y-1 px-4">
          <li v-for="item in menuItems" :key="item.path">
            <router-link 
              :to="item.path" 
              @click="closeSidebar"
              class="sidebar-link group"
              :class="{ 'sidebar-link-active': isActiveRoute(item.path) }"
            >
              <div class="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                <i :class="item.icon + ' text-lg relative z-10 group-hover:scale-110 transition-transform duration-200'"></i>
              </div>
              <span>{{ item.label }}</span>
              <span v-if="item.badge" class="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-sky-400 text-sky-900 shadow-sm">{{ item.badge }}</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <div class="mt-auto p-4 border-t border-white/10">
        <button 
          @click="logout"
          class="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
        >
          <i class="fas fa-sign-out-alt"></i>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['closeSidebarOnMobile']);

const route = useRoute();
const router = useRouter();

// Items del menú específicos
const menuItems = ref([
  { 
    path: '/student-profile', 
    icon: 'fas fa-user-circle', 
    label: 'Mi Perfil' 
  },
  { 
    path: '/student-reinforcement', 
    icon: 'fas fa-hands-helping', 
    label: 'Reforzamiento',
    badge: 'Nuevo' 
  },
  { 
    path: '/student-eco-projects', 
    icon: 'fas fa-seedling', 
    label: 'Proyectos Ecológicos' 
  },
  { 
    path: '/student-psych-service', 
    icon: 'fas fa-brain', 
    label: 'Servicio Psicológico' 
  },
  { 
    path: '/student-subscription', 
    icon: 'fas fa-gem', 
    label: 'Mi Suscripción',
    badge: 'Pro' 
  }
]);

// Métodos
const closeSidebar = () => {
  emit('closeSidebarOnMobile');
};

const isActiveRoute = (path) => {
  return route.path === path || route.path.startsWith(path);
};

const logout = () => {
  console.log('Cerrando sesión y redirigiendo a la selección de rol...');
  // Eliminar el token de acceso del almacenamiento local
  localStorage.removeItem('accessToken');
  // Opcional: Si guardas el rol del usuario, también lo puedes eliminar
  localStorage.removeItem('userRole'); 
  // Redirigir a la vista de selección de rol usando la ruta definida en index.js
  router.push('/roles'); // <-- ¡CORREGIDO AQUÍ! Ahora usa '/roles'
};
</script>

<style scoped>
/* Animación de partículas flotantes */
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-10px) translateX(3px); /* Movimiento más sutil */
  }
}

/* Transición suave */
.ease-out-expo {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Scrollbar personalizado minimalista */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1); /* Más translúcido */
  border-radius: 2px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2); /* Más translúcido en hover */
}

/* Fondo con patrón animado sutil */
.pattern-bg {
  background-image: 
    radial-gradient(circle at 75% 30%, rgba(255,255,255,0.05) 0%, transparent 35%);
  background-size: 200% 200%;
  animation: background-pan 18s ease-in-out infinite alternate; /* Animación más lenta */
}

@keyframes background-pan {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}

/* Estilo avanzado para los enlaces del menú */
.sidebar-link {
  @apply flex items-center p-2.5 rounded-lg text-sm font-medium text-white/80 relative overflow-hidden; /* Padding más compacto, texto ligeramente menos opaco */
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  gap: 0.75rem; /* Espacio entre ícono y texto */
}

/* Efecto de fondo en hover/activo (sin gradiente) */
.sidebar-link::before {
  content: '';
  @apply absolute inset-0 rounded-lg;
  background-color: rgba(255, 255, 255, 0.08); /* Color sólido translúcido */
  transform: translateX(-100%);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
  opacity: 0;
  z-index: 0;
}

.sidebar-link:hover {
  @apply text-white; /* Texto se vuelve blanco puro en hover */
}

.sidebar-link:hover::before {
  transform: translateX(0);
  opacity: 1;
}

.sidebar-link-active {
  @apply text-white shadow-sm;
  background-color: rgba(255, 255, 255, 0.15); /* Color sólido más pronunciado para activo */
  transform: translateX(2px);
}

.sidebar-link-active::before {
  transform: translateX(0);
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.15); /* Mismo color sólido para activo */
}

.sidebar-link > *:not(.absolute) {
  position: relative;
  z-index: 1;
}

/* Borde izquierdo para el ítem activo (más sutil) */
.sidebar-link-active::after {
  content: '';
  @apply absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-white rounded-r-full; /* Borde más delgado y corto */
  animation: border-pulse 2.5s ease infinite;
}

@keyframes border-pulse {
  0%, 100% {
    opacity: 1;
    transform: translateY(-50%) scaleY(1);
  }
  50% {
    opacity: 0.7; /* Pulse más sutil */
    transform: translateY(-50%) scaleY(0.9);
  }
}
</style>