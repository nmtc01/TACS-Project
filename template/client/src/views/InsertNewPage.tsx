import { useEffect, useState } from 'react'
import { CForm, CInput, CLabel, CInputRadio,  CButton } from '@coreui/react'
import API from '../api/API';
import { Resource, Attribute } from '../types';

export default function InsertNewPage(resource: Resource) {
  const [attributes, setAttibutes] = useState([]);

  useEffect(() => {
    const getAttributes = (attributes: any) => {
      if (!attributes) {
        console.warn("Missing attributes!");
        return;
      }

      setAttibutes(attributes);
    }

    API.getMethod(getAttributes, resource.name + '/attributes', () => { });
  }, [resource.name]);
  
  return (
    <CForm style={{width: "60%"}}>
      {attributes.length > 0 && attributes.map((item: Attribute) => {
        switch (item.type) {
          case "text":
            return (
              <div className="mb-3">
                <CLabel htmlFor="exampleInputEmail1">{item.name}</CLabel>
                <CInput type="text" id="exampleInputEmail1" />
              </div>
            );
          case "number":
            return (
              <div className="mb-3">
                <CLabel htmlFor="exampleInputEmail1">{item.name}</CLabel>
                <CInput type="number" id="exampleInputEmail1" />
              </div>
            );
          case "date": 
            return (
              <div className="mb-3">
                <CLabel htmlFor="exampleInputEmail1">{item.name}</CLabel>
                <CInput type="date" id="exampleInputEmail1" />
              </div>
            );
          case "bool":
            return ( 
              <div className="mb-3">
                <CLabel htmlFor="exampleInputEmail1">{item.name}</CLabel>
                <CInput type="number" id="exampleInputEmail1" />
                <CInputRadio value="True" label="Yes"/>
                <CInputRadio value="False" label="No"/>
              </div> 
            );
          case "list":
            return (
              <div className="mb-3">
                Dunno
              </div>
            );
          default:
            return "";
        }
      })}
        
      <CButton type="submit" color="dark">
        Add New Item
      </CButton>
    </CForm>
  );
}
