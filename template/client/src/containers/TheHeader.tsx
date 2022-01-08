import {
  CHeader,
  CNavbar,
} from '@coreui/react';

const TheHeader = () => {
  return (
    <CHeader withSubheader style={{position: "fixed"}}>
      <CNavbar />
    </CHeader>
  );
};

export default TheHeader;
