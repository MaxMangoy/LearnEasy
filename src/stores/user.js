// src/stores/user.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de tener 'jwt-decode' instalado (npm install jwt-decode)

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://127.0.0.1:8000';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null, 
    user: null, 
    isAuthenticated: false,
  }),
  actions: {
    async login(credentials) {
      const { email, password, role } = credentials; 

      try {
        let endpoint = '';
        if (role === 'teacher') {
          endpoint = 'login/teacher';
        } else if (role === 'parent') {
          endpoint = 'login/parent';
        } else if (role === 'admin') { 
          endpoint = 'login/admin';
        } else {
          throw new Error('Rol de usuario no válido para inicio de sesión. Roles permitidos: teacher, parent, admin.');
        }

        const response = await axios.post(`${API_BASE_URL}/${endpoint}`, { email, password });
        
        this.token = response.data.access_token; 
        this.user = {
          id: response.data.user_id,
          email: email, 
          full_name: response.data.full_name,
          role: response.data.role, 
        };
        this.isAuthenticated = true;

        localStorage.setItem('accessToken', this.token);
        localStorage.setItem('userRole', this.user.role);
        localStorage.setItem('userId', this.user.id);
        localStorage.setItem('userFullName', this.user.full_name);

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        return response.data; 
      } catch (error) {
        this.clearAuthData();
        console.error('Error en la acción de login del store:', error);
        throw error; 
      }
    },
    
    logout() {
      this.clearAuthData();
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      localStorage.removeItem('userFullName');
    },

    clearAuthData() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
    },

    loadUserFromLocalStorage() {
      const storedToken = localStorage.getItem('accessToken');
      const storedUserRole = localStorage.getItem('userRole');
      const storedUserId = localStorage.getItem('userId');
      const storedUserFullName = localStorage.getItem('userFullName');

      if (storedToken && storedUserRole && storedUserId && storedUserFullName) {
        try {
          this.token = storedToken;
          this.isAuthenticated = true;
          this.user = {
            id: storedUserId,
            email: jwtDecode(storedToken).sub, 
            full_name: storedUserFullName,
            role: storedUserRole,
          };
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        } catch (error) {
          console.error('Error al decodificar token o cargar usuario de localStorage:', error);
          this.clearAuthData(); 
        }
      } else {
        this.clearAuthData(); 
      }
    }
  },
  
  persist: {
    enabled: true, 
    strategies: [
      {
        key: 'user_auth', 
        storage: localStorage, 
        paths: ['token', 'user', 'isAuthenticated'] 
      },
    ],
  },
});