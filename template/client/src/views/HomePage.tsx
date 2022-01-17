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
    const [resources, setResources] = useState<{name: string, show: boolean}[]>([]);
    
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
        const getResources = async (att: any) => {
            if (!att) {
                console.warn("Missing attributes!");
                return;
            }
            let res: any = [];
            for (let i = 0; i < att.length; i++) {
                await API.getAwaitMethod((data: boolean) => {
                    res.push({name: att[i], show: data});
                }, 'hasGetall?resource=' + att[i], handleErrors);
            };
            setResources(res);
        }

        API.getMethod(getResources, 'resources', handleErrors);
    }, []);

    return (
        <CContainer>
            {errors}
            <h1 style={{ padding: "0.5em" }}>{resource.name}</h1>
            <div className="justify-content-center">
                {resources && resources.map((item, index) => {
                    return (
                        <CCard style={{ width: '70%', position: 'relative' }} key={`Resource ${index}`}>
                            <CCardBody>
                                <CCardTitle>Resource {item.name}</CCardTitle>
                            </CCardBody>
                            {item.show && (
                                <CButton
                                    style={{ position: 'absolute', top: '0.75em', right: "1em" }}
                                    color="dark"
                                    shape="rounded-circle"
                                    onClick={() => history.push('/' + item.name)}
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
