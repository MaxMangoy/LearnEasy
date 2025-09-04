<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-white font-sans antialiased text-gray-800">

    <TeachingHeader :profilePhotoUrl="profile.photoUrl" @toggleSidebar="toggleSidebar" />

    <TeachingSidebar :isOpen="isOpen" @closeSidebarOnMobile="closeSidebar" />

    <div
      v-if="isOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden transition-opacity duration-300"
    ></div>

    <div class="md:ml-64 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <main class="relative z-10 bg-white p-6 sm:p-10 lg:p-12 rounded-2xl shadow-xl w-full max-w-5xl mx-auto transform transition-all duration-500 ease-out animate-fade-in-up border border-gray-100">
        <h2 class="text-3xl font-extrabold text-sky-700 tracking-tight mb-8 pb-4 border-b border-gray-200">
          Bienvenido, {{ profile.name.split(' ')[0] || 'Docente' }} </h2>

        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div class="bg-sky-50 p-5 rounded-lg shadow-md border border-sky-100 hover:shadow-lg transition-shadow duration-300">
            <h3 class="text-lg font-semibold text-sky-700 mb-3 flex items-center">
              <i class="fas fa-book-open mr-2 text-sky-500"></i> Cursos Recientes
            </h3>
            <ul class="list-none space-y-2">
              <li v-for="course in recentCourses" :key="course.id" class="text-gray-700 hover:text-sky-600 transition-colors duration-200">
                <a href="#" class="block py-1">{{ course.name }}</a>
              </li>
            </ul>
          </div>

          <div class="bg-green-50 p-5 rounded-lg shadow-md border border-green-100 hover:shadow-lg transition-shadow duration-300">
            <h3 class="text-lg font-semibold text-green-700 mb-3 flex items-center">
              <i class="fas fa-tasks mr-2 text-green-500"></i> Calificaciones Pendientes
            </h3>
            <p class="text-gray-700 mb-3">Tienes <strong class="text-xl">{{ pendingAssignments }}</strong> tareas por calificar.</p>
            <button class="px-4 py-2 bg-green-300 text-green-800 rounded-md hover:bg-green-400 transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1">
              Ir a Calificaciones
            </button>
          </div>

          <div class="bg-yellow-50 p-5 rounded-lg shadow-md border border-yellow-100 hover:shadow-lg transition-shadow duration-300">
            <h3 class="text-lg font-semibold text-yellow-700 mb-3 flex items-center">
              <i class="fas fa-chart-bar mr-2 text-yellow-500"></i> Estadísticas Rápidas
            </h3>
            <p class="text-sm text-gray-600 mb-2">Progreso promedio de tus estudiantes:</p>
            <strong class="text-2xl text-gray-800">{{ averageProgress }}%</strong>
          </div>
        </section>

        <section class="mb-10 pt-8 border-t border-gray-200">
          <h3 class="text-xl font-semibold text-gray-700 mb-5 flex items-center">
            <i class="fas fa-user mr-3 text-sky-600 text-2xl"></i> Datos Personales
          </h3>
          <form @submit.prevent="saveProfile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">

              <div class="md:col-span-2 flex flex-col items-center space-y-4 mb-4">
                <div class="relative group">
                  <img :src="profile.photoUrl || '/default-avatar.png'" alt="Foto del Docente"
                           class="w-36 h-36 rounded-full object-cover border-4 border-sky-400 shadow-md transform transition-transform duration-200 group-hover:scale-105">
                  <input type="file" ref="photoInput" @change="handleFileUpload" class="hidden" accept="image/*">
                  <button v-if="isEditingProfile" type="button" @click="openFilePicker"
                            class="absolute bottom-0 right-0 p-2 bg-sky-500 text-white rounded-full shadow-lg hover:bg-sky-600 transition-colors duration-200 transform translate-y-1/4 translate-x-1/4 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            aria-label="Cambiar foto de perfil">
                    <i class="fas fa-camera text-lg"></i>
                  </button>
                </div>
                <p v-if="isEditingProfile" class="text-sm text-gray-500 mt-2">Haz clic en la cámara para cambiar tu foto.</p>
              </div>

              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input type="text" id="name" v-model="profile.name" :disabled="!isEditingProfile" placeholder="Ej: Ana María Pérez García"
                           class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-base transition-colors duration-200"
                           :class="{ 'bg-gray-50 text-gray-600': !isEditingProfile, 'bg-white': isEditingProfile }"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input type="email" id="email" v-model="profile.email" :disabled="true" placeholder="ejemplo@learn.easy.com"
                           class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-base transition-colors duration-200"
                           :class="{ 'bg-gray-50 text-gray-600': true, 'bg-white': isEditingProfile }"
                />
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input type="tel" id="phone" v-model="profile.phone" :disabled="!isEditingProfile" placeholder="+51 987 654 321"
                           class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-base transition-colors duration-200"
                           :class="{ 'bg-gray-50 text-gray-600': !isEditingProfile, 'bg-white': isEditingProfile }"
                />
              </div>
              <div>
                <label for="specialties" class="block text-sm font-medium text-gray-700 mb-1">Especialidades</label>
                <input type="text" id="specialties" v-model="profile.specialties" :disabled="!isEditingProfile" placeholder="Ej: Matemáticas, Ciencias"
                           class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-base transition-colors duration-200"
                           :class="{ 'bg-gray-50 text-gray-600': !isEditingProfile, 'bg-white': isEditingProfile }"
                />
              </div>
              <div class="md:col-span-2">
                <label for="experience" class="block text-sm font-medium text-gray-700 mb-1">Años de Experiencia</label>
                <input type="number" id="experience" v-model="profile.yearsOfExperience" :disabled="!isEditingProfile" placeholder="Ej: 8"
                           class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-base transition-colors duration-200"
                           :class="{ 'bg-gray-50 text-gray-600': !isEditingProfile, 'bg-white': isEditingProfile }"
                   />
              </div>
               <div class="md:col-span-2" v-if="profile.cvUrl">
                <label class="block text-sm font-medium text-gray-700 mb-1">Currículum Vitae (CV)</label>
                <a :href="profile.cvUrl" target="_blank" class="text-blue-600 hover:underline flex items-center">
                  <i class="fas fa-file-pdf mr-2 text-lg"></i> Ver CV Actual
                </a>
              </div>
            </div>
            <div class="flex justify-end space-x-4 mt-8">
              <button v-if="!isEditingProfile" type="button" @click="isEditingProfile = true"
                            class="px-6 py-2 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                <i class="fas fa-edit mr-2"></i> Editar Perfil
              </button>
              <template v-else>
                <button type="button" @click="cancelEditProfile"
                                 class="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                  Cancelar
                </button>
                <button type="submit" ref="saveButton"
                                 class="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 relative overflow-hidden">
                  <i class="fas fa-save mr-2"></i> Guardar Cambios
                  <span ref="saveConfirmation" class="absolute top-0 left-0 w-full h-full bg-green-700 opacity-0 flex items-center justify-center text-white text-xl rounded-lg transition-opacity duration-300 pointer-events-none">
                    <i class="fas fa-check"></i>
                  </span>
                </button>
              </template>
            </div>
          </form>
        </section>

        <section class="mb-10 pt-8 border-t border-gray-200">
          <h3 class="text-xl font-semibold text-gray-700 mb-5 flex items-center">
            <i class="fas fa-chalkboard-teacher mr-3 text-amber-600 text-2xl"></i> Cursos Asignados
          </h3>
          <div v-if="profile.assignedCourses && profile.assignedCourses.length > 0" class="space-y-4">
            <div v-for="course in profile.assignedCourses" :key="course.id"
                 class="bg-gray-50 p-4 rounded-lg border border-gray-100 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-200">
                <span class="font-medium text-gray-800 text-lg">{{ course.name }}</span>
                <span class="text-sm text-gray-600 px-3 py-1 bg-gray-200 rounded-full">{{ course.level }}</span>
            </div>
          </div>
          <p v-else class="text-gray-500 italic p-4 bg-gray-50 rounded-lg border border-gray-100">
            No tienes cursos asignados actualmente.
          </p>
        </section>

        <section class="pt-8 border-t border-gray-200">
          <h3 class="text-xl font-semibold text-gray-700 mb-5 flex items-center">
            <i class="fas fa-lock mr-3 text-red-600 text-2xl"></i> Cambiar Contraseña
          </h3>
          <form @submit.prevent="changePassword" class="space-y-6">
            <div>
              <label for="current-password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
              <input type="password" id="current-password" v-model="password.current" required
                           class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-base transition-colors duration-200"
              />
            </div>
            <div>
              <label for="new-password" class="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
              <input type="password" id="new-password" v-model="password.new" required
                           class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-base transition-colors duration-200"
              />
            </div>
            <div>
              <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-1">Confirmar Nueva Contraseña</label>
              <input type="password" id="confirm-password" v-model="password.confirm" required
                           class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-base transition-colors duration-200"
              />
            </div>
            <div class="flex justify-end mt-8">
              <button type="submit" ref="passwordButton"
                            class="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 relative overflow-hidden">
                Actualizar Contraseña
                <span ref="passwordConfirmation" class="absolute top-0 left-0 w-full h-full bg-red-700 opacity-0 flex items-center justify-center text-white text-xl rounded-lg transition-opacity duration-300 pointer-events-none">
                  <i class="fas fa-check"></i>
                </span>
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TeachingSidebar from './Teaching_sidebar.vue';
import TeachingHeader from './Teaching_header.vue';
import apiClient from '@/axios'; // <<-- IMPORTAR TU INSTANCIA PERSONALIZADA DE AXIOS
import { useUserStore } from '@/stores/user'; // <<-- IMPORTAR TU STORE DE USUARIO

// Si usarás una librería de notificaciones (ej: Vue-Toastification), la importarías aquí
// import { useToast } from 'vue-toastification';

const router = useRouter();
const userStore = useUserStore(); // <<-- INSTANCIAR TU STORE
// const toast = useToast(); // Descomentar si usas Vue-Toastification

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://127.0.0.1:8000';

const isOpen = ref(false);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const closeSidebar = () => {
  if (window.innerWidth < 768) {
    isOpen.value = false;
  }
};

const photoInput = ref(null);
const saveButton = ref(null);
const saveConfirmation = ref(null);
const passwordButton = ref(null);
const passwordConfirmation = ref(null);

const profile = ref({
  name: '',
  email: '',
  phone: '',
  specialties: '',
  yearsOfExperience: null,
  photoUrl: 'https://via.placeholder.com/150/EEEEEE/808080?text=Foto',
  cvUrl: '',
  assignedCourses: [],
});

const isEditingProfile = ref(false);
let originalProfile = null;

const password = ref({
  current: '',
  new: '',
  confirm: '',
});

const recentCourses = ref([]);
const pendingAssignments = ref(0);
const averageProgress = ref(0);

// --- FUNCIÓN CORREGIDA PARA CARGAR EL PERFIL DEL DOCENTE DESDE EL BACKEND ---
const loadTeacherProfile = async () => {
  // const token = localStorage.getItem('userToken'); // <<-- ELIMINAR ESTA LÍNEA
  const token = userStore.token; // <<-- USAR EL TOKEN DEL STORE DE PINIA
  
  if (!token) {
    console.error('No se encontró el token de autenticación en el store. Redirigiendo al login.');
    router.push('/teacher-login');
    // Asegurarse de limpiar el estado por si acaso
    userStore.clearAuthData();
    return;
  }

  try {
    // Usar tu apiClient configurado con interceptores
    const response = await apiClient.get(`${API_BASE_URL}/teacher/me/profile`); // NO NECESITAS PASAR EL HEADER AQUÍ, EL INTERCEPTOR DE apiClient LO HACE
    
    const apiProfile = response.data;
    console.log('Perfil del docente cargado desde API:', apiProfile);

    profile.value.name = apiProfile.full_name;
    profile.value.email = apiProfile.email;
    profile.value.phone = apiProfile.phone_number;
    profile.value.specialties = apiProfile.specialties;
    profile.value.yearsOfExperience = apiProfile.years_of_experience;
    profile.value.cvUrl = apiProfile.cv_url ? `${API_BASE_URL}/${apiProfile.cv_url}` : '';

    // Asumimos que photo_url es parte de la respuesta o se gestiona aparte
    profile.value.photoUrl = apiProfile.photo_url || 'https://via.placeholder.com/150/EEEEEE/808080?text=Foto';

    originalProfile = { ...profile.value };

  } catch (error) {
    console.error('Error al cargar el perfil del docente:', error);
    // Manejo de error más robusto
    if (error.response && error.response.status === 401) {
      alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.');
      userStore.logout(); // Usar la acción de logout de Pinia para limpiar todo
      router.push('/teacher-login');
    } else {
      alert('Hubo un error al cargar tu perfil. Inténtalo de nuevo más tarde.');
      // En caso de otros errores, también podrías considerar desloguear
      // userStore.logout();
      // router.push('/teacher-login');
    }
  }
};
// --- FIN DE LA FUNCIÓN CORREGIDA ---

