import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
 

//components
import Spinner from '../components/Spinner'

//redux
import { deletePost, getPostsByUser } from '../redux/features/postSlice'

//mdb components
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardImage, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCardGroup } from 'mdb-react-ui-kit'

const Dashboard = () => {
  
    const dispatch = useDispatch();
    
    const { userPosts, loading } = useSelector((state) => ({ ...state.post }));
    const { user } = useSelector((state) => ({ ...state.auth }));
    const userId = user?.result?._id
  

    useEffect(() => {
        if(userId) {
          dispatch(getPostsByUser(userId));
        }
      }, [userId, dispatch]);


      const excerpt = (str) => {
        if (str.length > 30) {
          str = str.substring(0, 30) + " ...";
        }
        return str;
      };
    
      if (loading) {
        return <Spinner />;
      }
    
      const handleDelete = ( id ) => {
        if(window.confirm('Are you sure you want to delete this post?')) {
            dispatch(deletePost({ id, toast }))
        }
      }
    
      return (
        <div
          style={{
            margin: "auto",
            padding: "200px",
            maxWidth: "900px",
            alignContent: "center",
          }}
        >
          {userPosts.length === 0 && (
            <h4>{user?.result?.name}</h4> 
          )}
    
          {userPosts.length > 0 && (
            <>
              <h3 className="text-center">Welcome {user?.result?.name}!</h3>
              <hr style={{ maxWidth: "570px" }} />
            </>
          )}
    
          {userPosts &&
            userPosts.map((item) => (
              <MDBCardGroup key={item._id}>
                <MDBCard style={{ maxWidth: "600px" }} className="mt-3">
                  <MDBRow className="g-0">
                    <MDBCol md="4">
                      <MDBCardImage
                        className="rounded"
                        src={item.imageFile}
                        alt={item.title}
                        fluid
                      />
                    </MDBCol>
                    <MDBCol md="9">
                      <MDBCardBody>
                        <MDBCardTitle className="text-start">
                          {item.title}
                        </MDBCardTitle>
                        <MDBCardText className="text-start">
                          <small className="text-start">
                            {excerpt(item.description)}
                          </small>
                        </MDBCardText>
                        <div
                          style={{
                            marginLeft: "5px",
                            float: "right",
                            marginTop: "-70px",
                          }}
                        >
                          <MDBBtn className="mt-4" tag="a" color="none">
                            <MDBIcon
                              fas
                              icon="trash"
                              style={{ color: "#dd4b39" }}
                              size="lg"
                              onClick={() => handleDelete(item._id)}
                            />
                          </MDBBtn>
                          <Link to={`/editPost/${item._id}`}>
                            <MDBIcon
                              fas
                              icon="edit"
                              style={{ color: "#55acee", marginLeft: "10px" }}
                              size="lg"
                            />
                          </Link>
                        </div>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </MDBCardGroup>
            ))}
        </div>
      );
    };
    
    export default Dashboard;
    
       
    