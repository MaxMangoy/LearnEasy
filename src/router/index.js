import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '../views/WelcomeView.vue';
import RoleSelectionView from '../views/RoleSelectionView.vue';
import TeachingLogin from '../views/Teaching/Teaching_login.vue';
import StudentLogin from '../views/Student/Student_login.vue'; // Este es tu Student_login.vue (para padres)
import TeachingRegister from '../views/Teaching/Teaching_register.vue';
import StudentRegister from '../views/Student/Student_register.vue';
import TeachingHome from '../views/Teaching/Teaching_home.vue';
import TeachingProfile from '../views/Teaching/Teaching_profile.vue';
import TeachingReinforcement from '../views/Teaching/Teaching_Reinforcement.vue';
import TeachingSchedule from '../views/Teaching/Teaching_schedule.vue';

// --- Importaciones para las vistas del estudiante (manejadas por el padre/madre) ---
import StudentProfile from '../views/Student/Student_profile.vue';
import StudentReinforcement from '../views/Student/Student_reinforcement.vue';
import StudentEcoProjects from '../views/Student/Student_eco_projects.vue';
import StudentPsychService from '../views/Student/Student_psych_service.vue';
import StudentSubscription from '../views/Student/Student_subscription.vue';

// --- NUEVAS IMPORTACIONES PARA EL PANEL DE ADMINISTRACIÓN ---
import AdminLoginView from '../views/admin/Admin_login.vue';
import AdminView from '../views/admin/Admin.vue';
import AdminTeaching from '../views/admin/Admin_teaching.vue';

// --- NUEVAS IMPORTACIONES PARA DISEÑADOR Y ASESOR PSICOLÓGICO ---
import DesignerLogin from '../views/Designer/Designer_login.vue'; // Ruta para Diseñador Manual
import DesignerRegister from '../views/Designer/Designer_register.vue'; // <--- ADD THIS LINE!
import AdviserLogin from '../views/Adviser/Adviser_login.vue'; // Corregido: Ruta para Asesor Psicológico (Adviser)


