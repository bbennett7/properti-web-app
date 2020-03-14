import { Landing, SignUp, SignIn } from '../pages';

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
  }
];

export default routes;
