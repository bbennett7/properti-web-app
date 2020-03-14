import { Landing } from '../pages';

const routes = [
  {
    path: '/',
    exact: true,
    name: 'Landing',
    component: Landing,
    authRequired: false
  }
];

export default routes;
