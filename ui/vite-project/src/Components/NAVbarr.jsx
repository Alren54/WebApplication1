import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <nav className="navbar bg-primary navbar-expand-lg mb-5" data-bs-theme="dark" style={{width: "100%", minHeight: "70px",position: "fixed", zIndex: "1000" }}>
        <div  className="container-fluid ">
          <NavLink className="navbar-brand" to={'/'}>FinterTech</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <NavLink className="nav-link" to="/">Anasayfa</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teachbot" >TeachBot</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/SSS" >SSS</NavLink>
              </li>
              <li  className="nav-item dropdown ">
                <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Biz Kimiz
                </NavLink>
                <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                  <li><NavLink className="dropdown-item" to="/about">Hakkımızda</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><NavLink className="dropdown-item" to="/suggestions">Öneriler</NavLink></li>
                </ul>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    </>
  );
}
