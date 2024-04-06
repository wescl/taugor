import React from 'react';
import './Sidebar.scss';
import logo from '../assets/marca-taugor.png'
import { MdDashboard } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { CgNotes } from "react-icons/cg";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo}></img>
      </div>
      <ul className="sidebar-menu">
        <li><Link to="painel"><i><MdDashboard /></i> Dashboard</Link></li>
        <li><Link to=""><i><IoMdPerson /></i> Funcionários</Link></li>
        <li><Link to="observações"><i><CgNotes /></i> Observações</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
