
import React, { useState } from 'react'
import UserContext from './UserContext'

const UserContextProvider = ({children}) => {
    const [customerId,setCustomerId] = useState(null)
    const [emailVal,setEmailVal] = useState([])
  return (
    <UserContext.Provider value={{customerId,setCustomerId,emailVal,setEmailVal}}>
    {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider