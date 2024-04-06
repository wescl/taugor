import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import logo from '../assets/marca-taugor.png';
import Input from '../ui/Input';
import Button from '../ui/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignIn = async () => {
    try {
      setLoading(true);

      // Limpar mensagens de erro
      setErrors({});
      setErrorMessage('');

      // Validar email e senha
      const newErrors = {};
      if (!validateEmail(email)) {
        newErrors.email = 'Email inválido. ';
      }
      if (!validatePassword(password)) {
        newErrors.password = 'A senha deve ter pelo menos 6 caracteres. ';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setLoading(false);
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setErrorMessage('Email ou Senha incorreto. ');
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleInputBlur = (field, value) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: field === 'email' ? (!validateEmail(value) && 'Email inválido. ') : (!validatePassword(value) && 'A senha deve ter pelo menos 6 caracteres.')
    }));
  };

  const handleInputChange = (field) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: ''
    }));
  };

  return (
    <div className="login-container">
      <div className="email-senha">
        <p>Email: wescley@gmail.com</p>
        <p>Senha: 123456</p>
      </div>
      <div className='login-form'>
        <div className='logo-img'>
          <img src={logo} alt="Taugor Logo" />
        </div>

        <Input
          type="email"
          label="Email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); handleInputChange('email'); }}
          onBlur={(e) => handleInputBlur('email', e)}
        />

        <Input
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => { setPassword(e.target.value); handleInputChange('password'); }}
          onBlur={(e) => handleInputBlur('password', e)}
        />

        <p className="error-message">
          {errorMessage && errorMessage}
          {errors.email && errors.email}
          {errors.password && errors.password}
        </p>

        <Button onClick={handleSignIn} loading={loading}>Entrar</Button>


      </div>
    </div>
  );
};

export default Login;
