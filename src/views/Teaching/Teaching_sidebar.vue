<template>
  <aside
    class="w-64 bg-white/90 backdrop-blur-sm flex flex-col h-full fixed top-0 left-0 shadow-lg border-r border-gray-100
             transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out z-40"
    :class="{ 'translate-x-0': props.isOpen }"
  >
    <div class="bg-teal-600 text-white shadow-md flex items-center justify-between">
      <div class="flex items-center pl-6 py-5">
        <i class="fas fa-graduation-cap text-2xl mr-3"></i>
        <h2 class="text-xl font-bold">LEARN EASY</h2>
      </div>
      <button @click="toggleSidebar" class="md:hidden text-white hover:text-gray-200 focus:outline-none pr-6 py-5">
        <i class="fas fa-times text-2xl"></i>
      </button>
    </div>

    <nav class="flex-grow p-4 space-y-2">
      <router-link
        to="/teacher-home"
        class="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
        active-class="bg-teal-100 text-teal-700 font-semibold"
        @click="emit('closeSidebarOnMobile')"
      >
        <i class="fas fa-home mr-3"></i>
        <span>Inicio</span>
      </router-link>

      <router-link
        to="/teacher-profile"
        class="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
        active-class="bg-teal-100 text-teal-700 font-semibold"
        @click="emit('closeSidebarOnMobile')"
      >
        <i class="fas fa-user-circle mr-3"></i>
        <span>Mi Perfil</span>
      </router-link>

      <router-link
        to="/teacher-schedule"
        class="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
        active-class="bg-teal-100 text-teal-700 font-semibold"
        @click="emit('closeSidebarOnMobile')"
      >
        <i class="fas fa-calendar-alt mr-3"></i>
        <span>Mis Horarios</span>
      </router-link>

      <router-link
        to="/teacher-reinforcement"
        class="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
        active-class="bg-teal-100 text-teal-700 font-semibold"
        @click="emit('closeSidebarOnMobile')"
      >
        <i class="fas fa-book-open mr-3"></i>
        <span>Reforzamiento</span>
      </router-link>

      </nav>

    <div class="p-4 border-t border-gray-100">
      <button
        @click="logout"
        class="flex items-center w-full px-4 py-2 rounded-lg bg-red-600 text-white
                 hover:bg-red-700 transition-colors duration-200 justify-center"
      >
        <i class="fas fa-sign-out-alt mr-3"></i>
        <span>Cerrar Sesión</span>
      </button>
    </div>
  </aside>

  <div
    v-if="props.isOpen"
    @click="emit('closeSidebarOnMobile')"
    class="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
  ></div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['closeSidebarOnMobile', 'update:isOpen']);

const toggleSidebar = () => {
  emit('update:isOpen', !props.isOpen);
  emit('closeSidebarOnMobile');
};

const closeSidebarOnMobile = () => {
  if (window.innerWidth < 768) {
    emit('update:isOpen', false);
    emit('closeSidebarOnMobile');
  }
};

const logout = () => {
  userStore.logout();
  alert('Cerrando sesión del docente...');
  router.push('/teacher-login');
  closeSidebarOnMobile();
};
</script>

<style scoped>
/* Estilos adicionales si es necesario, aunque Tailwind CSS maneja la mayoría */
/* Asegúrate de que Font Awesome esté configurado en tu proyecto para los íconos */
</style>