import React, { useState } from 'react';
import ModalComponent from '../materialUi/Modal';
import FormContato from '../components/FormContato';
import { Row, Col } from '../ui/Grid';
import { FuncionarioViewer } from '../components/FuncionarioPDF';
import ListaFuncionarios from './ListaFuncionarios';
import './RegistroFuncionario.scss'

const RegistroFuncionario = (uid) => {

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(null);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleFormSubmit = (data) => {
        setFormData(data);
    };

    const handleInputBlur = (fieldName, value) => {
        setFormData(prevData => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    return (
        <>
            <ListaFuncionarios uid={uid} onFormSubmit={handleFormSubmit} onInputBlur={handleInputBlur} onModalClose={handleCloseModal} onClick={handleOpenModal} />
            <ModalComponent maxWidth='maxWidth' isOpen={isOpen} onClose={handleCloseModal} modalTitle="">
                <Row>
                    <Col>
                        <FormContato uid={uid} onFormSubmit={handleFormSubmit} onInputBlur={handleInputBlur} onModalClose={handleCloseModal} />
                    </Col>
                    <div className='oct-pdf'>
                        <Col>
                            <FuncionarioViewer formData={formData} />
                        </Col>
                    </div>
                </Row>
            </ModalComponent>
        </>
    );
};

export default RegistroFuncionario;
