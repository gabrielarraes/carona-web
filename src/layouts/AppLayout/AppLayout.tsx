import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header, Sidebar } from '../../components'

const AppLayout = () => {
    return (
        <div className="wrapper">
            <Header />
            <Sidebar />
            <div className="content-wrapper">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default AppLayout
