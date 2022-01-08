import React from 'react';

//TODO
const HomePage = React.lazy(() => import('./views/HomePage'));
const GetAllPage = React.lazy(() => import('./views/GetAllPage'));
const InsertNewPage = React.lazy(() => import('./views/InsertNewPage'));


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
  {
    path: '/insert',
    exact: false,
    name: 'insert',
    component: InsertNewPage,
  },
];

export default routes;
