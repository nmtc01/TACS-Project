import { CButton, CCard, CCardHeader, CLink, CListGroup, CListGroupItem } from '@coreui/react';
import { useEffect, useState } from 'react';
import API from '../api/API';
import { Resource } from '../types';
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';

export default function GetOnePage(resource: Resource) {
    const history = useHistory();
    const [errors, setErrors] = useState(<></>);
    const [element, setElement] = useState(Object);
    const [elementTypes, setElementTypes] = useState(Object);
    const [hasDeleteBtn, setHasDeleteBtn] = useState(false);
    const [hasUpdateBtn, setHasUpdateBtn] = useState(false);
    const params: any = useParams();

    const handleErrors = (err: any) => {
        setErrors(
            <div className="alert alert-danger">
                <ul className="my-0">
                {err.response.data.errors.map((err: any) => (
                    <li key={err.message}>{err.message}</li>
                ))}
                </ul>
            </div>
        );
    }

    useEffect(() => {
        const getAttributes = async (att: any) => {
            const types: any = {};
            if (!att) {
              console.warn("Missing attributes!");
              return;
            }
            
            for (let i = 0; i < att.length; i++) {
                types[att[i].name] = att[i].type ? {"type": att[i].type, "references": false} : {"type": att[i].references, "references": true};
            }
            setElementTypes(types);
        }

        API.getMethod(setElement, `${resource.name}/${params.id}`, handleErrors);
        API.getMethod(getAttributes, 'attributes?resource=' + resource.name, handleErrors);
        API.getMethod(setHasUpdateBtn, 'hasUpdate?resource=' + resource.name, handleErrors);
        API.getMethod(setHasDeleteBtn, 'hasDelete?resource=' + resource.name, handleErrors);
    }, [resource, params.id]);

    const iterateElement = () => {
        console.log(elementTypes)
        let list = [];
        for (let key in element) {
            if (key === "__v") continue;
            
            let elem;
            if (element[key] === true) elem = "true";
            else if (element[key] === false) elem = "false";
            else if (elementTypes[key] && elementTypes[key].type === 'date') elem = new Date(element[key]).toLocaleDateString("en-US")
            else elem = element[key];

            list.push(
                <CListGroupItem key={"attribute-" + key}>
                    {key}: {elementTypes[key] && elementTypes[key]["references"] ? <CLink to={`/${elementTypes[key]["type"]}/${elem}`}>{elem}</CLink> : elem}
                </CListGroupItem>
            );
        }
        return list;
    }

    const handleDeleteElement = () => {
        if (hasDeleteBtn) {
            API.deleteMethod(`${resource.name}/${params.id}`, handleErrors);
            history.push(`/${resource.name}`);
        }
    }
    
    return (
        <CCard>
            <CCardHeader>
                {resource.name}
            </CCardHeader>
            {errors}
            <CListGroup>
                {iterateElement()}
            </CListGroup>
            {hasUpdateBtn && (
                <CButton onClick={() => history.push(`/${resource.name}/${params.id}/update`)} color='primary'>
                    Edit
                </CButton>
            )}
            {hasDeleteBtn && (
                <CButton onClick={handleDeleteElement} color='secondary'>
                    Delete
                </CButton>
            )}
        </CCard>
    );
}
