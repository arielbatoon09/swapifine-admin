import { defineStore } from 'pinia';
import useCookies from 'vue-cookies'
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: null,
    }),
    getters: {
        user: (state) => state.authUser,
        isAuthenticated: (state) => {
            console.log('Checking isAuthenticated:', state.authUser !== null);
            return state.authUser !== null;
        },
    },
    actions: {
        async getToken() {
            await axios.get('/sanctum/csrf-cookie');
        },
        async login(email, password) {
            try {
                await this.getToken();
                const response = await axios.post('/api/admin/login', {
                    email: email,
                    password: password,
                });

                if(response.data.status === 'success') {
                    useCookies.set('isLoggedIn', true);
                }
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }
    }
});
