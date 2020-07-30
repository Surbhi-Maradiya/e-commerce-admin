import React from 'react';
import { Route, HashRouter, Link } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Stock from './Stock';
import Orders from './Orders';
import Sales from './Sales';

const logout = () => {
  sessionStorage.clear();
  window.location.href = './';
}

function App() {
  if (sessionStorage.getItem("username") == null) {

    return <Login />

  } else {

    const mypage = <>
      <HashRouter>
        <nav className="navbar navbar-expand-sm bg-primary navbar-light">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/"><i className="fa fa-cogs"></i> Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/stock"><i className="fa fa-sitemap"></i> Stock</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/orders"><i className="fa fa-headset"></i> Orders</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/sales"><i className="fa fa-cart-plus"></i> Sales</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="javascript:void(0)" onClick={logout}>
                Welcome , {sessionStorage.getItem("username")}- : <i className="fa fa-power-off text-danger"></i> Logout
            </a>
            </li>
          </ul>
        </nav>

        <Route exact path="/" component={Dashboard} />
        <Route path="/stock" component={Stock} />
        <Route path="/orders" component={Orders} />
        <Route path="/sales" component={Sales} />

      </HashRouter>
    </>;
    return mypage;
  }
}
export default App;
