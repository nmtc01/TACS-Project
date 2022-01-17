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
          <CButton onClick={() => window.location.replace("/")} style={{color: "white"}}>
            TACSonomias
          </CButton>
        </CNavbarBrand>
      </CNavbar>
    </CHeader>
  );
};

export default TheHeader;
