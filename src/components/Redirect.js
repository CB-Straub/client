//component redirects user to login page after five seconds if user is not authorized 

import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {
    const [count, setCount] = useState(5)
    const navigate = useNavigate()


    useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000)

    count === 0 && navigate("/login")
    return () => clearInterval(interval)
  }, [count, navigate])

  return (
    <div style={{ marginTop: "180px", color: 'Brown'}}>
      <h5>Redirecting ... {count} seconds</h5>
    </div>
  )
}

export default Redirect