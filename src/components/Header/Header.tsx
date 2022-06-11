import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts'
import userImage from '../../assets/images/default-user-image.png'

const Header = () => {
    const { handleLogout, user } = useContext(AuthContext)

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" data-widget="pushmenu" to="#" role="button">
                        <i className="fas fa-bars"></i>
                    </Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to={'/'} className="nav-link">
                        Home
                    </Link>
                </li>
                {!user?.roles.includes('ROLE_DRIVER') && (
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to={'/cars/create'} className="nav-link">
                            Seja Colaborador
                        </Link>
                    </li>
                )}
            </ul>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                    <Link className="nav-link" data-toggle="dropdown" to="#" aria-expanded="false">
                        <img width={30} src={userImage} className="img-circle elevation-2" alt="Profil" />
                    </Link>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span className="dropdown-item dropdown-header text-muted">{user?.username.toUpperCase()}</span>
                        <div className="dropdown-divider"></div>
                        <Link to="#" className="dropdown-item" id="js-logout-button" onClick={handleLogout}>
                            <i className="fas fa-unlock-alt mr-2"></i> Logout
                        </Link>

                        <div className="dropdown-divider"></div>
                        <span className="dropdown-item dropdown-footer text-muted">{user?.roles[0].replace(/_/g, ' ')}</span>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Header
