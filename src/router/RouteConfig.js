import { Landing, SignUp, SignIn, Account, Home, ForgotPassword } from '../pages';

const routes = [
  {
    path: '/',
    exact: true,
    name: 'Landing',
    component: Landing,
    authRequired: false,
    redirect: '/home'
  },
  {
    path: '/signup',
    exact: true,
    name: 'SignUp',
    component: SignUp,
    authRequired: false,
    redirect: '/home'
  },
  {
    path: '/signin',
    exact: true,
    name: 'SignIn',
    component: SignIn,
    authRequired: false,
    redirect: '/home'
  },
  {
    path: '/forgot-password',
    exact: true,
    name: 'ForgotPassword',
    component: ForgotPassword,
    authRequired: false,
    redirect: '/home'
  },
  {
    path: '/home',
    exact: true,
    name: 'Home',
    component: Home,
    authRequired: true,
    redirect: '/'
  },
  {
    path: '/account',
    exact: true,
    name: 'Account',
    component: Account,
    authRequired: true,
    redirect: '/'
  }
];

export default routes;
