import React from 'react'
import  {Outlet} from "react-router-dom"

const DashboardLayout = () => {
  return (
   <div>
    <h1>NavBAr</h1>
    <hr />
    <h1>Sidebar</h1>
    <hr />
    <Outlet/>
   </div>
  )
}

export default DashboardLayout