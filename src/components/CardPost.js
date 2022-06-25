import React from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { likePost } from '../redux/features/postSlice'


//material design bootstrap for React components
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBCardGroup, MDBBtn, MDBIcon, MDBTooltip  } from 'mdb-react-ui-kit'

const CardPost = ({ imageFile, description, title, tags, name, _id, likes }) => {

    const { user } = useSelector((state) => ({...state.auth }))
    const dispatch = useDispatch()
    const userId = user?.result?._id

    //limits description on home posts card to 45 characters....linked to full post page to read more
    const excerpt = (str) => {
        if(str.length > 30) {
            str = str.substring(0, 30) + '...'
        }
        return str
    }

    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === userId) ? (
            <>
              <MDBIcon fas icon="thumbs-up" />
              &nbsp;
              {likes.length > 0 ? (
                <MDBTooltip
                  tag="a"
                  title={`You and ${likes.length - 1} other people liked`}
                >
                  {likes.length} Likes
                </MDBTooltip>
              ) : (
                `${likes.length} Like${likes.length > 1 ? "s" : ""}`   //makes like into likes, adds the s
              )}
            </>
          ) : (
            <>
              <MDBIcon far icon="thumbs-up" />
              &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
            </>
          );
        }
        return (
          <>
            <MDBIcon far icon="thumbs-up" />
            &nbsp;Like
          </>
        );
      };

      const handleLike = () => {
        dispatch(likePost({ _id }));
      };
    



  return (
   <MDBCardGroup>
        <MDBCard className='h-100 mt-3 d-sm-flex' style={{ maxWidth: '20rem' }}>
            <MDBCardImage
                src = { imageFile }
                alt = { title }
                position='top'
                style={{ maxWidth: '100%', height: '190px' }}>
            </MDBCardImage>
            <div className='top=left'>{ name }</div> 
            <span className='text-start tag-card'>
                { tags.map((item) => ` # ${item},`)}
           
             </span>
            <MDBCardBody>
                <MDBCardTitle className='text-start'>{ title }</MDBCardTitle>
                <MDBCardText className='text-start'>{excerpt(description)}</MDBCardText>
                <Link to={`/post/${_id}`}> Read More </Link>

                <MDBBtn className='like-btn'
                //  style={{ float: 'right' }}
                 tag='a' 
                 color='blue'
                 rounded
                //floating
                 onClick={!user?.result ? null : handleLike}
          >
            {!user?.result ? (
              <MDBTooltip title="Please login to like this post" tag="a">
                <Likes />
              </MDBTooltip>
            ) : (
              <Likes />
            )}
          </MDBBtn>

            </MDBCardBody>
        </MDBCard>
   </MDBCardGroup>
  )
}

export default CardPost