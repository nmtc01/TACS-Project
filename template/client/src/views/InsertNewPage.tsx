import { useEffect, useState } from 'react'
import { CForm, CInput, CLabel, CInputRadio,  CButton } from '@coreui/react'
import API from '../api/API';
import { Resource, Attribute } from '../types';

export default function InsertNewPage(resource: Resource) {
  const [body, setBody] = useState({});
  const [attributes, setAttibutes] = useState([]);

  useEffect(() => {
    const getAttributes = (att: any) => {
      if (!att) {
        console.warn("Missing attributes!");
        return;
      }

      setAttibutes(att);
    }

    API.getMethod(getAttributes, 'attributes?resource=' + resource.name , () => { });
  }, [resource.name]);
  
  const onChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setBody(values => ({ ...values, [name]: value }))
  }

  const onSubmit = (event: any) => {
    event.preventDefault();
    API.postMethod(
      () => {alert("Request sent!")},
      resource.name,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: body
      },
      () => {})
  }

  return (
    <CForm onSubmit={onSubmit}>
      {attributes.length > 0 && attributes.map((item: Attribute, index) => {
        switch (item.type) {
          case "text":
            return (
              <div key={"field" + index} className="mb-3">
                <CLabel htmlFor={item.name + "Input"}>{item.name}</CLabel>
                <CInput type="text" id={item.name + "Input"} name={item.name} onChange={onChange} required={(item.required !== undefined) ? item.required : true}/>
              </div>
            );
          case "number":
            return (
              <div key={"field" + index} className="mb-3">
                <CLabel htmlFor={item.name + "Input"}>{item.name}</CLabel>
                <CInput type="number" id={item.name + "Input"} name={item.name} onChange={onChange} required={(item.required !== undefined) ? item.required : true}/>
              </div>
            );
          case "date":
            return (
              <div key={"field" + index} className="mb-3">
                <CLabel htmlFor={item.name + "Input"}>{item.name}</CLabel>
                <CInput type="date" id={item.name + "Input"} name={item.name} onChange={onChange} required={(item.required !== undefined) ? item.required : true}/>
              </div>
            );
          case "bool":
            return (
              <div key={"field" + index} className="mb-3">
                <CLabel htmlFor={item.name + "Input"}>{item.name}</CLabel>
                <CInput type="number" id={item.name + "Input"} />
                <CInputRadio value="True" label="Yes" name={item.name} onChange={onChange}/>
                <CInputRadio value="False" label="No" name={item.name} onChange={onChange}/>
              </div>
            );
          case "list":
            return (
              <div key={"field" + index} className="mb-3">
                Dunno
              </div>
            );
          default:
            return (
              <div key={"field" + index} className="mb-3">
                Dunno
              </div>
            );
        }
      })}

      <CButton type="submit" color="dark">
        Submit
      </CButton>
    </CForm>
  );
}
