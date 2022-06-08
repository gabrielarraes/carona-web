import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts'

const Sidebar = () => {
    const { user } = useContext(AuthContext)

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to="/" className="brand-link elevation-4">
                <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: 0.8 }} />
                <span className="brand-text font-weight-light">Carona App</span>
            </Link>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="../../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt={user?.username} />
                    </div>
                    <div className="info">
                        <Link to="#" className="d-block">
                            {user?.email}
                        </Link>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                <i className="nav-icon fas fa-home"></i>

                                <p>Home</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/rides/create" className="nav-link">
                                {/*<i className="nav-icon fas fa-home"></i>*/}

                                <p>Programs</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cars/create" className="nav-link">
                                {/*<i className="nav-icon fas fa-home"></i>*/}

                                <p>Create Car</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar
