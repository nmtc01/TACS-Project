import { CButton, CCard, CForm, CListGroup, CListGroupItem, CCol, CRow, CLabel, CInput, CInputRadio } from '@coreui/react';
import { FormEvent, ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../api/API';
import { FullResource } from '../types';

export default function ModifyResources() {
  const [resources, modifyResources] = useState<{ 'resources': FullResource[] }>();

  const history = useHistory();

  useEffect(() => {
    /*const dummyModifiedResources: FullResource[] = [
      {
        "name": "client",
        "attributes": [
          {
            "name": "id",
            "type": "number"
          },
          {
            "name": "name",
            "type": "text",
            "required": true
          },
          {
            "name": "address",
            "type": "text"
          },
          {
            "name": "car",
            "references": "car"
          }
        ]
      },
      {
        "name": "car",
        "attributes": [
          {
            "name": "id",
            "type": "number",
            "required": false
          },
          {
            "name": "license_plate",
            "type": "text",
            "required": true
          },
          {
            "name": "is_new",
            "type": "bool"
          },
          {
            "name": "is_old",
            "type": "bool"
          }
        ]
      },
      {
        "name": "motorcycle",
        "attributes": [
          {
            "name": "cc",
            "type": "number"
          },
          {
            "name": "is_old",
            "type": "bool"
          }
        ]
      }
    ];

    modifyResources({ 'resources': dummyModifiedResources });*/
    const getResources = async (resources: any) => {
      if (!resources) {
        console.warn("Missing attributes!");
        return;
      }
    
      modifyResources(resources);
    }
    API.getMethod(getResources, 'resources', ()=>{});
  }, [history]);

  const onSubmit = () => {
    const ping = () => {
      API.getMethod(() => {
        history.push('/');
      },
        "ping",
        (_: any) => {
          setTimeout(() => {
            ping();
          }, 500);
        });
    }

    /*API.postMethod(
      (res: any) => {
        console.log(res);
        setTimeout(() => {
          ping()
        }, 1000);
      },
      'modify-resources',
      {
        resources: dummyModifiedResources
      },
      (err: any) => { console.error(err); });*/
  }

  const addResource = () => {
    const currentResources = resources?.resources;

    if (!currentResources)
      return
    currentResources.push({ 'name': '', attributes: [] })
    modifyResources({ 'resources': currentResources });

    console.log(resources)
  }

  const addAttribute = (resourceIndex: number) => {
    const currentResources = resources?.resources;

    if (!currentResources)
      return
    currentResources[resourceIndex].attributes.push({
      "name": ""
    })
    modifyResources({ 'resources': currentResources });
    console.log(resources)
  }


  const onChange = (value: any, resourceIndex: number, action: 'updateName' | 'updateField', attributeIndex?: number, field?: string) => {
    const currentResources = resources?.resources;

    if (!currentResources)
      return

    switch (action) {
      case 'updateName': {
        currentResources[resourceIndex].name = value;
        break;
      }
      case 'updateField': {

        if (attributeIndex == undefined)
          return;

        switch (field) {
          case 'name': {
            currentResources[resourceIndex].attributes[attributeIndex]['name'] = value;
            break;
          }
          case 'type': {
            currentResources[resourceIndex].attributes[attributeIndex]['type'] = value;
            break;
          }
          case 'references': {
            currentResources[resourceIndex].attributes[attributeIndex]['references'] = value;
            break;
          }
          case 'required': {
            currentResources[resourceIndex].attributes[attributeIndex]['required'] = value == "true" ? true : false;
            break;
          }
        }
      }
    }

    modifyResources({ 'resources': currentResources });
    console.log(currentResources);
    console.log(resources);
  }

  return (
    <>
      <CCard style={{ padding: "1rem" }}>
        <CForm>
          {resources?.resources && resources.resources.map((resource, resindex) => <CCard key={`resource-${resindex}`} style={{ padding: "1rem", backgroundColor: '#eeeeee' }}>
            <CLabel htmlFor={`resourceName-${resindex}`}>Resource Name</CLabel>
            <CInput
              type="text"
              id={resource.name + "Input"}
              name={`resourceName-${resindex}`}
              defaultValue={resource.name}
              onChange={(event: FormEvent<HTMLInputElement>) => onChange(event.currentTarget.value, resindex, 'updateName')}
            />
            {
              resource.attributes && resource.attributes.map((attribute, attindex) => <CListGroup key={`attributes-${attindex}`} style={{ padding: "1rem" }}>
                <CListGroupItem>
                  <CRow>
                    <CCol>
                      <CLabel htmlFor={attribute.name + "Input"}>Name</CLabel>
                      <CInput
                        type="text"
                        id={attribute.name + "Input"}
                        name={attribute.name}
                        defaultValue={attribute.name}
                        onChange={(event: FormEvent<HTMLInputElement>) => onChange(event.currentTarget.value, resindex, 'updateField', attindex, 'name')}
                        required
                      />
                    </CCol>
                    <CCol>
                      <CLabel htmlFor={"resource"}>Type</CLabel>
                      <div><select
                        name={"resource"}
                        id={"resource"}
                        onChange={(event: any) => onChange(event.currentTarget.value, resindex, 'updateField', attindex, 'name')}
                        defaultValue={attribute.type ? attribute.type : "none"}
                        required
                      >
                        <option key={`type-none-${resindex}-${attindex}`} value={"none"}>--</option>
                        <option key={`type-text-${resindex}-${attindex}`} value={"text"}>text</option>
                        <option key={`type-number-${resindex}-${attindex}`} value={"number"}>number</option>
                        <option key={`type-date-${resindex}-${attindex}`} value={"date"}>date</option>
                        <option key={`type-bool-${resindex}-${attindex}`} value={"bool"}>bool</option>
                      </select></div>
                    </CCol>
                    <CCol>
                      <CLabel htmlFor={"method"}>References</CLabel>
                      <div><select
                        name={"method"}
                        id={"method"}
                        onChange={(event: any) => onChange(event.currentTarget.value, resindex, 'updateField', attindex, 'name')}
                        defaultValue={attribute.references ? attribute.references : "none"}
                      >
                        <option key={`ref-none-${attindex}`} value={"none"}>--</option>

                        {resources.resources.map((reference, refindex) =>
                          <option key={`option-${refindex}`} value={reference.name}>{reference.name}</option>
                        )}
                      </select></div>
                    </CCol>
                    <CCol>
                      <CLabel htmlFor={`required-${attindex}`}>Required</CLabel>
                      <div style={{ marginLeft: "1rem" }}>
                        <CLabel htmlFor={"Yes"}>Yes</CLabel>
                        <CInputRadio
                          id="Yes"
                          value="true"
                          name={`required-${attindex}`}
                          defaultChecked={attribute.required === undefined ? false : attribute.required}
                          onChange={(event: any) => onChange(event.currentTarget.value, resindex, 'updateField', attindex, 'required')}
                          style={{ marginLeft: "1rem" }}
                        />
                      </div>
                      <div style={{ marginLeft: "1rem" }}>
                        <CLabel htmlFor={"No"}>No</CLabel>
                        <CInputRadio
                          id="No"
                          value="false"
                          name={`required-${attindex}`}
                          defaultChecked={attribute.required === undefined ? true : attribute.required}
                          onChange={(event: any) => onChange(event.currentTarget.value, resindex, 'updateField', attindex, 'required')}
                          style={{ marginLeft: "1rem" }}
                        />
                      </div>
                    </CCol>
                  </CRow>
                </CListGroupItem>
              </CListGroup>
              )}
            <CButton
              onClick={() => addAttribute(resindex)}
            >Add Attribute</CButton>
          </CCard>
          )}
          <CButton
            onClick={addResource}
          >
            Add Resource
          </CButton>
        </CForm>
      </CCard>
    </>
  );
}
