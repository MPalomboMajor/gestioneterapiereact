const SideNav = () => {
    return (
        <div>
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <a href="index3.html" className="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">GestioneTerapie</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">Jacopo Meucci</a>
                        </div>
                    </div>
                    
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* Add icons to the links using the .nav-icon class
       with font-awesome or any other icon font library */}                          
                            <li className="nav-item">
                                <a href="/Dashboard" className="nav-link">
                                    <i className="nav-icon fas fa-hospital-user" />
                                    <p>
                                        Pazienti
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/DoctorProfile" className="nav-link">
                                    <i className="nav-icon fas fa-user-md" />
                                    <p>
                                        Anagrafica medico
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/DoctorProfile" className="nav-link">
                                    <i className="nav-icon fas fa-star-of-life" />
                                    <p>
                                        Richiedi codici paziente
                                    </p>
                                </a>
                            </li>
                            
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>

        </div>
    )
}

export default SideNav
