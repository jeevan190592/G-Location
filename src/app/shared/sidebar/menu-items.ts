import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/product',
    title: 'Home',
    icon: 'icon-home',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/gallery',
    title: 'Gallery',
    icon: ' ',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/profile',
    title: 'Profile',
    icon: 'mdi mdi-dots-horizontal',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/logout',
    title: 'Logout',
    icon: '',
    class: '',
    extralink: false,
    submenu: []
  }
];
