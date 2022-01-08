import React, { Suspense, useEffect, useState } from 'react'
import {
  Route,
  Switch,
  HashRouter,
  Redirect,
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

import API from '../api/API';
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const HomePage = React.lazy(() => import('../views/HomePage'));
const GetAllPage = React.lazy(() => import('../views/GetAllPage'));

function addRoutes(routes: any) {
  routes.forEach((route: any) => {
    switch (route.method) {
      case "Get-delete-one":
        break;
      case "Get-one":
        break;
      case "Get-all":
        routes.push({
          path: `/${route.resource}`, 
          exact: true,
          name: route.resource,
          component: GetAllPage,
        });
        break;
      case "Add":
        break;
      case "Update":
        break;
    }
  });
  return routes;
}

const TheContent = () => {
  const [routes, setRoutes] = useState([
    { 
      path: '/', 
      exact: true,
      name: '',
      component: HomePage,
    },
  ]);

  useEffect(() => {
    const appendRoutes = (config: any) => {
      const pages = config.website.pages;
      if (!pages) {
        console.warn("Missing pages key on website!");
        return;
      }
      
      setRoutes((oldRoutes) => [
        ...oldRoutes,
        ...addRoutes(pages)
      ]);
    }

    API.getMethod(appendRoutes, 'config', () => {});
  }, []);
  
  return (
    <main className="c-main" style={{paddingTop: "4.5rem", paddingBottom: "0.6rem"}}>
      <CContainer fluid className="h-100">
        <HashRouter>
          <Suspense fallback={loading}>
            <Switch>
              {routes.map((route: any, idx: any) => {
                return route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    render={(props: any) => (
                      <CFade className="h-100">
                        <route.component name={route.name} {...props} />
                      </CFade>
                    )} 
                  />
                )
              })}
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </HashRouter>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
