<template>
  <header
    class="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-md py-3 sm:py-4 md:py-5 z-50
           flex items-center px-4 sm:px-6 border-b border-gray-100 animate-fade-in-down
           md:left-64"
    style="height: 4.5rem;" >
    <button
      @click="emit('toggle-sidebar')"
      class="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
      aria-label="Toggle menu"
    >
      <i class="fas fa-bars text-gray-700 text-lg"></i>
    </button>

    <h1 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight tracking-tight flex-grow text-center md:text-left md:pl-0 pl-8">
      LEARN EASY - Docente
    </h1>
  </header>
</template>

<script setup>
const emit = defineEmits(['toggle-sidebar']);
</script>

<style scoped>
@keyframes fade-in-down {
0% {
  opacity: 0;
  transform: translateY(-20px);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
}

.animate-fade-in-down {
animation: fade-in-down 0.5s ease-out forwards;
}
</style>