import React from 'react'
import Redirect from './Redirect'

import { useSelector } from 'react-redux'

const ProtectedRoute = ({children}) => {

//verify user is logged in
const { user } = useSelector((state) => ({ ...state.auth}))


//if user is authorized display the children, if not redirect to the login page
  return (
    user ? children : <Redirect />
  )
}

export default ProtectedRoute