import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from'./Sidebar'
import { socket } from '../utils/Utils'
import { useSelector,useDispatch } from 'react-redux'
import {updateCustomer,updateSellers,activeStatus_update} from '../store/reducers/chatReducer'


function MainLayout() {
  const [showSidebar,setSowsSidebar] = useState(false)
  const dispatch = useDispatch()
  const {userInformaion} = useSelector(state => state.auth)
  
  useEffect(() => {
    if (userInformaion && userInformaion.role === 'seller') {
      socket.emit('add_seller', userInformaion._id, userInformaion)
    } else {
      socket.emit('add_admin', userInformaion)
    }
  }, [userInformaion])

  useEffect(()=>{
    socket.on('activeCustomer',(customers)=>{
      dispatch(updateCustomer(customers))
    })
    socket.on('activeSeller',(sellers)=>{
      dispatch(updateSellers(sellers))
    })
    socket.on('activeAdmin',(data)=>{
      dispatch(activeStatus_update(data))
    })
  },[])

  return (
    <div className='bg-[#161d31] w-full min-h-screen'>
      <Header showSidebar={showSidebar} setSowsSidebar={setSowsSidebar}/>
      <Sidebar  showSidebar={showSidebar} setSowsSidebar={setSowsSidebar}/>
      <div className='ml-0 lg:ml-[260px]  pt-[95px] transition-all'>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout