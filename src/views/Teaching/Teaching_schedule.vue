<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 font-sans antialiased text-gray-800">

    <TeachingHeader :profilePhotoUrl="profile.photoUrl" @toggleSidebar="toggleSidebar" />

    <TeachingSidebar :isOpen="isSidebarOpen" @closeSidebarOnMobile="closeSidebar" />

    <div
      v-if="isSidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden transition-opacity duration-300"
    ></div>

    <div class="md:ml-64 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <main class="relative z-10 bg-white p-6 sm:p-10 lg:p-12 rounded-3xl shadow-xl shadow-indigo-100/50 w-full max-w-7xl mx-auto transform transition-all duration-500 ease-out animate-fade-in-up border border-indigo-50">
        <h2 class="text-4xl font-extrabold text-indigo-800 tracking-tight mb-6 pb-4 border-b border-gray-200">
          🗓 Mi Calendario de Disponibilidad
        </h2>

        <p class="text-gray-600 text-lg mb-8 leading-relaxed">
          Haz clic en las franjas horarias para marcarlas como disponibles (<span class="inline-block w-4 h-4 bg-indigo-100 border border-indigo-300 rounded-sm align-middle mr-1"></span>) o no disponibles (<span class="inline-block w-4 h-4 bg-gray-100 border border-gray-200 rounded-sm align-middle mr-1"></span>).
          Los padres podrán ver y reservar estas horas desde su propia interfaz.
        </p>

        <div class="calendar-container">
          <div class="calendar-header">
            <div class="corner-cell"></div> <div v-for="day in daysOfWeek" :key="day.value" class="day-label">
              {{ day.label }}
            </div>
          </div>

          <div class="calendar-body">
            <template v-for="slot in scheduleData" :key="slot.time">
              <div class="time-label">{{ slot.time }}</div>
              <div
                v-for="dayObj in slot.days"
                :key="dayObj.day"
                :class="{
                  'available-cell': dayObj.isAvailable,
                  'unavailable-cell': !dayObj.isAvailable
                }"
                @click="toggleAvailability(slot.time, dayObj.day)"
                class="schedule-cell group"
                :title="`Clic para ${dayObj.isAvailable ? 'desmarcar' : 'marcar'} ${dayObj.dayLabel} a las ${slot.time}`"
              >
                <i v-if="dayObj.isAvailable" class="fas fa-check text-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-150"></i>
              </div>
            </template>
          </div>
        </div>

        <div class="mt-10 text-center">
          <button @click="saveAvailability"
                  class="px-10 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2">
            <i class="fas fa-calendar-check mr-2"></i> Guardar Horarios Disponibles
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TeachingSidebar from './Teaching_sidebar.vue';
import TeachingHeader from './Teaching_header.vue'; // Importa el nuevo componente de header

// Simula el estado de la sidebar
const isSidebarOpen = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
const closeSidebar = () => {
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false;
  }
};

const router = useRouter();

// Días de la semana para los encabezados y la lógica
const daysOfWeek = [
  { label: 'Lunes', value: 'mon' },
  { label: 'Martes', value: 'tue' },
  { label: 'Miércoles', value: 'wed' },
  { label: 'Jueves', value: 'thu' },
  { label: 'Viernes', value: 'fri' },
  { label: 'Domingo', value: 'sun' },
];

