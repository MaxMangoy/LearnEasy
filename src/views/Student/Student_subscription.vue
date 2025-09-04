<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 font-sans antialiased text-gray-800 flex">
    
    <StudentSidebar :is-open="true" /> 
    
    <div class="flex-1 md:ml-32 py-10 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto"> 
      <div class="absolute right-10 top-20 opacity-10">
        <div class="w-64 h-64 rounded-full bg-blue-300 filter blur-3xl animate-float-slow"></div>
      </div>
      
      <main class="relative z-10 bg-white rounded-3xl shadow-xl shadow-blue-100/50 w-full transform transition-all duration-500 ease-out animate-fade-in-up border border-white/50 overflow-hidden">
        <div class="bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-4 sm:px-8 sm:py-6 text-white">
          <div class="flex items-center">
            <div class="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mr-4 border border-white/20">
              <i class="fas fa-gem text-2xl"></i> </div>
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">Mi Suscripción</h1>
              <p class="text-teal-100 mt-1">Gestiona tu plan, métodos de pago y comprobantes.</p>
            </div>
          </div>
        </div>

        <div class="px-6 py-8 sm:p-10 lg:p-12">
          
          <div class="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-sm border border-green-100 mb-8">
            <h3 class="text-lg font-semibold text-green-800 mb-6 flex items-center">
              <i class="fas fa-check-circle mr-2 text-green-500"></i> Estado de la Suscripción
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Estado Actual:</p>
                  <p class="text-2xl font-bold" :class="subscription.isActive ? 'text-green-600' : 'text-red-600'">
                    {{ subscription.isActive ? 'Activa' : 'Inactiva' }}
                  </p>
                </div>
                <i :class="subscription.isActive ? 'fas fa-check-circle text-green-500 text-3xl' : 'fas fa-times-circle text-red-500 text-3xl'"></i>
              </div>

              <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <p class="text-sm font-medium text-gray-500 mb-2">Plan Actual:</p>
                <p class="text-xl font-semibold text-gray-900">{{ subscription.planName }}</p>
                <p class="text-sm text-gray-600 mt-1">{{ subscription.planDescription }}</p>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-sm border border-blue-100 mb-8">
              <h3 class="text-lg font-semibold text-blue-800 mb-6 flex items-center">
                  <i class="fas fa-rocket mr-2 text-blue-500"></i> Nuestros Planes
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div 
                      v-for="plan in availablePlans" 
                      :key="plan.id" 
                      :class="[
                          'bg-white p-6 rounded-xl border shadow-md flex flex-col',
                          plan.isCurrent ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'
                      ]"
                  >
                      <h4 class="font-bold text-gray-900 text-xl mb-2">{{ plan.name }}</h4>
                      <p class="text-3xl font-bold text-blue-600 mb-3">{{ plan.price }}<span class="text-base font-normal text-gray-500">/mes</span></p>
                      <ul class="text-sm text-gray-700 space-y-2 mb-6 flex-grow">
                          <li v-for="(feature, fIdx) in plan.features" :key="fIdx" class="flex items-start">
                              <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i> <p>{{ feature }}</p>
                          </li>
                      </ul>
                      <button 
                          v-if="!plan.isCurrent"
                          @click="selectPlan(plan)"
                          class="mt-auto w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                          {{ plan.name === 'Prueba gratuita' ? 'Activar Gratis' : 'Seleccionar Plan' }}
                      </button>
                      <button 
                          v-else
                          disabled
                          class="mt-auto w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-700 bg-blue-100 cursor-not-allowed"
                      >
                          <i class="fas fa-star mr-2"></i> Plan Actual
                      </button>
                  </div>
              </div>
              <p class="text-sm text-gray-600 mt-6">¿Necesitas algo diferente? <a href="#" class="text-blue-600 hover:underline">Contáctanos para un plan personalizado.</a></p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-sm border border-blue-100 mb-8">
            <h3 class="text-lg font-semibold text-blue-800 mb-6 flex items-center">
              <i class="fas fa-calendar-alt mr-2 text-blue-500"></i> Fecha de Renovación
            </h3>
            
            <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Tu suscripción se renovará el:</p>
                <p class="text-2xl font-bold text-blue-600 mt-1">{{ subscription.renewalDate }}</p>
                <p class="text-sm text-gray-600 mt-2">Asegúrate de que tu método de pago esté actualizado para evitar interrupciones.</p>
              </div>
              <i class="fas fa-history text-blue-400 text-3xl"></i>
            </div>
          </div>

          <div class="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl shadow-sm border border-purple-100 mb-8">
            <h3 class="text-lg font-semibold text-purple-800 mb-6 flex items-center">
              <i class="fas fa-credit-card mr-2 text-purple-500"></i> Métodos de Pago
            </h3>
            
            <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-4">
              <p class="text-sm font-medium text-gray-500 mb-2">Método de Pago Principal:</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <i :class="getCardIcon(paymentMethod.cardType)" class="text-3xl text-gray-600 mr-3"></i>
                  <div>
                    <p class="font-bold text-gray-900">{{ paymentMethod.cardType }} **** {{ paymentMethod.lastFourDigits }}</p>
                    <p class="text-sm text-gray-600">Expira: {{ paymentMethod.expiryDate }}</p>
                  </div>
                </div>
                <button 
                  @click="managePaymentMethods" 
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                >
                  <i class="fas fa-edit mr-2"></i> Gestionar
                </button>
              </div>
            </div>
            
            <p class="text-sm text-gray-600">Puedes añadir o actualizar tus tarjetas en cualquier momento.</p>
          </div>

          <div class="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-2xl shadow-sm border border-yellow-100">
            <h3 class="text-lg font-semibold text-yellow-800 mb-6 flex items-center">
              <i class="fas fa-file-invoice mr-2 text-yellow-500"></i> Descargar Comprobantes
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="(invoice, index) in invoices" :key="index"
                class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between"
              >
                <div>
                  <p class="font-bold text-gray-900">Factura #{{ invoice.number }}</p>
                  <p class="text-sm text-gray-600">Fecha: {{ invoice.date }}</p>
                  <p class="text-sm text-gray-600">Monto: {{ invoice.amount }}</p>
                </div>
                <button 
                  @click="downloadInvoice(invoice.id)" 
                  class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition-colors"
                >
                  <i class="fas fa-download"></i>
                </button>
              </div>
              <p v-if="invoices.length === 0" class="text-gray-600 col-span-full">No hay comprobantes disponibles en este momento.</p>
            </div>
            <p class="text-sm text-gray-600 mt-4">Si necesitas un comprobante anterior, contáctanos.</p>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import StudentSidebar from './Student_sidebar.vue';

