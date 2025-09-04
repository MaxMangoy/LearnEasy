<template>
    <div class="admin-layout">
      <header class="admin-header">
        <h1>Panel de Administración Learn Easy</h1>
        <nav class="admin-nav">
          <router-link to="/admin/dashboard" class="nav-item">Dashboard</router-link>
          <router-link to="/admin/teachers" class="nav-item">Gestionar Docentes</router-link>
          <router-link to="/admin/students" class="nav-item">Gestionar Estudiantes</router-link>
          <button @click="logout" class="logout-button">Cerrar Sesión</button>
        </nav>
      </header>
  
      <div class="admin-content">
        <aside class="admin-sidebar">
          <h2>Secciones</h2>
          <ul>
            <li><router-link to="/admin/dashboard">Dashboard</router-link></li>
            <li><router-link to="/admin/teachers">Docentes</router-link></li>
            <li><router-link to="/admin/students">Estudiantes</router-link></li>
            <li><router-link to="/admin/reports">Reportes</router-link></li>
            </ul>
        </aside>
  
        <main class="admin-main-view">
          <router-view></router-view>
        </main>
      </div>
  
      <footer class="admin-footer">
        <p>&copy; 2025 Learn Easy Admin</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminLayout', // Renombrado a AdminLayout ya que actuará como layout principal
    data() {
      return {
        // Aquí puedes añadir datos específicos de este componente layout
      };
    },
    methods: {
      logout() {
        // Lógica para cerrar sesión del administrador
        console.log('Cerrando sesión de administrador...');
        // Por ejemplo, eliminar el token de autenticación y redirigir a la página de login
        // this.$router.push('/login');
      },
      // Aquí puedes añadir otros métodos globales del layout admin
    },
    mounted() {
      console.log('Componente AdminLayout montado.');
      // Aquí puedes realizar tareas iniciales, como cargar datos del usuario administrador
    },
    // Si necesitas props para este layout
    // props: {
    //   adminInfo: Object
    // }
  };
  </script>
  
  <style scoped>
  /* Estilos básicos para el layout de administración */
  .admin-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: Arial, sans-serif;
    background-color: #f4f7f6;
  }
  
  .admin-header {
    background-color: #4CAF50; /* Un verde vibrante */
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .admin-header h1 {
    margin: 0;
    font-size: 1.8rem;
  }
  
  .admin-nav {
    display: flex;
    gap: 1.5rem;
  }
  
  .admin-nav .nav-item {
    color: white;
    text-decoration: none;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .admin-nav .nav-item:hover,
  .admin-nav .nav-item.router-link-active {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .logout-button {
    background-color: #f44336; /* Rojo para el botón de cerrar sesión */
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .logout-button:hover {
    background-color: #d32f2f;
  }
  
  .admin-content {
    display: flex;
    flex: 1; /* Permite que el contenido ocupe el espacio restante */
  }
  
  .admin-sidebar {
    background-color: #333; /* Gris oscuro para la barra lateral */
    color: white;
    padding: 2rem 1rem;
    width: 250px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }
  
  .admin-sidebar h2 {
    margin-top: 0;
    color: #a1d9a5; /* Un tono más claro para el título */
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .admin-sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .admin-sidebar li {
    margin-bottom: 1rem;
  }
  
  .admin-sidebar a {
    color: white;
    text-decoration: none;
    display: block;
    padding: 0.75rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .admin-sidebar a:hover,
  .admin-sidebar a.router-link-active {
    background-color: #555; /* Gris un poco más claro al pasar el mouse o activo */
  }
  
  .admin-main-view {
    flex: 1; /* Ocupa el resto del espacio horizontal */
    padding: 2rem;
    background-color: #eef3f2; /* Un fondo ligeramente diferente para el contenido principal */
  }
  
  .admin-footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 1rem;
    font-size: 0.9rem;
  }
  </style>