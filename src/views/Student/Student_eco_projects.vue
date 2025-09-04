<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 font-sans antialiased text-gray-800 flex">
    
    <StudentSidebar :is-open="true" /> 
    
    <div class="flex-1 md:ml-32 py-10 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto"> 
      <div class="absolute right-10 top-20 opacity-10">
        <div class="w-64 h-64 rounded-full bg-blue-300 filter blur-3xl animate-float-slow"></div>
      </div>
      
      <main class="relative z-10 bg-white rounded-3xl shadow-xl shadow-indigo-100/50 w-full transform transition-all duration-500 ease-out animate-fade-in-up border border-white/50 overflow-hidden">
        <div class="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4 sm:px-8 sm:py-6 text-white">
          <div class="flex items-center">
            <div class="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mr-4 border border-white/20">
              <i class="fas fa-leaf text-2xl"></i>
            </div>
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">Proyectos Ecológicos</h1>
              <p class="text-green-100 mt-1">Encuentra creadores para tus maquetas y proyectos sostenibles.</p>
            </div>
          </div>
        </div>

        <div class="px-6 py-8 sm:p-10 lg:p-12">
          <div class="bg-gradient-to-br from-teal-50 to-white p-6 rounded-2xl shadow-sm border border-teal-100 mb-8">
            <h3 class="text-lg font-semibold text-teal-800 mb-6 flex items-center">
              <i class="fas fa-palette mr-2 text-teal-500"></i> Catálogo de Creadores de Maquetas Ecológicas
            </h3>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="(creator, index) in ecoProjectCreators" 
                :key="index" 
                @click="viewCreatorDetails(creator)"
                :class="[
                  'bg-white p-5 rounded-xl border transition-all shadow-sm cursor-pointer flex flex-col items-center text-center',
                  selectedCreator && selectedCreator.id === creator.id ? 'border-green-500 ring-2 ring-green-200 shadow-md' : 'hover:border-teal-300'
                ]"
              >
                <img :src="creator.avatar" :alt="creator.name" class="w-20 h-20 rounded-full object-cover mb-3 border-2 border-green-300">
                <h4 class="font-bold text-gray-900 text-lg mb-1">{{ creator.name }}</h4>
                <p class="text-sm text-gray-600 mb-2">{{ creator.specialty }}</p>
                <div class="flex space-x-1 text-yellow-400 text-sm">
                    <i v-for="n in 5" :key="n" :class="['fas fa-star', n <= creator.rating ? '' : 'text-gray-300']"></i>
                </div>
                <span class="text-xs text-gray-500 mt-1">({{ creator.reviews }} reseñas)</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <TransitionRoot as="template" :show="isCreatorModalOpen">
        <Dialog as="div" class="relative z-50" @close="closeCreatorModal">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                  <div>
                    <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-100">
                      <i class="fas fa-hands-helping text-teal-600 text-3xl" aria-hidden="true"></i>
                    </div>
                    <div class="mt-3 text-center sm:mt-5">
                      <DialogTitle as="h3" class="text-xl font-semibold leading-6 text-gray-900">{{ selectedCreator ? selectedCreator.name : 'Detalles del Creador' }}</DialogTitle>
                      <p class="text-sm text-gray-500 mt-1 mb-4">{{ selectedCreator ? selectedCreator.specialty : '' }}</p>
                      
                      <div class="mt-2 text-left space-y-5">
                        <div>
                            <h4 class="font-medium text-gray-800 mb-2 flex items-center"><i class="fas fa-images mr-2 text-teal-500"></i> Trabajos Anteriores:</h4>
                            <div v-if="selectedCreator && selectedCreator.portfolio.length" class="grid grid-cols-2 gap-3">
                                <img v-for="(img, idx) in selectedCreator.portfolio" :key="idx" :src="img" alt="Proyecto anterior" class="w-full h-28 object-cover rounded-md shadow-sm border border-gray-200">
                            </div>
                            <p v-else class="text-sm text-gray-500">No hay trabajos anteriores disponibles.</p>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-800 mb-2 flex items-center"><i class="fab fa-whatsapp mr-2 text-green-500"></i> Contacto Rápido:</h4>
                            <a 
                                v-if="selectedCreator" 
                                :href="`https://wa.me/${selectedCreator.whatsapp}`" 
                                target="_blank" 
                                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                            >
                                <i class="fab fa-whatsapp mr-2"></i> Chatear por WhatsApp
                            </a>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-800 mb-2 flex items-center"><i class="fas fa-project-diagram mr-2 text-blue-500"></i> Tipo de Proyecto:</h4>
                            <select 
                                v-model="selectedProjectType" 
                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="">Selecciona un tipo de proyecto</option>
                                <option v-for="(project, pIdx) in selectedCreator.projectTypes" :key="pIdx" :value="project.name">
                                    {{ project.name }}
                                </option>
                            </select>
                        </div>

                        <div v-if="selectedProjectType">
                            <h4 class="font-medium text-gray-800 mb-2 flex items-center"><i class="fas fa-dollar-sign mr-2 text-purple-500"></i> Precios y Formas de Pago:</h4>
                            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <p class="text-sm text-gray-700">
                                    <span class="font-semibold">Precio Estimado:</span> 
                                    {{ getSelectedProjectDetails.priceRange }}
                                </p>
                                <p class="text-sm text-gray-700 mt-2">
                                    <span class="font-semibold">Descripción del Precio:</span> 
                                    {{ getSelectedProjectDetails.description }}
                                </p>
                                <p class="text-sm text-gray-700 mt-2">
                                    <span class="font-semibold">Formas de Pago:</span> 
                                    {{ selectedCreator.paymentMethods.join(', ') }}
                                </p>
                                <p class="text-xs text-gray-500 mt-2">
                                    *Los precios son referenciales y pueden variar según la complejidad del proyecto.
                                </p>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-5 sm:mt-6">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" @click="closeCreatorModal">
                      Cerrar
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
import { ref, computed, nextTick } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import StudentSidebar from './Student_sidebar.vue';

