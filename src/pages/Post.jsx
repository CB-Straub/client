import React, { useEffect} from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

//redux
import { getPost } from '../redux/features/postSlice'

//mdb components
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBIcon, MDBContainer } from 'mdb-react-ui-kit'
import DisqusThread from '../components/DIsqus'

const Post = () => {
    const dispatch = useDispatch()
    const { post } = useSelector((state) => ({ ...state.post}))
    const { id } = useParams()

    //fires after id is fetched from the postSlice to get the post id 
    useEffect(() => {
        if(id) {
            dispatch(getPost(id))
        }
    }, [dispatch, id])
//creates single post page, maps through all posts by item 
return (
    <>
    <MDBContainer>
        <MDBCard className='mb-3 mt-3'>
            <MDBCardImage
                position='top'
                style={{ width: '100%', maxHeight: '500px', }}
                src={post.imageFile}
                alt={post.title}
            />
       <MDBCardBody>
            <h3>{post.title}</h3>
            <span>
              <p className='text-start postName'>Created By: {post.name}</p>
            </span>
            <div style={{ float: 'left'}}>
              <span className="text-start">
                {post && post.tags && post.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className='text-start'>
              <MDBIcon
              className='calender-icon'
                style={{ float: 'left', margin: '5px' }}
                far
                icon='calendar-alt'
                size='lg'
              />
              <small className='text-start'>
                {moment(post.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className='lead mb-0 text-start'>
              {post.description}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard >
        <MDBCard > Comments
          <DisqusThread  id={id} title={post.title} path={`/post/${id}`} /> 
        </MDBCard>
        
      </MDBContainer>
    </>
  );
};


export default Post