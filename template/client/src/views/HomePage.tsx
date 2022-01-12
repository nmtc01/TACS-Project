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

export default function HomePage() {
    const history = useHistory();
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const getResources = (att: any) => {
            if (!att) {
                console.warn("Missing attributes!");
                return;
            }

            setResources(att);
        }

        API.getMethod(getResources, 'resources', () => { });
    }, [history]);

    return (
        <CContainer>
            <h1 style={{ padding: "0.5em" }}>Resources</h1>
            <div className="justify-content-center">
                {resources && resources.map((item, index) => {
                    return (
                        <CCard style={{ width: '70%', position: 'relative' }} key={`Resource ${index}`}>
                            <CCardBody>
                                <CCardTitle>Resource {item}</CCardTitle>
                            </CCardBody>
                            <CButton
                                style={{ position: 'absolute', top: '0.75em', right: "1em" }}
                                color="dark"
                                shape="rounded-circle"
                                onClick={() => history.push('/' + item)}
                            >
                                Show
                            </CButton>
                        </CCard>)
                })}
            </div>
        </CContainer>
    );
}
