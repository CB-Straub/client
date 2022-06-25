import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem('profile')).token
      }`;
    }
    return req;
  });

//login post request end point
export const login = (formData) => API.post('users/login', formData)
//sign up new user post request end point
export const signUp = (formData) => API.post('users/signUp', formData)

// CREATE  -- a new post end point
export const createPost = (postData) => API.post('/post', postData)

//  READ -- get all posts for every user to display on front end
export const getAllPosts = () => API.get('/post')

//   READ -- get just one post, any user , not protected route  post id not user id
export const getPost = (id) => API.get(`/post/${id}`)

//  READ -- get a single logged in users posts for their dashboard
export const getPostsByUser = (id) => API.get(`/post/userPosts/${id}`);

// DELETE
export const deletePost = (id) => API.delete(`/post/${id}`)

//UPDATE a Post
export const updatePost = (updatedPostData, id) => API.patch(`/post/${id}`, updatedPostData);

//LIKE a post
export const likePost = (id) => API.patch(`/post/like/${id}`)








