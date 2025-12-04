import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

//Import Komponen 
// Menu
const MenuList = React.lazy(() => import("./components/Menu/List"));
const MenuCreate = React.lazy(() => import("./components/Menu/Create"));
const MenuEdit = React.lazy(() => import("./components/Menu/Edit"));

// Makanan
const MakananList = React.lazy(() => import("./components/Makanan/List"));
const MakananCreate = React.lazy(() => import("./components/Makanan/Create"));
const MakananEdit = React.lazy(() => import("./components/Makanan/Edit"));


function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/menu">
                  Menu
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/makanan">
                  Makanan
                </NavLink>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/menu" element={<MenuList />} />
          <Route path="/menu/create" element={<MenuCreate />} />
          <Route path="/menu/edit/:id" element={<MenuEdit />} />
          <Route path="/makanan" element={<MakananList />} />
          <Route path="/makanan/create" element={<MakananCreate />} />
          <Route path="/makanan/edit/:id" element={<MakananEdit />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
