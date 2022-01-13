import { useEffect, useState } from 'react'
import { CForm, CInput, CLabel, CButton, CInputCheckbox } from '@coreui/react'
import API from '../api/API';
import { Attribute, InsertOrUpdate } from '../types';
import { useHistory } from 'react-router-dom';

export default function InsertNewOrUpdate(insertOrUpdate: InsertOrUpdate) {
  const history = useHistory();
  const [body, setBody] = useState(Object);
  const [attributes, setAttibutes] = useState<(Attribute & { options: any[] })[]>([]);

  useEffect(() => {
    const handleOptions = async (data: any[], att: any) => {
      att.options = [];
      data.forEach((option, index) => {
        att.options.push(<option key={`option-${index}`} value={option._id}>{option._id}</option>);
      })
    }

    const getAttributes = (att: any) => {
      if (!att) {
        console.warn("Missing attributes!");
        return;
      }
      for (let i = 0; i < att.length; i++) {
        if (att[i].references && !att[i].type)
          API.getAwaitMethod((data: any) => handleOptions(data, att[i]), att[i].references, () => {});
      }
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

  const onCheckboxChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value === "on" ? true : false;
    setBody((values: Object) => ({ ...values, [name]: value }))
  }

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (insertOrUpdate.type === "insert") {
      API.postMethod(
        (newId: string) => { history.push(`/${insertOrUpdate.resource.name}/${newId}`) },
        insertOrUpdate.resource.name,
        body,
        () => { })
    } else if (insertOrUpdate.type === "update") {
      setBody({ ...body, _id: insertOrUpdate._id })
      API.putMethod(
        (success: boolean) => { if(success) history.push(`/${insertOrUpdate.resource.name}/${insertOrUpdate._id}`) },
        insertOrUpdate.resource.name,
        body,
        () => { })
    }
  }
console.log(attributes);
  return (
    <CForm onSubmit={onSubmit}>
      {attributes.length > 0 && attributes.map((item: Attribute & { options: any[] }, index) => {
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
                <CInputCheckbox name={item.name} onChange={onCheckboxChange} />
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
                    <label htmlFor={item.references}>Choose a {item.references}:</label>
                    {item.references && (
                      <select name={item.references} id={item.references}>
                        {item.options}
                      </select>
                    )}
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
