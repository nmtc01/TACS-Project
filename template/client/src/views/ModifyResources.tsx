import { CButton, CCard, CForm, CListGroup, CListGroupItem, CCol, CRow, CLabel, CInput, CInputRadio, CSpinner } from '@coreui/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../api/API';
import { FullResource, ConfigFile, AttributeType } from '../types';

export default function ModifyResources() {
  const [resources, modifyResources] = useState<{ 'resources': FullResource[] }>();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const getConfig = async (config: ConfigFile) => {
      if (!config.resources) {
        console.warn("Missing attributes!");
        return;
      }

      modifyResources({ 'resources': config.resources });
    }
    API.getMethod(getConfig, 'config', () => { });
  }, [history]);

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    const ping = () => {
      API.getMethod(() => {
        history.push('/');
      },
        "ping",
        () => {
          setTimeout(() => {
            ping();
          }, 500);
        });
    }

    resources?.resources.map((item: FullResource) => {
      item.attributes.map((att) => {
        if (att.editable)
          delete att.editable;
        return att;
      });
      if (item.editable)
          delete item.editable;
      return item;
    });
    API.postMethod(
      (res: string) => {
        console.log(res);
        setTimeout(() => {
          ping()
        }, 1000);
      },
      'modify-resources',
      {
        resources: resources?.resources
      },
      (err: string) => { console.error(err); setLoading(false); });
  }

  const addResource = () => {
    const currentResources = resources?.resources;

    if (!currentResources)
      return;
    currentResources.push({ 'name': '', attributes: [], editable: true })
    modifyResources({ 'resources': currentResources });
  }

  const addAttribute = (resourceIndex: number) => {
    const currentResources = resources?.resources;

    if (!currentResources)
      return
    currentResources[resourceIndex].attributes.push({
      "name": "",
      editable: true
    })
    modifyResources({ 'resources': currentResources });
  }

  const onChange = (value: string, resourceIndex: number, action: 'updateName' | 'updateField', attributeIndex?: number, field?: string) => {
    const currentResources = resources?.resources;

    if (!currentResources)
      return

    switch (action) {
      case 'updateName': {
        currentResources[resourceIndex].name = value;
        break;
      }
      case 'updateField': {

        if (attributeIndex === undefined)
          return;

        switch (field) {
          case 'name': {
            currentResources[resourceIndex].attributes[attributeIndex]['name'] = value;
            break;
          }
          case 'type': {
            currentResources[resourceIndex].attributes[attributeIndex]['type'] = value as AttributeType;
            break;
          }
          case 'references': {
            currentResources[resourceIndex].attributes[attributeIndex]['references'] = value;
            break;
          }
          case 'required': {
            currentResources[resourceIndex].attributes[attributeIndex]['required'] = value === "true" ? true : false;
            break;
          }
        }
      }
    }

    modifyResources({ 'resources': currentResources });
  }

  return (
    <>
      <CCard style={{ padding: "1rem" }}>
        <CForm onSubmit={onSubmit}>
          {resources?.resources && resources.resources.map((resource, resindex) => <CCard key={`resource-${resindex}`} style={{ padding: "1rem", backgroundColor: '#eeeeee' }}>
            <CLabel htmlFor={`resourceName-${resindex}`}>Resource Name</CLabel>
            <CInput
              type="text"
              id={resource.name + "Input"}
              name={`resourceName-${resindex}`}
              defaultValue={resource.name}
              onChange={(event: FormEvent<HTMLInputElement>) => onChange(event.currentTarget.value, resindex, 'updateName')}
              disabled={!resource.editable}
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
                        disabled={!attribute.editable}
                      />
                    </CCol>
                    <CCol>
                      <CLabel htmlFor={"resource"}>Type</CLabel>
                      <div><select
                        name={"resource"}
                        id={"resource"}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onChange(event.currentTarget.value, resindex, 'updateField', attindex, 'type')}
                        defaultValue={attribute.type ? attribute.type : "none"}
                        required
                        disabled={!attribute.editable}
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
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onChange(event.currentTarget.value, resindex, 'updateField', attindex, 'references')}
                        defaultValue={attribute.references ? attribute.references : "none"}
                        disabled={!attribute.editable}
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
                          name={`required-${resindex}-${attindex}`}
                          defaultChecked={attribute.required === undefined ? false : attribute.required}
                          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onChange(event.target.value, resindex, 'updateField', attindex, 'required')}
                          style={{ marginLeft: "1rem" }}
                          disabled={!attribute.editable}
                        />
                      </div>
                      <div style={{ marginLeft: "1rem" }}>
                        <CLabel htmlFor={"No"}>No</CLabel>
                        <CInputRadio
                          id="No"
                          value="false"
                          name={`required-${resindex}-${attindex}`}
                          defaultChecked={attribute.required === undefined ? true : !attribute.required}
                          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onChange(event.target.value, resindex, 'updateField', attindex, 'required')}
                          style={{ marginLeft: "1rem" }}
                          disabled={!attribute.editable}
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
          <div className="pb-3">
            <CButton
              onClick={addResource}
              color="secondary"
            >
              Add Resource
            </CButton>
          </div>
          <div>
            <CButton className="mr-2" type='submit' color="primary">
              Save
            </CButton>
            {loading && (
              <CSpinner color='primary' />
            )}
          </div>
        </CForm>
      </CCard>
    </>
  );
}
