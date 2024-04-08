import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import RegistroFuncionario from '../components/RegistroFuncionario';
import Container from '../ui/Container';
import './Home.scss';
import { CiLogout } from "react-icons/ci";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = () => {
    auth.signOut();
  };

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Container>
        <RegistroFuncionario uid={currentUser.uid} />
      </Container>
      <button className='sair' onClick={handleSignOut}><CiLogout /></button>
    </>
  );
};

export default Home;
