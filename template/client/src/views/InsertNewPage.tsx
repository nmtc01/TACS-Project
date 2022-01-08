import {
  Link,
} from 'react-router-dom';

import { CForm, CInput, CLabel, CInputRadio,  CButton } from '@coreui/react'

export default function InsertNewPage() {
  let arr = new Array();
  arr.push(1)
  // TODO list of links to routes <ul><li></li></ul>, routes on file routes.tsx
  return (
    <CForm style={{width: "60%"}}>
        {
          arr.map( (item) => {
            if (item) 
              return (
                <div className="mb-3">
                  <CLabel htmlFor="exampleInputEmail1">Field name</CLabel>
                  <CInput type="text" id="exampleInputEmail1" />
                </div>
              ) 
            else return (
              <div className="mb-3">
                <CLabel htmlFor="exampleInputEmail1">Field name</CLabel>
                <CInput type="text" id="exampleInputEmail1" />
              </div>
            )
          })
        }
        
      <CButton type="submit" color="dark">
        Add New Item
      </CButton>
    </CForm>
  );
}
