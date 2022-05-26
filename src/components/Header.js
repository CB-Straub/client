import React, { useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand,
  } from "mdb-react-ui-kit";

  //redux for logout reducer state from authSlice 
  import { setLogout } from '../redux/features/authSlice';


const Header = () => {
    //sets state to change header to hamburger menu for responsivness on small screens
    const [ show, setShow ] = useState(false)

    const { user } = useSelector((state) => ({ ...state.auth }));

    //logout function
    const dispatch = useDispatch()
    const handleLogout = () => {
      dispatch(setLogout());
    };


  return (
   <MDBNavbar fixed='top' expand='lg' style={{backgroundColor:'black'}}>
       <MDBContainer>
            <MDBNavbarBrand  href='/' style={{color: 'whitesmoke', fontWeight: '600', fontSize: '35px'}}>
                Rock the Vote
            </MDBNavbarBrand>
        
            <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
          style={{ color: 'whitesmoke', fontSize: '35px'}}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse show = { show } navbar >
        <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.result?._id && (
              <h5 class='fas fa-user-alt' style={{ marginRight: "30px", marginTop: "35px", marginLeft:'30px',  color: 'beige'}}>
                 {user?.result?.name}
              </h5>
            )}
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-p">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user?.result?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/addTour">
                    <p className="header-p">Add Post</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-p">Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user?.result?._id ? (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-p" onClick={() => handleLogout()}>
                    Logout
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-p">Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header