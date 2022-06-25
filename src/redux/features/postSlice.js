import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from '../axios'


//  CREATE
export const createPost = createAsyncThunk( 'post/createPost',
  async ({ updatedPostData, navigate, toast }, {rejectWithValue} ) => {
    try {
      const response = await api.createPost(updatedPostData)
      toast.success("Post Added")
      navigate("/");
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
//  READ -- stored in the posts array from initial state
export const getAllPosts = createAsyncThunk( 'post/getAllPosts',
  async ( _, {rejectWithValue} ) => {
    try {
      const response = await api.getAllPosts()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
//  READ -- stored in the post object from initial state
export const getPost = createAsyncThunk( 'post/getPost', 
    async ( id, {rejectWithValue}) => {
      try {
        const response = await api.getPost(id)
        return response.data
      } catch(error) {
        return rejectWithValue(error.response.data)
      }
    }
  )

//   READ -- data stored in userPosts array- for dashboard of a single user
export const getPostsByUser = createAsyncThunk( 'post/getPostsByUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getPostsByUser(userId);
      return response.data;
    } catch(error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//UPDATE
export const updatePost = createAsyncThunk( '/post/updatePost',
  async ({ id, updatedPostData, navigate, toast}, {rejectWithValue}) => {

    try {
      const response = await api.updatePost(updatedPostData, id)
      toast.success('Post Updated')
      navigate('/')
      return response.data

    }catch(error) {
      return rejectWithValue(error.response.data)
    }
    
  }
)

// DELETE 
export const deletePost= createAsyncThunk("post/deletePost",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deletePost(id);
      toast.success("Post Deleted Successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


//LIKE posts
export const likePost = createAsyncThunk( "post/likePost",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likePost(_id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const postSlice = createSlice({
    name: 'post',
    initialState: {post: {}, posts: [], userPosts: [], error: '', loading: false},

//lifecycles 
        extraReducers: {
            [createPost.pending]: ( state, action ) => {
             state.loading = true
            },
            [createPost.fulfilled]: ( state, action ) => {
                state.loading = false
                state.posts = [action.payload]
            },
            [createPost.rejected]: ( state, action ) => {
                state.loading = false
                state.error = action.payload.message
            },
            [getAllPosts.pending]: ( state, action ) => {
              state.loading = true
            }, 
            [getAllPosts.fulfilled]: ( state, action ) => {
              state.loading = false
              state.posts = action.payload
            }, 
            [getAllPosts.rejected]: ( state, action ) => {
              state.loading = false
              state.error = action.payload.error
            },
            [getPost.pending]: (state, action) => {
              state.loading = true;
            },
            [getPost.fulfilled]: (state, action) => {
              state.loading = false;
              state.post = action.payload;
            },
            [getPost.rejected]: (state, action) => {
              state.loading = false;
              state.error = action.payload.message;
            },
            [getPostsByUser.pending]: (state, action) => {
              state.loading = true;
            },
            [getPostsByUser.fulfilled]: (state, action) => {
              state.loading = false;
              state.userPosts = action.payload;
            },
            [getPostsByUser.rejected]: (state, action) => {
              state.loading = false;
              state.error = action.payload.message;
            },
            [deletePost.pending]: (state, action) => {
              state.loading = true;
            },
            [deletePost.fulfilled]: (state, action) => {
              state.loading = false;
              const {
                arg: { id },
              } = action.meta;
              if (id) {
                state.userPosts = state.userPosts.filter((item) => item._id !== id);
                state.posts = state.posts.filter((item) => item._id !== id);
              }
            },
            [deletePost.rejected]: (state, action) => {
              state.loading = false;
              state.error = action.payload.message;
            },
            [updatePost.pending]: (state, action) => {
              state.loading = true;
            },
            [updatePost.fulfilled]: (state, action) => {
              state.loading = false;
              const {
                arg: { id },
              } = action.meta;
              if (id) {
                state.userPosts = state.userPosts.map((item) =>
                  item._id === id ? action.payload : item
                );
                state.posts = state.posts.map((item) =>
                  item._id === id ? action.payload : item
                );
              }
            },
            [updatePost.rejected]: (state, action) => {
              state.loading = false;
              state.error = action.payload.message;
            },
            [likePost.pending]: (state, action) => {},
            [likePost.fulfilled]: (state, action) => {
              state.loading = false;
              const {
                arg: { _id },
              } = action.meta;
              if (_id) {
                state.post = state.posts.map((item) =>
                  item._id === _id ? action.payload : item
                );
              }
            },
            [likePost.rejected]: (state, action) => {
              state.error = action.payload.message;
            },

            //reducer updates the frontend, the api updates the database
            

            // state.votes = state.votes.filter(
            //   (vote) => vote._id !== action.payload.id

     
        }
    }
)

export default postSlice.reducer