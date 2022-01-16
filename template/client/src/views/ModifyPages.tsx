import { CButton, CCard, CForm, CListGroup, CListGroupItem, CCol, CRow, CLabel } from '@coreui/react';
import { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../api/API';
import { Operation, MethodType } from '../types';

export default function ModifyPages() {
  const history = useHistory();
  const [pages, modifyPages] = useState<Operation[]>([]);
  const [resources, modifyResources] = useState<string[]>([]);
  const [inputs, setInputs] = useState<ReactElement<any, any>[]>([]);

  useEffect(() => {
    const setConfig = (config: any) => {
      const initPages: Operation[] = config.website.pages;
      if (!initPages) {
        console.warn("Missing pages key on website!");
        return;
      }
      const initResources = config.resources;
      if (!initResources) {
        console.warn("Missing resources key!");
        return;
      }
      const resString: string[] = [];
      for (let i = 0; i < initResources.length; i++) {
        resString.push(initResources[i].name);
      }

      modifyPages(initPages);
      modifyResources(resString);
    }

    API.getMethod(setConfig, 'config', (err: any) => console.error(err));
  }, []);

  const onChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    /*modifyPages((old: Operation[]) => {
      if (name === "resource") {
        const method: MethodType = old[old.length - 1].method;
        return [...old.slice(0, -1), { resource: value, method: method }]
      }
      else {
        const resource: string = old[old.length - 1].resource;
        return [...old.slice(0, -1), { resource: resource, method: value }]
      }
    });*/
  }

  const addInput = () => {
    setInputs((oldInputs) => [...oldInputs,
      <CListGroupItem key={`page-inputs-${oldInputs.length}`}>
        <CRow>
          <CCol>
            <CLabel htmlFor={"resource"}>Resource</CLabel>
            <select
              name={"resource"}
              id={"resource"}
              onChange={onChange}
              defaultValue=""
              required
            >
              <option key={`option-none`} value="">None</option>
              {resources.map((resource, index) =>
                <option key={`option-${index}`} value={resource}>{resource}</option>
              )}
            </select>
          </CCol>
          <CCol>
            <CLabel htmlFor={"method"}>Method</CLabel>
            <select
              name={"method"}
              id={"method"}
              onChange={onChange}
              defaultValue="Get-all"
            >
              <option key={`option-Get-all`} value="Get-all">Get-all</option>
              <option key={`option-Get-one`} value="Get-one">Get-one</option>
              <option key={`option-Add`} value="Add">Add</option>
              <option key={`option-Update`} value="Update">Update</option>
              <option key={`option-Delete`} value="Delete">Delete</option>
            </select>
          </CCol>
        </CRow>
      </CListGroupItem>
    ]);
  }
  
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

  const handleSubmit = (event: any) => {
    API.postMethod(
      (res: any) => {
        console.log(res);
        setTimeout(() => {
          ping()
        }, 1000);
      },
      'modify-pages',
      {
        pages: pages
      },
      (err: any) => { console.error(err); });
  }

  return (
    <div>
      <CCard>
        <CForm onSubmit={handleSubmit}>
          {pages && resources && (
            <>
              <CListGroup>
                {pages.map((page, index) =>
                  <CListGroupItem key={`page-${index}`}>
                    <CRow>
                      <CCol>
                        <CLabel htmlFor={"resource"}>Resource</CLabel>
                        <select
                          name={"resource"}
                          id={"resource"}
                          onChange={onChange}
                          defaultValue={page.resource}
                          required
                        >
                          {resources.map((resource, index) =>
                            <option key={`option-${index}`} value={resource}>{resource}</option>
                          )}
                        </select>
                      </CCol>
                      <CCol>
                        <CLabel htmlFor={"method"}>Method</CLabel>
                        <select
                          name={"method"}
                          id={"method"}
                          onChange={onChange}
                          defaultValue={page.method}
                        >
                          <option key={`option-Get-all`} value="Get-all">Get-all</option>
                          <option key={`option-Get-one`} value="Get-one">Get-one</option>
                          <option key={`option-Add`} value="Add">Add</option>
                          <option key={`option-Update`} value="Update">Update</option>
                          <option key={`option-Delete`} value="Delete">Delete</option>
                        </select>
                      </CCol>
                    </CRow>
                  </CListGroupItem>
                )}
              </CListGroup>
              <CButton color="primary" style={{borderRadius: "50%"}} onClick={addInput}>
                +
              </CButton>
              <CButton type='submit'>
                Save
              </CButton>
            </>
          )}
        </CForm>
      </CCard>
    </div>
  );
}
