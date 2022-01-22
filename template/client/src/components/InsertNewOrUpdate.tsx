import React, { ReactElement, useEffect, useState } from 'react'
import { CForm, CInput, CLabel, CButton, CInputRadio } from '@coreui/react'
import API from '../api/API';
import { Attribute, InsertOrUpdate } from '../types';
import { useHistory } from 'react-router-dom';

export default function InsertNewOrUpdate(insertOrUpdate: InsertOrUpdate) {
  const history = useHistory();
  const [errors, setErrors] = useState(<></>);
  const [body, setBody] = useState(Object);
  const [attributes, setAttibutes] = useState<(Attribute & { options: ReactElement[] })[]>([]);

  const handleErrors = (err: any) => {
    setErrors(
      <div className="alert alert-danger">
        <ul className="my-0">
          <li key={err.message}>{err.message}</li>
          <li>Possibly one required field is missing</li>
        </ul>
      </div>
    );
  }

  useEffect(() => {
    const handleOptions = async (data: any[], att: Attribute & { options: ReactElement[] }) => {
      att.options = [];
      data.forEach((option, index) => {
        att.options.push(<option key={`option-${index}`} value={option._id}>{option._id}</option>);
      });
    }

    const getAttributes = async (att: (Attribute & { options: ReactElement[] })[]) => {
      if (!att) {
        console.warn("Missing attributes!");
        return;
      }

      for (let i = 0; i < att.length; i++) {
        if (att[i].references && !att[i].type)
          await API.getAwaitMethod(async (data: boolean) => {
            if (data)
              await API.getAwaitMethod((options: ReactElement[]) => handleOptions(options, att[i]), att[i].references as string, handleErrors);
          }, 'hasGetall?resource=' + att[i].references, handleErrors);
      }
      setAttibutes(att);
    }

    const getValues = (val: any) => {
      setBody(val);
    }

    API.getMethod(getAttributes, 'attributes?resource=' + insertOrUpdate.resource.name, handleErrors);
    if (insertOrUpdate.type === "update") {
      API.getMethod(getValues, insertOrUpdate.resource.name + '/' + insertOrUpdate._id, handleErrors)
    }
  }, [insertOrUpdate.resource.name, insertOrUpdate.type, insertOrUpdate._id]);

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setBody((values: Object) => ({ ...values, [name]: value }));
  }

  const onChangeYesNo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value === "true" ? true : false;
    setBody((values: Object) => ({ ...values, [name]: value }))
  }

  const onSubmit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    if (insertOrUpdate.type === "insert") {
      API.postMethod(
        (newId: string) => { history.push(`/${insertOrUpdate.resource.name}/${newId}`) },
        insertOrUpdate.resource.name,
        body,
        handleErrors)
    } else if (insertOrUpdate.type === "update") {
      setBody({ ...body, _id: insertOrUpdate._id })
      API.putMethod(
        (success: boolean) => { if (success) history.push(`/${insertOrUpdate.resource.name}/${insertOrUpdate._id}`) },
        insertOrUpdate.resource.name,
        body,
        handleErrors)
    }
  }

  return (
    <CForm onSubmit={onSubmit}>
      {errors}
      {attributes.length > 0 && attributes.map((item: Attribute & { options: ReactElement[] }, index) => {
        if (!item.type && item.references && item.options)
          return (
            <div key={"field" + index} className="mb-3">
              <label htmlFor={item.name}>Choose a {item.name}:</label>
              {item.references && (
                <div>
                  <select
                    name={item.name}
                    id={item.name}
                    onChange={onChange}
                    defaultValue={(insertOrUpdate.type === "update") ? body[item.name] : ""}
                  >
                    <option key={`option-none`} value="">None</option>
                    {item.options}
                  </select>
                </div>
              )}
            </div>
          );
        else switch (item.type) {
          case "text":
            return (
              <div key={"field" + index} className="mb-3">
                <CLabel htmlFor={item.name + "Input"}>{item.name}</CLabel>
                <CInput
                  type="text"
                  id={item.name + "Input"}
                  name={item.name}
                  onChange={onChange}
                  required={(item.required !== undefined) ? item.required : false}
                  defaultValue={(insertOrUpdate.type === "update") ? body[item.name] : ""}
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
                  required={(item.required !== undefined) ? item.required : false}
                  defaultValue={(insertOrUpdate.type === "update") ? body[item.name] : ""}
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
                  required={(item.required !== undefined) ? item.required : false}
                  defaultValue={(insertOrUpdate.type === "update") ? body[item.name] : ""}
                />
              </div>
            );
          case "bool":
            return (
              <div key={"field" + index} className="mb-3">
                <CLabel htmlFor={item.name + "Input"}>{item.name}</CLabel>
                <div style={{ marginLeft: "1rem" }}>
                  <CLabel htmlFor={"Yes"}>Yes</CLabel>
                  <CInputRadio
                    id="Yes"
                    value="true"
                    name={item.name}
                    defaultChecked={body[item.name]}
                    onChange={onChangeYesNo}
                    required={(item.required !== undefined) ? item.required : false}
                    style={{ marginLeft: "1rem" }} />
                </div>
                <div style={{ marginLeft: "1rem" }}>
                  <CLabel htmlFor={"No"}>No</CLabel>
                  <CInputRadio
                    id="No"
                    value="false"
                    name={item.name}
                    defaultChecked={!body[item.name]}
                    onChange={onChangeYesNo}
                    style={{ marginLeft: "1rem" }} />
                </div>
              </div>
            );
          default:
            return "";
        }
      })}

      <CButton type="submit" color="dark">
        Submit
      </CButton>
    </CForm>
  );
}
