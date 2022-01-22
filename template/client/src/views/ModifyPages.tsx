import { CButton, CCard, CForm, CListGroup, CListGroupItem, CCol, CRow, CLabel, CSpinner } from '@coreui/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../api/API';
import { Operation, MethodType, ConfigFile } from '../types';

export default function ModifyPages() {
  const [pages, modifyPages] = useState<Operation[]>([]);
  const [resources, modifyResources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const setConfig = (config: ConfigFile) => {
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

    API.getMethod(setConfig, 'config', (err: string) => console.error(err));
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
    modifyPages((old: Operation[]) => [...old, { resource: resources.length > 0 ? resources[0] : "", method: "Get-all" }]);
  }

  const deletePage = (index: number) => {
    modifyPages((old: Operation[]) => [...old.slice(0, index), ...old.slice(index + 1)]);
  }

  const ping = () => {
    API.getMethod(() => {
      history.push('/');
      window.location.reload();
    },
      "ping",
      () => {
        setTimeout(() => {
          ping();
        }, 500);
      });
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
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
      (err: string) => { console.error(err); });
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
                        <div>
                          <select
                            name={"resource"}
                            id={"resource"}
                            onChange={(event) => onChange(event, index)}
                          >
                            {resources.map((resource) =>
                              <option key={`option-${resource}`} value={resource} selected={page.resource === resource}>{resource}</option>
                            )}
                          </select>
                        </div>
                      </CCol>
                      <CCol>
                        <CLabel htmlFor={"method"}>Method</CLabel>
                        <div>
                          <select
                            name={"method"}
                            id={"method"}
                            onChange={(event) => onChange(event, index)}
                            defaultValue={page.method}
                          >
                            <option key={`option-Get-all`} value="Get-all">Get-all</option>
                            <option key={`option-Get-one`} value="Get-one">Get-one</option>
                            <option key={`option-Add`} value="Add">Add</option>
                            <option key={`option-Update`} value="Update">Update</option>
                            <option key={`option-Delete`} value="Delete">Delete</option>
                          </select>
                        </div>
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
              <div className="mb-3 mt-3 ml-2">
                <CButton color="secondary" onClick={addPage}>
                  + Add page
                </CButton>
              </div>
              <div className="ml-2 mb-2">
                <CButton className="mr-2" type='submit' color="primary">
                  Save
                </CButton>
                {loading && (
                  <CSpinner color='primary' />
                )}
              </div>
            </>
          )}

        </CForm>
      </CCard>
    </div>
  );
}
