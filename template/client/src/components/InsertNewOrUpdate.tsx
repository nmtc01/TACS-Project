import { useEffect, useState } from 'react'
import { CForm, CInput, CLabel, CInputRadio, CButton } from '@coreui/react'
import API from '../api/API';
import { Attribute, InsertOrUpdate } from '../types';

export default function InsertNewOrUpdate(insertOrUpdate: InsertOrUpdate) {
  const [body, setBody] = useState(Object);
  const [attributes, setAttibutes] = useState([]);


  useEffect(() => {
    const getAttributes = (att: any) => {
      if (!att) {
        console.warn("Missing attributes!");
        return;
      }

      // Find references -> getAll(references)

      setAttibutes(att);
    }

    const getValues = (val: any) => {
      setBody(val);
    }

    API.getMethod(getAttributes, 'attributes?resource=' + insertOrUpdate.resource.name, () => { });
    if (insertOrUpdate.type === "update") {
      API.getMethod(getValues, insertOrUpdate.resource.name + '/' + insertOrUpdate._id, () => { })
    }
  }, [insertOrUpdate.resource.name, insertOrUpdate.type, insertOrUpdate._id]);

  const onChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setBody((values: Object) => ({ ...values, [name]: value }))
  }

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (insertOrUpdate.type === "insert") {
      API.postMethod(
        () => { alert("Request sent!") },
        insertOrUpdate.resource.name,
        body,
        () => { })
    } else if (insertOrUpdate.type === "update") {
      setBody({ ...body, _id: insertOrUpdate._id })
      API.putMethod(
        () => { alert("Request sent!") },
        insertOrUpdate.resource.name,
        body,
        () => { })
    }
  }

  return (
    <CForm onSubmit={onSubmit}>
      {attributes.length > 0 && attributes.map((item: Attribute, index) => {
        switch (item.type) {
          case "text":
            return (
              <div key={"field" + index} className="mb-3">
                <CLabel htmlFor={item.name + "Input"}>{item.name}</CLabel>
                <CInput
                  type="text"
                  id={item.name + "Input"}
                  name={item.name}
                  onChange={onChange}
                  required={(item.required !== undefined) ? item.required : true}
                  placeholder={(insertOrUpdate.type === "update") ? body[item.name] : ""}
                />
              </div>
            );
          case "number":
            return (
              <div key={"field" + index} className="mb-3">
                <CLabel htmlFor={item.name + "Input"}>{item.name}</CLabel>
                <CInput
                  type="number"
                  id={item.name + "Input"}
                  name={item.name}
                  onChange={onChange}
                  required={(item.required !== undefined) ? item.required : true}
                  placeholder={(insertOrUpdate.type === "update") ? body[item.name] : ""}
                />
              </div>
            );
          case "date":
            return (
              <div key={"field" + index} className="mb-3">
                <CLabel htmlFor={item.name + "Input"}>{item.name}</CLabel>
                <CInput
                  type="date"
                  id={item.name + "Input"}
                  name={item.name}
                  onChange={onChange}
                  required={(item.required !== undefined) ? item.required : true}
                  placeholder={(insertOrUpdate.type === "update") ? body[item.name] : ""}
                />
              </div>
            );
          case "bool":
            return (
              <div key={"field" + index} className="mb-3">
                <CLabel htmlFor={item.name + "Input"}>{item.name}</CLabel>
                <CInputRadio value="True" label="Yes" name={item.name} onChange={onChange} />
                <CInputRadio value="False" label="No" name={item.name} onChange={onChange} />
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
