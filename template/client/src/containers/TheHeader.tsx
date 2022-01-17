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
        <CButton
            color="primary"
            style={{marginLeft: "auto"}}
            onClick={() => window.location.replace('/modify-pages')}
        >
            Modify Pages
        </CButton>
        <CButton
            color="primary"
            onClick={() => window.location.replace('/modify-resources')}
        >
            Modify Resources
        </CButton>
      </CNavbar>
    </CHeader>
  );
};

export default TheHeader;
