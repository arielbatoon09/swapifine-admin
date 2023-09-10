import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from './views/Dashboard.vue'
import Categories from './views/Categories.vue'
import VerificationRequest from './views/VerificationRequest.vue'
import TransactionHistory from './views/TransactionHistory.vue'
import UserTransaction from './views/UserTransaction.vue'
import UserManagement from './views/UserManagement.vue'
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
    meta: { layout: 'empty' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
  },
  {
    path: '/VerificationRequest',
    name: 'VerificationRequest',
    component: VerificationRequest,
  },
  {
    path: '/TransactionHistory',
    name: 'TransactionHistory',
    component: TransactionHistory,
  },
  {
    path: '/UserTransaction',
    name: 'UserTransaction',
    component: UserTransaction,
  },
  {
    path: '/userMangement',
    name: 'userMangement',
    component: UserManagement,
  },
  {
    path: '/AdminManagement',
    name: 'AdminManagement',
    component: AdminManagement,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/forms',
    name: 'Forms',
    component: Forms,
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Card,
  },
  {
    path: '/ui-elements',
    name: 'UIElements',
    component: UIElements,
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Modal,
  },
  {
    path: '/blank',
    name: 'Blank',
    component: Blank,
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
})

export default router