import { CButton, CCard, CCardHeader, CListGroup, CListGroupItem } from '@coreui/react';
import { useEffect, useState } from 'react';
import API from '../api/API';
import { Resource } from '../types';
import { useParams } from "react-router";

export default function GetOnePage(resource: Resource) {
    const [errors, setErrors] = useState(<></>);
    const [element, setElement] = useState(Object);
    const params: any = useParams();

    useEffect(() => {
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

        API.getMethod(setElement, `${resource.name}/${params.id}`, handleErrors);
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

    return (
        <CCard>
            <CCardHeader>
                {resource.name}
            </CCardHeader>
            {errors}
            <CListGroup>
                {iterateElement()}
            </CListGroup>
            <CButton>
                Edit
            </CButton>
        </CCard>
    );
}
