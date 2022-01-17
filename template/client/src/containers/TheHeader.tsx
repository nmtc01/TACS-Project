import {
  CHeader,
  CNavbar,
  CNavbarBrand,
  CButton,
} from '@coreui/react';

const TheHeader = () => {
  return (
    <CHeader style={{position: "fixed"}}>
      <CNavbar color="primary" fixed='top'>
        <CNavbarBrand>
          <CButton onClick={() => window.location.replace("/")} style={{color: "white", fontWeight: 'bold', fontSize: 18}}>
            Low-code for CRUDs
          </CButton>
        </CNavbarBrand>
      </CNavbar>
    </CHeader>
  );
};

export default TheHeader;
