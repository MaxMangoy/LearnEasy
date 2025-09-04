<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 font-sans antialiased text-gray-800 flex">
    
    <StudentSidebar :is-open="true" /> 
    
    <div class="flex-1 md:ml-32 py-10 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto"> 
      <div class="absolute right-10 top-20 opacity-10">
        <div class="w-64 h-64 rounded-full bg-purple-300 filter blur-3xl animate-float-slow"></div>
      </div>
      
      <main class="relative z-10 bg-white rounded-3xl shadow-xl shadow-indigo-100/50 w-full transform transition-all duration-500 ease-out animate-fade-in-up border border-white/50 overflow-hidden">
        <div class="bg-purple-600 px-6 py-4 sm:px-8 sm:py-6 text-white">
          <div class="flex items-center">
            <div class="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mr-4 border border-white/20">
              <i class="fas fa-heart text-2xl"></i>
            </div>
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">Servicio de Apoyo Psicológico</h1>
              <p class="text-purple-100 mt-1">Estamos aquí para tu bienestar emocional y el de tu familia.</p>
            </div>
          </div>
        </div>

        <div class="px-6 py-8 sm:p-10 lg:p-12">
          
          <div class="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl shadow-sm border border-purple-100 mb-8">
            <h3 class="text-lg font-semibold text-purple-800 mb-6 flex items-center">
              <i class="fas fa-comments mr-2 text-purple-500"></i> Solicitar Sesión de Apoyo Emocional
            </h3>
            
            <form @submit.prevent="openSessionRequestModal" class="space-y-6">
              <div>
                <label for="session-type" class="block text-sm font-medium text-gray-700 mb-1">Tipo de Sesión:</label>
                <select 
                  id="session-type" 
                  v-model="sessionRequest.type" 
                  required 
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="individual">Individual (Estudiante)</option>
                  <option value="familiar">Familiar</option>
                  <option value="parental">Orientación Parental</option>
                </select>
              </div>

              <div>
                <label for="main-concern" class="block text-sm font-medium text-gray-700 mb-1">Principal Preocupación / Motivo de Consulta:</label>
                <textarea 
                  id="main-concern" 
                  v-model="sessionRequest.concern" 
                  rows="4" 
                  required 
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  placeholder="Ej: Estrés académico, problemas de sueño, ansiedad, dificultades familiares, etc."
                ></textarea>
              </div>

              <div>
                <label for="preferred-date" class="block text-sm font-medium text-gray-700 mb-1">Fecha Preferida:</label>
                <input 
                  type="date" 
                  id="preferred-date" 
                  v-model="sessionRequest.preferredDate" 
                  required 
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                >
              </div>

              <div>
                <label for="preferred-time" class="block text-sm font-medium text-gray-700 mb-1">Hora Preferida:</label>
                <input 
                  type="time" 
                  id="preferred-time" 
                  v-model="sessionRequest.preferredTime" 
                  required 
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                >
              </div>

              <div class="flex justify-end">
                <button 
                  type="submit" 
                  class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                >
                  <i class="fas fa-paper-plane mr-2"></i> Solicitar Sesión
                </button>
              </div>
            </form>
          </div>

          <div class="bg-gradient-to-br from-pink-50 to-white p-6 rounded-2xl shadow-sm border border-pink-100 mb-8">
            <h3 class="text-lg font-semibold text-pink-800 mb-6 flex items-center">
              <i class="fas fa-lightbulb mr-2 text-pink-500"></i> Recursos Educativos y Emocionales
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a v-for="(resource, index) in emotionalResources" :key="index" :href="resource.link" target="_blank"
                class="block bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-pink-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <div class="flex items-center mb-3">
                  <div :class="`w-10 h-10 rounded-lg ${resource.color} flex items-center justify-center text-white mr-3`">
                    <i :class="resource.icon"></i>
                  </div>
                  <h4 class="font-bold text-gray-900 text-lg group-hover:text-pink-600">{{ resource.title }}</h4>
                </div>
                <p class="text-sm text-gray-600">{{ resource.description }}</p>
              </a>
            </div>
          </div>

          <div class="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-sm border border-blue-100">
            <h3 class="text-lg font-semibold text-blue-800 mb-6 flex items-center">
              <i class="fas fa-users mr-2 text-blue-500"></i> Orientación Parental
            </h3>
            <p class="text-gray-700 mb-4">Ofrecemos recursos y sesiones de orientación para padres que buscan fortalecer el bienestar emocional de sus hijos y la dinámica familiar.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 class="font-bold text-gray-900 text-lg mb-2 flex items-center"><i class="fas fa-book-reader mr-2 text-blue-500"></i> Guía para Padres</h4>
                <p class="text-sm text-gray-600 mb-3">Descarga nuestra guía completa sobre comunicación efectiva y apoyo emocional en casa.</p>
                <a href="#" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                  <i class="fas fa-download mr-2"></i> Descargar Guía
                </a>
              </div>
              <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 class="font-bold text-gray-900 text-lg mb-2 flex items-center"><i class="fas fa-calendar-alt mr-2 text-blue-500"></i> Charlas y Talleres</h4>
                <p class="text-sm text-gray-600 mb-3">Consulta el calendario de nuestras próximas charlas y talleres virtuales para padres.</p>
                <a href="#" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                  <i class="fas fa-external-link-alt mr-2"></i> Ver Calendario
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      <TransitionRoot as="template" :show="isSessionRequestModalOpen">
        <Dialog as="div" class="relative z-50" @close="closeSessionRequestModal">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <i class="fas fa-check-circle text-green-600 text-2xl" aria-hidden="true"></i>
                    </div>
                    <div class="mt-3 text-center sm:mt-5">
                      <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">¡Solicitud de Sesión Enviada!</DialogTitle>
                      <div class="mt-2 text-left">
                        <p class="text-sm text-gray-500 mb-4">Hemos recibido tu solicitud de sesión de apoyo emocional. Nuestro equipo revisará tu petición y te contactará pronto con los detalles de confirmación.</p>
                        
                        <div class="space-y-2">
                          <p class="text-sm text-gray-700"><span class="font-medium text-gray-800">Tipo de Sesión:</span> {{ sessionRequest.type }}</p>
                          <p class="text-sm text-gray-700"><span class="font-medium text-gray-800">Preocupación Principal:</span> {{ sessionRequest.concern }}</p>
                          <p class="text-sm text-gray-700"><span class="font-medium text-gray-800">Fecha Preferida:</span> {{ sessionRequest.preferredDate }}</p>
                          <p class="text-sm text-gray-700"><span class="font-medium text-gray-800">Hora Preferida:</span> {{ sessionRequest.preferredTime }}</p>
                        </div>
                        <p class="text-sm text-gray-600 mt-4">Mantente atento a tu correo electrónico o notificaciones para la confirmación de tu cita.</p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-5 sm:mt-6">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600" @click="closeSessionRequestModal">
                      Entendido
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import StudentSidebar from './Student_sidebar.vue';

