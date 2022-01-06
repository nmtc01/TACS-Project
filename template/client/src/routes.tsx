import React from 'react';

//TODO
const HomePage = React.lazy(() => import('./views/HomePage'));
const GetAllPage = React.lazy(() => import('./views/GetAllPage'));

const routes = [
  { 
    path: '/', 
    exact: true,
    name: '',
    component: HomePage,
  },
  { 
    path: '/client', 
    exact: true,
    name: 'client',
    component: GetAllPage,
  },
];

export default routes;
