import { CButton, CCard, CForm, CListGroup, CListGroupItem, CCol, CRow, CLabel, CSpinner } from '@coreui/react';
import { useEffect, useState } from 'react';
import API from '../api/API';
import { Operation, MethodType } from '../types';

export default function ModifyPages() {
  const [pages, modifyPages] = useState<Operation[]>([]);
  const [resources, modifyResources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

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

  const onChange = (event: any, index: number) => {
    const name = event.target.name;
    const value = event.target.value;
    modifyPages((old: Operation[]) => {
      if (name === "resource") {
        const method: MethodType = old[index].method;
        return [...old.slice(0, index), { resource: value, method: method }, ...old.slice(index + 1)]
      }
      else {
        const resource: string = old[index].resource;
        return [...old.slice(0, index), { resource: resource, method: value }, ...old.slice(index + 1)]
      }
    });
  }

  const addPage = () => {
    modifyPages((old: Operation[]) => [...old, {resource: resources.length > 0 ? resources[0] : "", method: "Get-all"}]);
  }

  const deletePage = (index: number) => {
    modifyPages((old: Operation[]) => [...old.slice(0, index), ...old.slice(index + 1)]);
  }
  
  const ping = () => {
    API.getMethod(() => {
      window.location.reload();
    },
      "ping",
      (_: any) => {
        setTimeout(() => {
          ping();
        }, 500);
      });
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);
    API.postMethod(
      () => {
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
        {loading && (
          <CSpinner color='primary' />
        )}
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
                          onChange={(event) => onChange(event, index)}
                          required
                        >
                          {resources.map((resource, index) =>
                            <option key={`option-${index}`} value={resource} selected={page.resource === resource}>{resource}</option>
                          )}
                        </select>
                      </CCol>
                      <CCol>
                        <CLabel htmlFor={"method"}>Method</CLabel>
                        <select
                          name={"method"}
                          id={"method"}
                          onChange={(event) => onChange(event, index)}
                        >
                          <option key={`option-Get-all`} value="Get-all" selected={page.method === "Get-all"}>Get-all</option>
                          <option key={`option-Get-one`} value="Get-one" selected={page.method === "Get-one"}>Get-one</option>
                          <option key={`option-Add`} value="Add" selected={page.method === "Add"}>Add</option>
                          <option key={`option-Update`} value="Update" selected={page.method === "Update"}>Update</option>
                          <option key={`option-Delete`} value="Delete" selected={page.method === "Delete"}>Delete</option>
                        </select>
                      </CCol>
                      <CCol>
                        <CButton onClick={() => deletePage(index)}>
                          Delete
                        </CButton>
                      </CCol>
                    </CRow>
                  </CListGroupItem>
                )}
              </CListGroup>
              <CButton color="primary" style={{borderRadius: "50%"}} onClick={addPage}>
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
