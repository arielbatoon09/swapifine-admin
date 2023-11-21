import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import useCookies from 'vue-cookies'

import Dashboard from './views/Dashboard.vue'
import Categories from './views/Categories.vue'
import VerificationRequest from './views/VerificationRequest.vue'
import TransactionHistory from './views/TransactionHistory.vue'
import UserTransaction from './views/UserTransaction.vue'
import UserManagement from './views/UserManagement.vue'
import UserOrder from './views/UserOrder.vue'
import CreditsRevenue from './views/Credits.vue'
import Report from './views/Report.vue'
import AdminManagement from './views/AdminManagement.vue'
import Settings from './views/Settings.vue'
import Forms from './views/Forms.vue'
import Tables from './views/Tables.vue'
import UIElements from './views/UIElements.vue'
import Login from './views/Login.vue'
import Modal from './views/Modal.vue'
import Card from './views/Card.vue'
import Blank from './views/Blank.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiredAuth: false, layout: 'empty' },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiredAuth: false, layout: 'empty' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiredAuth: true },
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    meta: { requiredAuth: true },
  },
  {
    path: '/VerificationRequest',
    name: 'VerificationRequest',
    component: VerificationRequest,
    meta: { requiredAuth: true },
  },
  {
    path: '/TransactionHistory',
    name: 'TransactionHistory',
    component: TransactionHistory,
    meta: { requiredAuth: true },
  },
  {
    path: '/UserTransaction',
    name: 'UserTransaction',
    component: UserTransaction,
    meta: { requiredAuth: true },
  },
  {
    path: '/UserOrder',
    name: 'UserOrder',
    component: UserOrder,
    meta: { requiredAuth: true },
  },
  {
    path: '/CreditsRevenue',
    name: 'CreditsRevenue',
    component: CreditsRevenue,
    meta: { requiredAuth: true },
  },
  {
    path: '/Report',
    name: 'Report',
    component: Report,
    meta: { requiredAuth: true },
  },
  {
    path: '/userMangement',
    name: 'userMangement',
    component: UserManagement,
    meta: { requiredAuth: true },
  },
  {
    path: '/AdminManagement',
    name: 'AdminManagement',
    component: AdminManagement,
    meta: { requiredAuth: true },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiredAuth: true },
  },
  {
    path: '/forms',
    name: 'Forms',
    component: Forms,
    meta: { requiredAuth: true },
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Card,
    meta: { requiredAuth: true },
  },
  {
    path: '/ui-elements',
    name: 'UIElements',
    component: UIElements,
    meta: { requiredAuth: true },
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Modal,
    meta: { requiredAuth: true },
  },
  {
    path: '/blank',
    name: 'Blank',
    component: Blank,
    meta: { requiredAuth: true },
  },
  {
    path: '/(.*)',
    name: '404',
    component: Forms,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = useCookies.get('isLoggedIn') ? true : false;
  const requiresAuth = to.matched.some(record => record.meta.requiredAuth);

  if (to.path === '/') {
    // If user tries to access the root path, redirect to login if not logged in, else redirect to dashboard
    next(isLoggedIn ? { path: '/dashboard' } : { path: '/login' });
  } else if (requiresAuth && !isLoggedIn) {
    // Redirect to login page if authentication is required but user is not logged in
    next({ path: '/login' });
  } else if (to.path === '/login' && isLoggedIn) {
    // If user is logged in and tries to access the login page, redirect to dashboard
    next({ path: '/dashboard' });
  } else {
    // Continue with the navigation
    next();
  }
  console.log('Logged: ', requiresAuth);
});

export default router