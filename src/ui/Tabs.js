import React from 'react';
import './Sidebar.scss';
import { MdDashboard } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { CgNotes } from "react-icons/cg";
import { Link, useLocation } from 'react-router-dom';
import { FaHistory } from "react-icons/fa";
import './Tabs.scss'

const Tabs = () => {
  const location = useLocation();

  return (
    <div className="tabs">
      <ul className="tabs-menu">
        <li className={location.pathname === '/' ? 'active' : ''}><Link to="/"><i><IoMdPerson /></i></Link></li>
        <li className={location.pathname === '/historico' ? 'active' : ''}><Link to="/historico"><i><FaHistory /></i></Link></li>
        <li className={location.pathname === '/painel' ? 'active' : ''}><Link to="/painel"><i><MdDashboard /></i></Link></li>
        <li className={location.pathname === '/observacoes' ? 'active' : ''}><Link to="/observacoes"><i><CgNotes /></i></Link></li>
      </ul>
    </div>
  );

}

export default Tabs;
