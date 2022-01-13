import { CButton, CCard, CCardHeader, CListGroup, CListGroupItem } from '@coreui/react';
import { useEffect, useState } from 'react';
import API from '../api/API';
import { Resource } from '../types';
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';

export default function GetOnePage(resource: Resource) {
    const history = useHistory();
    const [errors, setErrors] = useState(<></>);
    const [element, setElement] = useState(Object);
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
        API.getMethod(setElement, `${resource.name}/${params.id}`, handleErrors);
        API.getMethod(setHasUpdateBtn, `${resource.name}/hasUpdate`, handleErrors);
        API.getMethod(setHasDeleteBtn, `${resource.name}/hasDelete`, handleErrors);
    }, [resource, params.id]);

    const iterateElement = () => {
        let list = [];
        for (let key in element) {
            if (key === "__v") break;
            list.push(
                <CListGroupItem key={"attribute-" + key}>
                    {key}: {element[key]}
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