// --- Estados Reactivos ---
const sessionRequest = ref({
  type: '',
  concern: '',
  preferredDate: '',
  preferredTime: '',
});

const isSessionRequestModalOpen = ref(false);

// --- Datos de Ejemplo para Recursos Educativos/Emocionales ---
const emotionalResources = ref([
  {
    title: 'Guía de Manejo del Estrés',
    description: 'Técnicas y ejercicios prácticos para reducir el estrés diario.',
    icon: 'fas fa-shield-alt',
    color: 'bg-red-500',
    link: '#' // En una aplicación real, sería un enlace a un PDF, artículo, etc.
  },
  {
    title: 'Mindfulness para Adolescentes',
    description: 'Introducción a la atención plena para mejorar la concentración y el bienestar.',
    icon: 'fas fa-brain',
    color: 'bg-green-500',
    link: '#'
  },
  {
    title: 'Fortaleciendo la Autoestima',
    description: 'Consejos para construir una imagen positiva de ti mismo.',
    icon: 'fas fa-user-check',
    color: 'bg-blue-500',
    link: '#'
  },
  {
    title: 'Comunicación Asertiva',
    description: 'Mejora tus habilidades de comunicación en familia y con amigos.',
    icon: 'fas fa-comments',
    color: 'bg-yellow-500',
    link: '#'
  },
]);

// --- Métodos de Interacción ---

const openSessionRequestModal = () => {
  // Aquí puedes añadir lógica para enviar la solicitud a un backend real
  // Por ahora, solo abrimos el modal de confirmación.
  isSessionRequestModalOpen.value = true;
};

const closeSessionRequestModal = () => {
  isSessionRequestModalOpen.value = false;
  // Usar nextTick para asegurar que el modal se cierra visualmente
  // antes de limpiar los datos del formulario, evitando parpadeos o reaperturas.
  nextTick(() => {
    sessionRequest.value = {
      type: '',
      concern: '',
      preferredDate: '',
      preferredTime: '',
    };
  });
};
</script>

<style scoped>
/* Animaciones y estilos personalizados (iguales que en las páginas anteriores) */
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

/* Estilos adicionales para inputs/textareas para que coincidan con el diseño */
input, textarea, select, input[type="date"], input[type="time"] {
  @apply focus:ring-2 focus:ring-offset-0 focus:ring-pink-400 focus:border-pink-400; /* Color de enfoque para el tema psicológico */
}
</style>