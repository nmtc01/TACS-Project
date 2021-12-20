import {
    CForm,
    CFormLabel,
    CFormInput
} from '@coreui/react'

import 'bootstrap/dist/css/bootstrap.min.css'

export default function Form() {
    return (
        <CForm style={{width: '35%'}}>
            <div className="mb-3 h6">
                <CFormLabel htmlFor="nameFC">Name</CFormLabel>
                <CFormInput type="text" id="nameFC" placeholder="John Smith" />
            </div>
            <div className="mb-3 h6">
                <CFormLabel htmlFor="emailFC">Email address</CFormLabel>
                <CFormInput type="email" id="emailFC" placeholder="name@example.com" />
            </div>
        </CForm>
    );
}