// --- Datos de Ejemplo ---
const ecoProjectCreators = ref([
  {
    id: 1,
    name: 'EcoMaquetas Creativas',
    specialty: 'Maquetas arquitectónicas y paisajísticas con materiales reciclados.',
    avatar: new URL('../../assets/imagenes/maqueta.jpg', import.meta.url).href, 
    rating: 4.8,
    reviews: 75,
    whatsapp: '51987654321', 
    portfolio: [
      'https://via.placeholder.com/300x200/90EE90/FFFFFF?text=Eco+City',
      'https://via.placeholder.com/300x200/98FB98/FFFFFF?text=Rural+Farm',
      'https://via.placeholder.com/300x200/00FA9A/FFFFFF?text=Green+Park'
    ],
    projectTypes: [
      { name: 'Maqueta Urbana', priceRange: 'S/ 200 - S/ 500', description: 'Diseño de ciudades y edificios ecológicos.' },
      { name: 'Maqueta Paisajística', priceRange: 'S/ 150 - S/ 400', description: 'Representación de ecosistemas y paisajes naturales.' },
      { name: 'Maqueta de Energía Renovable', priceRange: 'S/ 250 - S/ 600', description: 'Modelos de paneles solares, molinos de viento, etc.' }
    ],
    paymentMethods: ['Transferencia Bancaria', 'Yape', 'Plin', 'Efectivo']
  },
  {
    id: 2,
    name: 'Artesanía Reciclada "El Sol"',
    specialty: 'Proyectos de arte y maquetas decorativas con enfoque en la reutilización.',
    avatar: new URL('../../assets/imagenes/artesania.jpg', import.meta.url).href, 
    rating: 4.5,
    reviews: 50,
    whatsapp: '51991234567',
    portfolio: [
      'https://via.placeholder.com/300x200/FFD700/FFFFFF?text=Solar+Lamp',
      'https://via.placeholder.com/300x200/DAA520/FFFFFF?text=Recycled+Sculpture',
      'https://via.placeholder.com/300x200/B8860B/FFFFFF?text=Bottle+Planter'
    ],
    projectTypes: [
      { name: 'Obra de Arte Reciclado', priceRange: 'S/ 100 - S/ 300', description: 'Esculturas y decoraciones únicas.' },
      { name: 'Juguete Ecológico', priceRange: 'S/ 80 - S/ 200', description: 'Juguetes educativos hechos de materiales reciclados.' }
    ],
    paymentMethods: ['Yape', 'Plin', 'Efectivo']
  },
  {
    id: 3,
    name: 'BioConstrucciones 3D',
    specialty: 'Modelos a escala de viviendas sostenibles y diseños de bioconstrucción.',
    avatar: new URL('../../assets/imagenes/bio.jpg', import.meta.url).href, 
    rating: 4.9,
    reviews: 90,
    whatsapp: '51978123456',
    portfolio: [
      'https://via.placeholder.com/300x200/87CEEB/FFFFFF?text=EcoHouse',
      'https://via.placeholder.com/300x200/6495ED/FFFFFF?text=Vertical+Garden',
      'https://via.placeholder.com/300x200/4682B4/FFFFFF?text=Rainwater+System'
    ],
    projectTypes: [
      { name: 'Maqueta de Vivienda Sostenible', priceRange: 'S/ 300 - S/ 800', description: 'Modelos detallados de casas ecológicas.' },
      { name: 'Sistemas Bio-Integrados', priceRange: 'S/ 280 - S/ 700', description: 'Diseños de sistemas de agua y energía.' }
    ],
    paymentMethods: ['Transferencia Bancaria', 'Yape']
  }
]);

// --- Estados Reactivos ---
const selectedCreator = ref(null);
const isCreatorModalOpen = ref(false);
const selectedProjectType = ref(''); 

// --- Propiedad Computada para Detalles del Proyecto Seleccionado ---
const getSelectedProjectDetails = computed(() => {
  if (selectedCreator.value && selectedProjectType.value) {
    const project = selectedCreator.value.projectTypes.find(
      (p) => p.name === selectedProjectType.value
    );
    return project || { priceRange: 'N/A', description: 'Selecciona un tipo de proyecto para ver los detalles.' };
  }
  return { priceRange: 'N/A', description: 'Selecciona un tipo de proyecto para ver los detalles.' };
});

// --- Métodos de Interacción con el Modal ---
const viewCreatorDetails = (creator) => {
  selectedProjectType.value = ''; 
  selectedCreator.value = creator;
  isCreatorModalOpen.value = true;
};

const closeCreatorModal = () => {
  isCreatorModalOpen.value = false;
  nextTick(() => {
    selectedCreator.value = null;     
    selectedProjectType.value = '';  
  });
};
</script>

<style scoped>
/* Animaciones y estilos personalizados */
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
input[type="text"], textarea, select {
  @apply focus:ring-2 focus:ring-offset-0 focus:ring-green-400 focus:border-green-400; 
}
</style>