// Generar franjas horarias (ej. de 9 AM a 6 PM en intervalos de 30 minutos)
const generateTimeSlots = () => {
  const slots = [];
  for (let h = 9; h <= 18; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00`);
    if (h < 18) {
      slots.push(`${h.toString().padStart(2, '0')}:30`);
    }
  }
  return slots;
};

// ** Nueva estructura de datos para el horario **
// scheduleData será un array de objetos, donde cada objeto representa una franja horaria.
// Cada objeto de franja horaria contendrá un array days con el estado de disponibilidad para cada día.
const scheduleData = ref([]);

// Inicializa scheduleData con todas las franjas no disponibles
const initializeScheduleData = () => {
  const timeSlots = generateTimeSlots();
  scheduleData.value = timeSlots.map(time => ({
    time: time,
    days: daysOfWeek.map(day => ({
      day: day.value,
      dayLabel: day.label,
      isAvailable: false // Por defecto, todo no disponible
    }))
  }));
};

// Carga la disponibilidad guardada (simulada)
const loadAvailability = () => {
  // En un entorno real, harías una llamada a la API aquí para obtener los datos del docente
  // La API probablemente devolvería algo como:
  // {
  //    'mon': ['09:00', '09:30', '10:00'],
  //    'tue': ['11:00'],
  //    'sun': ['14:00', '14:30']
  // }
  const mockAvailabilityFromBackend = {
    'mon': ['09:00', '09:30', '10:00'],
    'tue': ['11:00', '11:30'],
    'wed': ['14:00'],
    'fri': ['16:00', '16:30'],
    'sun': ['10:00', '10:30', '11:00']
  };

  initializeScheduleData(); // Primero, resetear todo a no disponible

  // Luego, actualizar scheduleData basándose en los datos del backend
  for (const dayCode in mockAvailabilityFromBackend) {
    const availableTimesForDay = mockAvailabilityFromBackend[dayCode];

    availableTimesForDay.forEach(time => {
      const slotIndex = scheduleData.value.findIndex(s => s.time === time);
      if (slotIndex !== -1) {
        const dayIndex = scheduleData.value[slotIndex].days.findIndex(d => d.day === dayCode);
        if (dayIndex !== -1) {
          scheduleData.value[slotIndex].days[dayIndex].isAvailable = true;
        }
      }
    });
  }
};

// Cargar la disponibilidad al montar el componente
onMounted(() => {
  loadAvailability();
});

// Alterna la disponibilidad de una franja horaria específica
const toggleAvailability = (time, dayCode) => {
  const slot = scheduleData.value.find(s => s.time === time);
  if (slot) {
    const day = slot.days.find(d => d.day === dayCode);
    if (day) {
      day.isAvailable = !day.isAvailable;
    }
  }
};

// Guarda la disponibilidad (simulada)
const saveAvailability = () => {
  // Construir el objeto de datos para enviar al backend
  const availabilityToSend = {};
  daysOfWeek.forEach(day => {
    availabilityToSend[day.value] = []; // Inicializa un array vacío para cada día
  });

  scheduleData.value.forEach(slot => {
    slot.days.forEach(dayObj => {
      if (dayObj.isAvailable) {
        availabilityToSend[dayObj.day].push(slot.time);
      }
    });
  });

  console.log('Disponibilidad a enviar al backend:', availabilityToSend);

  // Aquí harías tu llamada a la API (fetch o axios)
  /*
  fetch('/api/teacher/availability', {
    method: 'POST', // o PUT, dependiendo de tu API
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${yourAuthToken}`
    },
    body: JSON.stringify(availabilityToSend)
  })
  .then(response => {
    if (!response.ok) throw new Error('Error al guardar la disponibilidad');
    return response.json();
  })
  .then(data => {
    alert('¡Disponibilidad guardada con éxito! Tus horarios están listos para ser reservados.');
    console.log('Respuesta del servidor:', data);
  })
  .catch(error => {
    alert(`Error al guardar la disponibilidad: ${error.message}`);
    console.error('Error al guardar disponibilidad:', error);
  });
  */

  // Simulación de guardado exitoso
  alert('¡Disponibilidad guardada con éxito! Tus horarios están listos para ser reservados.');
};

// Placeholder para la URL de la foto de perfil del docente
const profile = ref({
  photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cfdce567?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
});

</script>

<style scoped>
/* Animación para el contenido principal */
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

/* Estilos de la Cuadrícula del Calendario */
.calendar-container {
  border: 1px solid #e0e7ff; /* indigo-100 */
  border-radius: 1.25rem; /* rounded-2xl */
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
  background-color: #ffffff;
}

