import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '../components/dashboard/Dashboard';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';

Vue.use(Router);

const getToken = localStorage.getItem('token');

const routes = [
  { path: '*', redirect: '/movies' },
  { path: '/users/sign_up', component: SignUp },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/movies',
    component: Dashboard,
    beforeEnter(to, from, next) {
      if (getToken) {
        next();
      } else {
        next('/login');
      }
    },
    props: true,
    children: [
      {
        path: 'user/favorites',
        component: Dashboard,
        name: 'favorites',
        props: true,
      },
      {
        path: 'user/search?',
        component: Dashboard,
        props: true,
        beforeEnter: (to, from, next) => {
          if (!getToken) {
            next('/login');
          }
        },
      },
    ],
  },
];

export default new Router({ mode: 'history', routes });
