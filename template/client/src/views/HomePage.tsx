import { 
    CContainer,
    CCard,
    CCardBody,
    CCardTitle,
    CCardText,
    CButton 
} from '@coreui/react'
import { useHistory } from 'react-router-dom';

export default function HomePage() {
    const history = useHistory();
    let arr = [];
    arr.push("client")
    // TODO request to api for the resources and map them above
    return (
        <CContainer>
            <div className="justify-content-center">
                {arr && arr.map( (item, index) => {
                    return (
                        <CCard style={{ width: '60%', position: 'relative' }} key={`Resource ${index}`}>
                            <CCardBody>
                                <CCardTitle>Resource {item}</CCardTitle>
                                <CCardText>
                                    Brief description about the resource.?
                                </CCardText>
                            </CCardBody>
                            <CButton 
                                style={{ position: 'absolute', top: '1em', right: "1em" }} 
                                color="dark" 
                                shape="rounded-circle"
                                onClick={() => history.push('/client')}
                            >
                                Show
                            </CButton>
                        </CCard>)
                })}
            </div>
        </CContainer>
    );
}
