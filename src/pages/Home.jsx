import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import Spinner from '../components/Spinner'


//material-design bootstrap components
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit'

//redux 
import { getAllPosts } from '../redux/features/postSlice'
import CardPost from '../components/CardPost';


const Home = () => {

  const dispatch = useDispatch()
  const { posts, loading } = useSelector((state) => ({ ...state.post}))

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  if(loading) {
    return <Spinner />
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "150px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {posts.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
         
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-5 row-cols-md-3 g-4">
              {posts && posts.map((item, index) => <CardPost key={index} {...item}/>)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home