// --- Datos de Ejemplo para la Suscripción Actual ---
const subscription = ref({
  isActive: true, // true para activa, false para inactiva
  planName: 'Full refuerzo', // Actualizado para que coincida con uno de los nuevos planes
  planDescription: 'La mejor experiencia con acceso exclusivo y beneficios adicionales.',
  renewalDate: '15 de Julio de 2025',
});

// --- Datos de Ejemplo para los Planes Disponibles (ACTUALIZADOS) ---
const availablePlans = ref([
  {
    id: 1,
    name: 'Prueba gratuita',
    price: 'S/0.00',
    description: '', // Se deja vacío o se combina con la primera característica si es corta
    features: [
      'Acceso a 1 clase virtual demostrativa.',
      'Acceso a 1 curso.'
    ],
    isCurrent: false,
  },
  {
    id: 2,
    name: 'Básico',
    price: 'S/60.00',
    description: '',
    features: [
      '1 sesión/semana',
      'Chat de comunicación hasta 6 horas después de clase',
      'Apoyo con videos de YouTube sugeridos',
      'Examen quincenal para medir avances.'
    ],
    isCurrent: false,
  },
  {
    id: 3,
    name: 'Clásico',
    price: 'S/130',
    description: '',
    features: [
      'Acceso a 2 cursos.',
      '2 sesiones por semana',
      'Chat de comunicación hasta 12 horas después de la clase',
      'Apoyo con videos personalizados',
      'Material didáctico imprimible.',
      'Examen semanal',
      'Seguimiento de docente',
      '1 sesión de asesoría psicológica mensual.'
    ],
    isCurrent: false,
  },
  {
    id: 4,
    name: 'Full refuerzo',
    price: 'S/200',
    description: '',
    features: [
      'Acceso a 3 cursos',
      '3 sesiones/semana',
      'Chat de comunicación ilimitado durante el día',
      'Apoyo con videos totalmente personalizados',
      'Material didáctico digital e imprimible.',
      'Material de refuerzo únicamente visible en plataforma',
      'Examen semanal por curso',
      'Seguimiento de docente totalmente personalizado y constante',
      '2 sesiones de asesoría psicológica mensual.'
    ],
    isCurrent: true, // Asumimos que este es el plan actual por ser el más completo
  },
]);

// Actualizar el estado de `isCurrent` basado en `subscription.planName`
availablePlans.value.forEach(plan => {
  if (plan.name === subscription.value.planName) {
    plan.isCurrent = true;
  } else {
    plan.isCurrent = false;
  }
});


const paymentMethod = ref({
  cardType: 'Visa', 
  lastFourDigits: '1234',
  expiryDate: '12/26',
});

const invoices = ref([
  { id: 'inv-001', number: '2024001', date: '15/07/2024', amount: '$49.99' },
  { id: 'inv-002', number: '2023001', date: '15/07/2023', amount: '$49.99' },
]);

// --- Métodos de Ayuda / Lógica ---

const getCardIcon = (cardType) => {
  switch (cardType.toLowerCase()) {
    case 'visa':
      return 'fab fa-cc-visa';
    case 'mastercard':
      return 'fab fa-cc-mastercard';
    case 'amex':
      return 'fab fa-cc-amex';
    case 'discover':
      return 'fab fa-cc-discover';
    default:
      return 'fas fa-credit-card';
  }
};

const managePaymentMethods = () => {
  alert('Redirigiendo a la gestión de métodos de pago...');
  // En una aplicación real, sería router.push('/student/payment-methods')
};

const downloadInvoice = (invoiceId) => {
  alert(`Descargando comprobante ${invoiceId}...`);
  // En una aplicación real, harías una llamada a la API para obtener el archivo
};

const selectPlan = (plan) => {
  if (confirm(`¿Estás seguro de que quieres cambiar a ${plan.name} por ${plan.price}/mes?`)) {
      alert(`Plan "${plan.name}" seleccionado. Se procesará tu solicitud.`);
      // Aquí iría la lógica real para actualizar el plan del usuario en el backend.
      // Después de una actualización exitosa, podrías actualizar `subscription.value`
      // y el estado `isCurrent` de `availablePlans`.
      // Por ejemplo:
      // subscription.value.planName = plan.name;
      // availablePlans.value.forEach(p => p.isCurrent = (p.id === plan.id));
  }
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
  @apply focus:ring-2 focus:ring-offset-0 focus:ring-blue-400 focus:border-blue-400; /* Color de enfoque para el tema de suscripción */
}
</style>