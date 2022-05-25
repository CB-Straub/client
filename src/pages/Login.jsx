import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBIcon,
    MDBSpinner,
  } from "mdb-react-ui-kit";

  //redux
  import { login } from '../redux/features/authSlice'


  const initialState = {
    email: '',
    password: '',
}
const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error } = useSelector((state) => ({...state.auth}))
    
    const [formValue, setFormValue] = useState(initialState)
    const { email, password } = formValue

    //connects toast to the backend error messages(user controller) to display on frontend/client side if login credentials are invalid
    useEffect(() => {
      error && toast.error(error)
    }, [error])
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if (email && password) {
        dispatch(login({ formValue, navigate, toast }));
      }

    }

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({...formValue, [name]: value})

        
 
    }


  return (
    <div style={{margin: "auto", padding:'15px', maxWidth:'450px', alignContent:'center', marginTop:'120px' }}>
        <MDBCard className='mdb-card' alignment="center">
        <MDBIcon fas icon="fas fa-sign-in-alt" className="fa-2x" />
        <h5>Login</h5>
        <MDBCardBody>
          <MDBValidation 
            onSubmit={handleSubmit} 
            noValidate 
            className="row g-3">

            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your password"
              />
            </div>
            <div className="col-12">
              <MDBBtn  style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          {/* <br />
          <GoogleLogin
            clientId="your client id"
            render={(renderProps) => (
              <MDBBtn
                style={{ width: "100%" }}
                color="danger"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className="me-2" fab icon="google" /> Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p className='footer-p'>Don't have an account ? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;

   