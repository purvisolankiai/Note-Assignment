import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const RequiresAuth = ({ children }) => {
    const location = useLocation()
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    return (
        isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} />
    )
}
export default RequiresAuth