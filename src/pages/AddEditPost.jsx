import React, { useState, useEffect } from 'react'
import { MDBCard, MDBCardBody, MDBValidation, MDBBtn, MDBInput } from "mdb-react-ui-kit"
// import ChipInput from "material-ui-chip-input"
import FileBase from "react-file-base64"
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { createPost, updatePost } from '../redux/features/postSlice'




const initialState = {
    title: '',
    description: '', 
    tags: []
}


const AddEditPost = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [postData, setPostData] = useState(initialState)
    const { title, description, tags } = postData
    const { error, loading, userPosts } = useSelector((state) => ({ ...state.post })) 

   //brings in the data from the  auth/usermodel for handleSubmit
    const { user } = useSelector(( state ) => ({...state.auth }))

    const { id } = useParams()

    useEffect(() => {
        if(id) {
            const singlePost =  userPosts.find((posts) => posts._id === id)
            setPostData({ ...singlePost })
        }
    }, [id, userPosts])

   

    //error handling , will only fire if error exists,  will fire the toast error message from the backend
    useEffect(() => {
        error && toast.error(error)
    }, [error])



    const onInputChange = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
      };

    // const handleAddTag = ( tag ) => {
    //     // setTagErrMsg(null)
    //     setPostData({ ...postData, tags: [ ...postData.tags, tag]})

    // }

    // const handleDeleteTag = ( deleteTag ) => { 
    //     setPostData({ ...postData, tags: postData.tags.filter(( tag ) => tag !==deleteTag )})

    // }

    const handleClear = () => {
        setPostData({ title: '' , description: '' , tags : [] })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(title && description && tags) {
            const updatedPostData = { ...postData, name: user?.result?.name}

        if(!id){
            dispatch(createPost({ updatedPostData, navigate, toast}))
        }else {
            dispatch(updatePost({ id, updatedPostData, navigate, toast}))
        }    
            
        }
        handleClear()
    }
  
  return (
    <div
    style={{
      margin: "auto",
      padding: "15px",
      maxWidth: "450px",
      alignContent: "center",
      marginTop: "200px",
    }}
    className="container">
        <MDBCard className='mdb-card' alignment='center'>
            <h5>{ id ? 'Update Post' : 'Add Post' }</h5>
            <MDBCardBody >
            <MDBValidation onSubmit={ handleSubmit } className='row g-3' noValidate >
                <div className='col-md-12'>
                    <MDBInput
                        className='form-control'
                        placeholder='Title'
                        name='title'
                        value={ title }
                        required
                        invalid 
                        validation='Please provide a title'
                        onChange={ onInputChange }   
                     />
                </div>
                <div className='col-md-12'>
                    <MDBInput 
                        className='form-control'
                        placeholder='Description'
                        name='description'
                        value={ description }
                        required
                        invalid
                        validation='Please enter a description'
                        textarea
                        rows={ 4 }
                        onChange={ onInputChange }   
                     />
                </div>
                <div className="col-md-12">
                    <MDBInput
                        name='tags'
                        placeholder='Tags'
                        value={ tags }
                        variant='outlined'
                        fullWidth
                        onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
                        // onAdd={( tag ) => handleAddTag( tag )}
                        // onDelete={( tag ) => handleDeleteTag( tag )}
                        
                    />
                 </div>
                 <div className='d-flex justify-content-start'>
                     <FileBase 
                        type='file'    
                        multiple={ false }
                        onDone={({ base64 }) => setPostData({ ...postData, imageFile: base64})}
                    />
               </div>
                <div className="col-12">
                    <MDBBtn style={{ width: '100%'}} className='mt-1'>{ id ? 'Update' : 'Submit' } </MDBBtn>
                    <MDBBtn style={{ width: '100%'}} className='mt-2' onClick={ handleClear }>Clear </MDBBtn>
                </div>

                


                </MDBValidation>
            </MDBCardBody>
        </MDBCard>
    </div>
  )
}

export default AddEditPost