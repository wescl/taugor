import React from 'react';
import './Sidebar.scss';
import logo from '../assets/marca-taugor.png'
import { MdDashboard } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { CgNotes } from "react-icons/cg";
import { Link, useLocation } from 'react-router-dom';
import { FaHistory } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Logo"></img>
      </div>
      <ul className="sidebar-menu">
        <li className={location.pathname === '/' ? 'active' : ''}><Link to="/"><i><IoMdPerson /></i> Funcionários</Link></li>
        <li className={location.pathname === '/historico' ? 'active' : ''}><Link to="/historico"><i><FaHistory /></i> Histórico</Link></li>
        <li className={location.pathname === '/painel' ? 'active' : ''}><Link to="/painel"><i><MdDashboard /></i> Painel</Link></li>
        <li className={location.pathname === '/observacoes' ? 'active' : ''}><Link to="/observacoes"><i><CgNotes /></i> Observações</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
