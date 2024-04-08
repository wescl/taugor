import React, { useState } from 'react';
import { handleDownloadPDF } from './FuncionarioPDF';
import ModalComponent from '../materialUi/Modal';
import './ItemFuncionario.scss';
import { MdDelete, MdEdit } from "react-icons/md";
import { FaInfo } from "react-icons/fa6";
import InfoFuncionario from './InfoFuncionario';
import { FaFilePdf } from "react-icons/fa6";

const ItemFuncionario = ({ contato, funcionarios, handleExcluirFuncionario, handleOpenModalEdicao }) => {
    const [modalAberto, setModalAberto] = useState(false);

    const handleAbrirModal = () => {
        setModalAberto(true);
    };

    const handleCloseModalEdicao = () => {
        setModalAberto(false);
    };

    const handleSalvarEdicao = () => { };

    return (
        <>
            <div className="item-funcionario" key={contato.id}>
                <div className='item-img'>
                    <img src={contato.foto || 'https://firebasestorage.googleapis.com/v0/b/taugor-aa560.appspot.com/o/projeto%2Ffavicon-taugor.png?alt=media&token=d2259668-787e-4947-b2ec-10a4d108c1c0'} alt='Imagem'/>
                </div>

                <div className='item-info'>
                    <h3>{contato.nome} {contato.sobrenome}</h3>
                    <p>{contato.telefone}</p>

                    <div className='item-info-funcionario'>
                        {funcionarios.map((funcionario) => (
                            <div key={funcionario.id}>
                                <p>
                                    {funcionario.setor} - {funcionario.cargo}
                                </p>

                                <div className='buttons'>
                                    <button className='button1' onClick={() => handleExcluirFuncionario(funcionario.id, contato.id)}><MdDelete /></button>
                                    <button className='button1' onClick={() => handleOpenModalEdicao(funcionario)}><MdEdit /></button>
                                    <button className='button1' >{handleDownloadPDF(funcionario, contato)}<FaFilePdf /></button>
                                    <button className='button2' onClick={handleAbrirModal}><FaInfo /></button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {!funcionarios.length && (
                        <div className='buttons'>
                            <button onClick={() => handleExcluirFuncionario("semdadosfuncionario", contato.id)}><MdDelete /></button>
                        </div>
                    )}
                </div>

                {modalAberto && (
                    <ModalComponent
                        maxWidth='maxWidth-4'
                        padding='10px 80px 50px 80px'
                        isOpen={modalAberto}
                        onClose={handleCloseModalEdicao}
                        modalTitle="Informações do Funcionário"
                        onSave={handleSalvarEdicao}
                    >
                        <InfoFuncionario
                            handleExcluirFuncionario={handleExcluirFuncionario}
                            handleOpenModalEdicao={handleOpenModalEdicao}
                            handleDownloadPDF={handleDownloadPDF}
                            contato={contato}
                            funcionarios={funcionarios} />
                    </ModalComponent>
                )}
            </div>
        </>
    );
};

export default ItemFuncionario;
