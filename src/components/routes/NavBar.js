import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => (
  <div className="p-10 border">
    <nav>
      <ul className="flex justify-between">
        <li>
          <Link to="/fo/vinantic">Vinantic</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/bo/vinantic">Admin</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default NavBar;
