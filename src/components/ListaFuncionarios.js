import React, { useState, useEffect } from 'react';
import { buscarContatos, excluirContato, listenToContatos } from '../services/servicoContato';
import { buscarFuncionarios, excluirFuncionario, atualizarFuncionario, listenToFuncionarios } from '../services/servicoFuncionario';
import ModalComponent from '../materialUi/Modal';
import FormContato from './FormContato';
import ItemFuncionario from './ItemFuncionario';
import './ListaFuncionarios.scss'
import { IoClose } from "react-icons/io5";
import { IoMdSearch } from 'react-icons/io';
import { IoPersonAdd } from "react-icons/io5";

const ListaFuncionarios = ({ uid, onClick, onFormSubmit, onInputBlur, onModalClose }) => {
  const [contatos, setContatos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [open, setOpen] = useState(false);
  const [funcionarioEditando, setFuncionarioEditando] = useState(null);
  const [contatoFuncionarioEditando, setContatoFuncionarioEditando] = useState(null);
  const [nomeBusca, setNomeBusca] = useState(''); 

  useEffect(() => {
    listenToContatos(setContatos);
    listenToFuncionarios(setFuncionarios);
  }, []);

  useEffect(() => {
    const fetchContatosData = async () => {
      try {
        const contatosData = await buscarContatos(nomeBusca);
        setContatos(contatosData);
      } catch (error) {
        console.error("Erro ao buscar contatos:", error);
      }
    };

    fetchContatosData();
  }, [nomeBusca]);

  const buscarFuncionariosPorContatoId = async (contatoId) => {
    try {
      const funcionariosData = await buscarFuncionarios();
      return funcionariosData.filter(funcionario => funcionario.id_contato === contatoId);
    } catch (error) {
      console.error("Erro ao buscar funcionários por ID de contato:", error);
      return [];
    }
  };

  const handleExcluirFuncionario = async (funcionarioId, contatoId) => {
    try {
      await excluirFuncionario(funcionarioId);
      const funcionariosRestantes = await buscarFuncionariosPorContatoId(contatoId);
      if (funcionariosRestantes.length === 0) {
        await excluirContato(contatoId);
      }
      const updatedContatos = contatos.filter(contato => contato.id !== contatoId);
      setContatos(updatedContatos);
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
    }
  };

  const handleOpenModalEdicao = async (funcionario) => {
    setFuncionarioEditando(funcionario);
    const contato = await buscarContatoPorId(funcionario.id_contato);
    setContatoFuncionarioEditando(contato);
    setOpen(true);
  };

  const handleCloseModalEdicao = () => {
    setFuncionarioEditando(null);
    setContatoFuncionarioEditando(null);
    setOpen(false);
  };

  const handleSalvarEdicao = async (novosDados) => {
    try {
      await atualizarFuncionario(funcionarioEditando.id, novosDados);
      const contatosAtualizados = await fetchContatos();
      setContatos(contatosAtualizados);
      handleCloseModalEdicao();
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  };

  const fetchContatos = async () => {
    try {
      const contatosData = await buscarContatos(nomeBusca);
      for (const contato of contatosData) {
        const funcionariosData = await buscarFuncionariosPorContatoId(contato.id);
        contato.funcionarios = funcionariosData;
      }
      return contatosData;
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
      return [];
    }
  };


  const buscarContatoPorId = async (contatoId) => {
    try {
      const contatosData = await buscarContatos();
      return contatosData.find(contato => contato.id === contatoId);
    } catch (error) {
      console.error("Erro ao buscar contato por ID:", error);
      return null;
    }
  };

  const handleClearSearch = () => {
    setNomeBusca('');
  };

  return (
    <>
      <div className='search-wrapper'>
        <button onClick={onClick}><IoPersonAdd /></button>
        <div className='input'>
          <div className='icon-search'>
            <IoMdSearch />
          </div>

          <input
            type="text"
            placeholder="Procurar por nome"
            className='search'
            value={nomeBusca}
            onChange={(e) => setNomeBusca(e.target.value)}
          />

          {nomeBusca && (
            <div className='icon-close' onClick={handleClearSearch}>
              <IoClose />
            </div>
          )}
        </div>

        {contatos.length === 0 && (
          <p>Nenhum Funcionário encontrado.</p>
        )}

      </div>

      {contatos.map((contato) => (
        <ItemFuncionario
          key={contato.id}
          contato={contato}
          funcionarios={funcionarios.filter(funcionario => funcionario.id_contato === contato.id)}
          handleExcluirFuncionario={handleExcluirFuncionario}
          handleOpenModalEdicao={handleOpenModalEdicao}
        />
      ))}

      <ModalComponent
        maxWidth='maxWidth-3'
        isOpen={open}
        onClose={handleCloseModalEdicao}
        onSave={handleSalvarEdicao}
      >
        <FormContato
          uid={uid}
          contatoExistente={contatoFuncionarioEditando}
          funcionarioExistente={funcionarioEditando}
          onModalClose={handleCloseModalEdicao}
          onFormSubmit={onFormSubmit} onInputBlur={onInputBlur}
        />
      </ModalComponent>
    </>
  );

};

export default ListaFuncionarios;
