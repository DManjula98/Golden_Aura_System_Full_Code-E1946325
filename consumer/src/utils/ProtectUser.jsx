import React from 'react'
import { useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectUser = () => {
    const {userInformation} = useSelector(state => state.auth)
    if(userInformation){
      return <Outlet/>
  }else{
      return <Navigate to='/login' replace={true}/>
   
  }
}

export default ProtectUser