onMounted(() => {
  loadTeacherProfile();

  recentCourses.value = [
    { id: 1, name: 'Matemática 5° Primaria: Fracciones' },
    { id: 2, name: 'Ciencia y Ambiente 3° Primaria: El Ecosistema' },
    { id: 3, name: 'Comunicación 4° Primaria: Comprensión Lectora' },
  ];
  pendingAssignments.value = 7;
  averageProgress.value = 68;
});

const openFilePicker = () => {
  photoInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
        alert('La imagen es demasiado grande. Por favor, sube una imagen de menos de 2MB.');
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      profile.value.photoUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const saveProfile = async () => {
  const token = userStore.token; // <<-- USAR EL TOKEN DEL STORE DE PINIA
  if (!token) {
    alert('No estás autenticado.');
    userStore.clearAuthData(); // Limpiar por si acaso
    router.push('/teacher-login');
    return;
  }

  if (saveConfirmation.value && saveButton.value) {
    saveButton.value.disabled = true;
    saveConfirmation.value.classList.remove('opacity-0');

    try {
        const updateData = {
            full_name: profile.value.name,
            phone_number: profile.value.phone,
            specialties: profile.value.specialties,
            years_of_experience: profile.value.yearsOfExperience,
        };

        // Usar tu apiClient configurado con interceptores
        const response = await apiClient.put(`${API_BASE_URL}/teacher/me/profile`, updateData); // O .patch

        console.log('Perfil actualizado con éxito:', response.data);
        originalProfile = { ...profile.value };
        isEditingProfile.value = false;
        alert('Perfil actualizado con éxito!');
    } catch (error) {
        console.error('Error al guardar el perfil:', error);
        alert('Hubo un error al actualizar el perfil. Inténtalo de nuevo.');
        // Si el error es 401, probablemente la sesión expiró
        if (error.response && error.response.status === 401) {
            userStore.logout();
            router.push('/teacher-login');
        }
    } finally {
        saveConfirmation.value.classList.add('opacity-0');
        saveButton.value.disabled = false;
    }
  }
};

const cancelEditProfile = () => {
  if (originalProfile) {
    profile.value = { ...originalProfile };
  }
  isEditingProfile.value = false;
};

const changePassword = async () => {
  if (password.value.new !== password.value.confirm) {
    alert('Las nuevas contraseñas no coinciden.');
    return;
  }

  const token = userStore.token; // <<-- USAR EL TOKEN DEL STORE DE PINIA
  if (!token) {
    alert('No estás autenticado.');
    userStore.clearAuthData(); // Limpiar por si acaso
    router.push('/teacher-login');
    return;
  }

  if (passwordConfirmation.value && passwordButton.value) {
    passwordButton.value.disabled = true;
    passwordConfirmation.value.classList.remove('opacity-0');

    try {
        // Usar tu apiClient configurado con interceptores
        const response = await apiClient.post(`${API_BASE_URL}/users/change-password`, {
            current_password: password.value.current,
            new_password: password.value.new
        });

        console.log('Contraseña cambiada con éxito:', response.data);
        alert('Contraseña cambiada con éxito!');
        password.value = { current: '', new: '', confirm: '' };
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error.response ? error.response.data : error.message);
        alert(`Error al cambiar la contraseña: ${error.response && error.response.data && error.response.data.detail ? error.response.data.detail : 'Credenciales inválidas o error interno.'}`);
        // Si el error es 401, probablemente la sesión expiró
        if (error.response && error.response.status === 401) {
            userStore.logout();
            router.push('/teacher-login');
        }
    } finally {
        passwordConfirmation.value.classList.add('opacity-0');
        passwordButton.value.disabled = false;
    }
  }
};
</script>

<style scoped>
/* Animación para el contenido principal al cargar */
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

/* Transiciones para el overlay de la sidebar en móvil */
.bg-opacity-40 {
  transition: opacity 0.3s ease-in-out;
}
</style>