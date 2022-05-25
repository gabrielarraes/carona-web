import React from 'react'
import { useTitle } from '../../../hooks'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    useTitle('Page Not Found | Carona App')

    return (
        <section className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
            <div className="error-page">
                <h2 className="headline text-warning"> 404</h2>

                <div className="error-content">
                    <h3>
                        <i className="fas fa-exclamation-triangle text-warning"></i> Oops! Page not found.
                    </h3>

                    <p>
                        We could not find the page you were looking for. Meanwhile, you may <Link to={'/'}>return to home</Link>.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default PageNotFound
