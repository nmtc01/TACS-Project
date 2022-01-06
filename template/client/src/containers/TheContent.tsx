import React, { Suspense } from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  return (
    <main className="c-main" style={{paddingTop: "4.5rem", paddingBottom: "0.6rem"}}>
      <CContainer fluid className="h-100">
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
                  )} />
              )
            })}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