.calendar-header, .calendar-body {
  display: grid;
  /* 90px para la columna de la hora, luego una columna igual para cada día */
  grid-template-columns: 90px repeat(6, 1fr);
  gap: 2px; /* Espacio mínimo entre celdas para un look cohesionado */
}

.calendar-header {
  background-color: #f0f4f8; /* Un gris azulado suave para el encabezado */
  padding-bottom: 2px; /* Un pequeño padding inferior para el borde */
}

.corner-cell {
  /* Celda vacía en la esquina superior izquierda */
  background-color: #f0f4f8; /* igual que el header */
}

.day-label, .time-label {
  padding: 12px 8px; /* Padding generoso */
  font-weight: 700; /* Extra bold */
  text-align: center;
  color: #4338ca; /* indigo-700 */
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e0e7ff; /* indigo-100 */
}

.time-label {
  justify-content: flex-end; /* Alinear horas a la derecha */
  padding-right: 15px; /* Más espacio a la derecha */
  background-color: #f8fafc; /* Un fondo ligeramente diferente para las etiquetas de tiempo */
  border-right: 1px solid #e0e7ff; /* Borde a la derecha para separar de las celdas */
}

.schedule-cell {
  min-height: 48px; /* Altura de cada celda de disponibilidad */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.25s ease-in-out, transform 0.1s ease-out, box-shadow 0.2s ease;
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem; /* Bordes redondeados en las celdas */
  margin: 1px; /* Espacio entre celdas */
}

/* Colores de estado */
.unavailable-cell {
  background-color: #fefefe; /* Casi blanco */
  border: 1px solid #e2e8f0; /* gray-200 */
  color: #cbd5e0; /* gray-400 */
}

.available-cell {
  background-color: #e0e7ff; /* indigo-100 */
  border: 1px solid #a5b4fc; /* indigo-300 */
  color: #4338ca; /* indigo-700 */
  box-shadow: inset 0 0 0 1px rgba(99, 102, 241, 0.2); /* Sutil sombra interna */
}

/* Efectos al pasar el ratón */
.schedule-cell:hover {
  transform: translateY(-2px); /* Ligero levantamiento */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08); /* Sombra más pronunciada */
}

.available-cell:hover {
  background-color: #c7d2fe; /* indigo-200 más vibrante */
}

.unavailable-cell:hover {
  background-color: #f1f5f9; /* gray-100 para no disponibles */
}

/* Visibilidad del checkmark */
.schedule-cell .fa-check {
  opacity: 0; /* Por defecto oculto */
}
.schedule-cell.available-cell .fa-check {
  opacity: 1; /* Visible solo cuando es una celda disponible */
  color: #4338ca; /* indigo-700 */
}
.schedule-cell:hover .fa-check {
    opacity: 1; /* Visible al hacer hover para feedback */
}

/* Media Queries para responsividad */
@media (max-width: 1024px) {
  .calendar-header, .calendar-body {
    grid-template-columns: 80px repeat(6, 1fr);
    gap: 1px;
  }
  .day-label, .time-label {
    font-size: 0.85rem;
    padding: 10px 6px;
  }
  .schedule-cell {
    min-height: 40px;
    margin: 0.5px;
  }
}

@media (max-width: 768px) {
  .md\:ml-64 {
    margin-left: 0 !important;
  }
  .calendar-header, .calendar-body {
    grid-template-columns: 50px repeat(6, 1fr); /* Reducir la columna de horas */
    font-size: 0.7rem;
    gap: 1px;
  }
  .day-label, .time-label {
    padding: 6px 2px;
    font-weight: 600;
  }
  .time-label {
    padding-right: 5px; /* Reducir padding a la derecha */
  }
  .schedule-cell {
    min-height: 30px;
    margin: 0.5px;
    border-radius: 0.3rem;
  }
  h2 {
    font-size: 2rem;
  }
  p {
    font-size: 0.9rem;
  }
  button {
    padding: 0.75rem 1.5rem !important;
    font-size: 0.9rem !important;
  }
}
</style>