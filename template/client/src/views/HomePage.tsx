import {
    Link,
} from 'react-router-dom';

import { CContainer, CCard, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react'

export default function HomePage() {
    let arr = new Array;
    arr.push(1,2,3)
    // TODO list of links to routes <ul><li></li></ul>, routes on file routes.tsx
    return (
        <CContainer>
        <div className="justify-content-center">
            { arr.map( (item) => {
                return (
                    <CCard style={{ width: '60%', position: 'relative' }}>
                    <CCardBody>
                        <CCardTitle>Resource {item}</CCardTitle>
                        <CCardText>
                            Brief description about the resource.?
                        </CCardText>
                    </CCardBody>
                    <CButton style={{ position: 'absolute', top: '1em', right: "1em" }} color="dark" shape="rounded-circle">Add</CButton>
                </CCard>)
            })}
        </div>
        </CContainer>
    );
}
