import { Landing, SignUp, SignIn, Account, Home } from '../pages';

const routes = [
  {
    path: '/',
    exact: true,
    name: 'Landing',
    component: Landing,
    authRequired: false
  },
  {
    path: '/signup',
    exact: true,
    name: 'SignUp',
    component: SignUp,
    authRequired: false
  },
  {
    path: '/signin',
    exact: true,
    name: 'SignIn',
    component: SignIn,
    authRequired: false
  },
  {
    path: '/home',
    exact: true,
    name: 'Home',
    component: Home,
    authRequired: true
  },
  {
    path: '/account',
    exact: true,
    name: 'Account',
    component: Account,
    authRequired: true
  }
];

export default routes;
