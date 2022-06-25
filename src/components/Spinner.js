import React from 'react'

import { MDBSpinner } from 'mdb-react-ui-kit'

const Spinner = () => {
  return (
   <MDBSpinner 
      className='me-2' 
      style={{ width: '4rem', height: '4rem', marginTop: '150px', color:'red'}}>
        <span className='visually-hidden'>Loading</span>
      </MDBSpinner>
  )
}

export default Spinner