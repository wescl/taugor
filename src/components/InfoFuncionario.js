import React from 'react';
import './InfoFuncionario.scss'
import { MdDelete, MdEdit } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";

const InfoFuncionario = ({ contato, funcionarios, handleExcluirFuncionario, handleOpenModalEdicao, handleDownloadPDF }) => {
    return (
        <div className='info-funcionario'>
            <div className='item-img'>
                <img src={contato.foto} alt={`${contato.nome} ${contato.sobrenome}`} />
            </div>
            <h3>{contato.nome} {contato.sobrenome}</h3>
            <p>Sexo: {contato.sexo}</p>
            <p>Endereço: {contato.endereco}</p>
            <p>Telefone: {contato.telefone}</p>
            <p>Data de Nascimento: {contato.dataAniversario}</p>
            {funcionarios.map((funcionario) => (
                <>
                    <p>Cargo: {funcionario.cargo}</p>
                    <p>Setor: {funcionario.setor}</p>
                    <p>Salário: {funcionario.salario}</p>
                    <p>Data de Admissão: {funcionario.dataAdmissao}</p>
                    <div className='buttons'>
                        <button className='button' onClick={() => handleExcluirFuncionario(funcionario.id, contato.id)}><i><MdDelete /></i> Excluir</button>
                        <button className='button' onClick={() => handleOpenModalEdicao(funcionario)}><i><MdEdit /></i> Editar</button>
                        <button className='button'>{handleDownloadPDF(funcionario, contato)}<i><FaFilePdf /></i> Baixar PDF</button>
                    </div>
                </>
            ))}

        </div>
    );
};

export default InfoFuncionario;