// IMPORTACIÓN CLAVE: Importa tu store de usuario
import { useUserStore } from '@/stores/user'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView,
      meta: {
        title: 'Bienvenida | Learn Easy'
      }
    },
    {
      path: '/roles',
      name: 'roles',
      component: RoleSelectionView,
      meta: {
        title: 'Selecciona tu Rol | Learn Easy'
      }
    },
    {
      path: '/teacher-login',
      name: 'teacherLogin',
      component: TeachingLogin,
      meta: {
        title: 'Iniciar Sesión Docente | Learn Easy'
      }
    },
    {
      path: '/student-login',
      name: 'studentLogin',
      component: StudentLogin,
      meta: {
        title: 'Iniciar Sesión Estudiante | Learn Easy' // Título para el login de padres
      }
    },
    // --- RUTAS PARA DISEÑADOR Y ASESOR PSICOLÓGICO AÑADIDAS AQUÍ ---
    {
      path: '/Designer/Designer_login', // Ruta específica para Diseñador Manual
      name: 'designerLogin',
      component: DesignerLogin,
      meta: {
        title: 'Iniciar Sesión Diseñador | Learn Easy'
      }
    },
    {
      path: '/Designer/Designer_register', // <--- ADD THIS ROUTE!
      name: 'DesignerRegister',           // <--- This name must match what your DesignerLogin uses
      component: DesignerRegister,
      meta: {
        title: 'Registro Diseñador | Learn Easy'
      }
    },
    {
      path: '/Adviser/Adviser_login', // Corregido: Ruta específica para Asesor Psicológico
      name: 'adviserLogin', // Nombre de la ruta para el asesor
      component: AdviserLogin,
      meta: {
        title: 'Iniciar Sesión Asesor Psicológico | Learn Easy'
      }
    },
    // --- FIN DE LAS NUEVAS RUTAS ---
    {
      path: '/teaching-register',
      name: 'teachingRegister',
      component: TeachingRegister,
      meta: {
        title: 'Registro Docente | Learn Easy'
      }
    },
    {
      path: '/student-register',
      name: 'studentRegister',
      component: StudentRegister,
      meta: {
        title: 'Registro Estudiante | Learn Easy'
      }
    },
    {
      path: '/teacher-home',
      name: 'teacherHome',
      component: TeachingHome,
      meta: {
        title: 'Inicio Docente | Learn Easy',
        requiresAuth: true,
        requiredRole: 'teacher' 
      }
    },
    {
      path: '/teacher-profile',
      name: 'teacherProfile',
      component: TeachingProfile,
      meta: {
        title: 'Mi Perfil Docente | Learn Easy',
        requiresAuth: true,
        requiredRole: 'teacher' 
      }
    },
    {
      path: '/teacher-reinforcement',
      name: 'teacherReinforcement',
      component: TeachingReinforcement,
      meta: {
        title: 'Reforzamiento | Learn Easy',
        requiresAuth: true,
        requiredRole: 'teacher' 
      }
    },
    {
      path: '/teacher-schedule', 
      name: 'teacherSchedule', 
      component: TeachingSchedule, 
      meta: {
        title: 'Mi Horario | Learn Easy',
        requiresAuth: true,
        requiredRole: 'teacher' 
      }
    },
    // --- Rutas para el Estudiante (Accedidas por el Padre/Madre) ---
    {
      path: '/student-profile',
      name: 'studentProfile',
      component: StudentProfile,
      meta: { 
        title: 'Mi Perfil del Estudiante | Learn Easy', 
        requiresAuth: true,
        requiredRole: 'parent' 
      }
    },
    {
      path: '/student-reinforcement',
      name: 'studentReinforcement',
      component: StudentReinforcement,
      meta: { 
        title: 'Reforzamiento del Estudiante | Learn Easy',
        requiresAuth: true,
        requiredRole: 'parent' 
      }
    },
    {
      path: '/student-eco-projects',
      name: 'studentEcoProjects',
      component: StudentEcoProjects,
      meta: { 
        title: 'Proyectos Ecológicos del Estudiante | Learn Easy',
        requiresAuth: true,
        requiredRole: 'parent' 
      }
    },
    {
      path: '/student-psych-service',
      name: 'studentPsychService',
      component: StudentPsychService,
      meta: { 
        title: 'Servicio Psicológico del Estudiante | Learn Easy',
        requiresAuth: true,
        requiredRole: 'parent' 
      }
    },
    {
      path: '/student-subscription',
      name: 'studentSubscription',
      component: StudentSubscription,
      meta: { 
        title: 'Suscripción del Estudiante | Learn Easy',
        requiresAuth: true,
        requiredRole: 'parent' 
      }
    },
    // --- RUTAS PARA EL ADMINISTRADOR ---
    {
      path: '/admin-login', 
      name: 'AdminLogin',
      component: AdminLoginView,
      meta: { 
        title: 'Iniciar Sesión Admin | Learn Easy'
      } 
    },
    {
      path: '/admin', 
      name: 'AdminPanel', 
      component: AdminView, 
      meta: { 
        title: 'Panel de Administración | Learn Easy',
        requiresAuth: true, 
        requiredRole: 'admin' 
      },
      children: [
        {
          path: 'dashboard', 
          name: 'AdminDashboard',
          component: { template: '<div class="p-4"><h3>Dashboard del Administrador</h3><p>Vista general y estadísticas.</p></div>' } 
        },
        {
          path: 'teachers', 
          name: 'AdminTeachers',
          component: AdminTeaching, 
        },
        {
          path: 'students', 
          name: 'AdminStudents',
          component: { template: '<div class="p-4"><h3>Gestión de Estudiantes</h3><p>Aquí podrás gestionar las cuentas de los estudiantes.</p></div>' }
        },
        {
          path: 'reports', 
          name: 'AdminReports',
          component: { template: '<div class="p-4"><h3>Reportes del Sistema</h3><p>Generación y visualización de reportes.</p></div>' }
        },
        {
          path: '', 
          redirect: { name: 'AdminDashboard' } 
        }
      ]
    },
    // --- FIN RUTAS ADMINISTRADOR ---
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 100 };
    } else if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || 'Learn Easy';

  // --- CAMBIOS CRUCIALES AQUÍ ---
  // 1. Obtén una instancia de tu store de usuario
  const userStore = useUserStore(); 
  
  // 2. Ahora, usa el estado del store directamente para verificar la autenticación y el rol
  const isAuthenticated = userStore.isAuthenticated; 
  const userRole = userStore.user?.role; // Accede al rol a través del objeto 'user' en el store
  // --- FIN DE CAMBIOS ---

  console.log(`[Router Guard] Navegando de ${from.path} a ${to.path}`);
  console.log(`[Router Guard] Ruta requiere autenticación: ${to.matched.some(record => record.meta.requiresAuth)}`);
  console.log(`[Router Guard] isAuthenticated (desde store): ${isAuthenticated}`); 
  console.log(`[Router Guard] userRole (desde store): "${userRole}"`); 
  console.log(`[Router Guard] Rol requerido por la ruta (to.meta.requiredRole): "${to.meta.requiredRole}"`);


  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      console.warn(`[Router Guard] Acceso denegado a ${to.path}: Usuario no autenticado.`);
      alert('Necesitas iniciar sesión para acceder a esta página.');
      
      if (to.path.startsWith('/admin')) { 
          next({ name: 'AdminLogin' }); 
      } else if (to.path.startsWith('/teacher')) {
          next({ name: 'teacherLogin' }); 
      } else if (to.path.startsWith('/student')) { 
          next({ name: 'studentLogin' }); 
      } else if (to.path.startsWith('/Designer')) { 
          next({ name: 'designerLogin' }); 
      } else if (to.path.startsWith('/Adviser')) { 
          next({ name: 'adviserLogin' }); 
      }
       else {
          next({ name: 'roles' }); 
      }
    } else {
      // Usuario autenticado, verificar rol
      if (to.meta.requiredRole && userRole !== to.meta.requiredRole) {
        console.warn(`[Router Guard] Acceso denegado a ${to.path}: Rol "${userRole}" no autorizado. Se requiere "${to.meta.requiredRole}".`);
        alert(`Acceso denegado: Se requiere rol de ${to.meta.requiredRole} para acceder a esta página.`);
        // Redirige al usuario a un lugar seguro
        if (userRole === 'teacher') {
            next({ name: 'teacherHome' }); 
        } else if (userRole === 'parent') {
            next({ name: 'studentProfile' }); 
        } else if (userRole === 'admin') {
            next({ name: 'AdminPanel' }); 
        } else if (userRole === 'designer') { // Redirige Designer a su ruta principal
            next({ name: 'designerLogin' }); // O a una home si tienes
        } else if (userRole === 'adviser') { // Corregido: Redirige Adviser a su ruta principal
            next({ name: 'adviserLogin' }); // O a una home si tienes
        }
         else {
            next({ name: 'welcome' }); 
        }
      } else {
        // Usuario autenticado y con el rol correcto
        console.log(`[Router Guard] Acceso permitido a ${to.path} para rol "${userRole}".`);
        next(); 
      }
    }
  } else {
    // La ruta NO requiere autenticación, permite el acceso
    console.log(`[Router Guard] Acceso permitido a ${to.path}: No requiere autenticación.`);
    next(); 
  }
});

export default router;