import React from 'react';
import './Sidebar.scss';
import logo from '../assets/marca-taugor.png'
import { MdDashboard } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { CgNotes } from "react-icons/cg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo}></img>
      </div>
      <ul className="sidebar-menu">
        <li><a href="#"><i><MdDashboard /></i> Dashboard</a></li>
        <li><a href="#"><i><IoMdPerson /></i> Funcionários</a></li>
        <li><a href="#"><i><CgNotes /></i> Observações</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;
