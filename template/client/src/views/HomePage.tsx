import { useEffect, useState } from 'react'
import {
    CContainer,
    CCard,
    CCardBody,
    CCardTitle,
    CButton
} from '@coreui/react'
import API from '../api/API';
import { useHistory } from 'react-router-dom';
import { Resource } from '../types';

export default function HomePage(resource: Resource) {
    const history = useHistory();
    const [errors, setErrors] = useState(<></>);
    const [config, setConfig] = useState(Object);
    const [resources, setResources] = useState([]);
    const [hasGetAllsBtn, setHasGetAllsBtn] = useState([]);
    
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
        const getResources = (att: any) => {
            if (!att) {
                console.warn("Missing attributes!");
                return;
            }
            setResources(att);
        }

        API.getMethod(getResources, 'resources', handleErrors);
        API.getMethod(setConfig, 'config', handleErrors);
    }, []);

    useEffect(() => {
        if (!config || !config.website)
            return;
        const pages = config.website.pages;
        if (!pages)
            return;
        
        resources.forEach((item) => {
            for (let i = 0; i < pages.length; i++) {
                if (pages[i].resource === item && pages[i].method === "Get-all") {
                    setHasGetAllsBtn((old) => [...old, true] as never[]);
                    break;
                }
                if (i === pages.length - 1) setHasGetAllsBtn((old) => [...old, false] as never[]);
            }
        })
    }, [resources, config]);

    return (
        <CContainer>
            {errors}
            <h1 style={{ padding: "0.5em" }}>{resource.name}</h1>
            <div className="justify-content-center">
                {resources && resources.map((item, index) => {
                    return (
                        <CCard style={{ width: '70%', position: 'relative' }} key={`Resource ${index}`}>
                            <CCardBody>
                                <CCardTitle>Resource {item}</CCardTitle>
                            </CCardBody>
                            {hasGetAllsBtn[index] && (
                                <CButton
                                    style={{ position: 'absolute', top: '0.75em', right: "1em" }}
                                    color="dark"
                                    shape="rounded-circle"
                                    onClick={() => history.push('/' + item)}
                                >
                                    Show
                                </CButton>
                            )}
                        </CCard>)
                })}
            </div>
        </CContainer>
    );
}
