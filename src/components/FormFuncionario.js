import React, { useState } from 'react';
import Input from '../ui/Input';
import { adicionarFuncionario, atualizarFuncionario } from '../services/servicoFuncionario';
import Select from '../ui/Select';
import Button from '../ui/Button';
import InputDate from '../ui/InputDate';
import Title from '../ui/Title';
import { FaPenClip } from "react-icons/fa6";

const FormFuncionario = ({ onModalClose, funcionarioExistente, id_contato, onCancel, onFormSubmit, onInputBlur }) => {
    const [cargo, setCargo] = useState(funcionarioExistente ? funcionarioExistente.cargo : '');
    const [dataAdmissao, setDataAdmissao] = useState(funcionarioExistente ? funcionarioExistente.dataAdmissao : '');
    const [setor, setSetor] = useState(funcionarioExistente ? funcionarioExistente.setor : '');
    const [salario, setSalario] = useState(funcionarioExistente ? funcionarioExistente.salario : '');
    const [errorMessage, setErrorMessage] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validarCampos = () => {
        const errors = {};

        if (!cargo.trim()) {
            errors.cargo = "O cargo é obrigatório.";
            setIsLoading(false);
        }

        if (!setor.trim()) {
            errors.setor = "Selecione o Setor.";
            setIsLoading(false);
        }

        if (!dataAdmissao) {
            errors.dataAdmissao = "A data é obrigatório.";
            setIsLoading(false);
        }

        if (!salario.trim()) {
            errors.salario = "O salário é obrigatório.";
            setIsLoading(false);
        }

        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const errors = validarCampos();
        setErrorMessage(errors);

        const novoFuncionario = {
            cargo,
            dataAdmissao,
            setor,
            salario,
            id_contato,
        };

        onFormSubmit(novoFuncionario);

        if (funcionarioExistente) {
            await atualizarFuncionario(funcionarioExistente.id, novoFuncionario);
            onModalClose();
            setIsLoading(false);
        } else {
            await adicionarFuncionario(novoFuncionario);
            onModalClose();
            setIsLoading(false);
        }
    };

    const handleInputBlur = (fieldName, value) => {
        onInputBlur(fieldName, value);
    };

    const optionsSetor = ['TI', 'Marketing', 'Atendimento'];

    return (
        <form onSubmit={handleSubmit}>
            <Title title="Preencha os dados de funcionário" text="lorem lorem lorem lorem lorem lorem lorem lorem" icon={<FaPenClip />} />

            <Input
                type="text"
                label="Cargo"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                onBlur={(value) => handleInputBlur("cargo", value)}
                errorMessage={errorMessage.cargo}
                age="false"
            />

            <InputDate
                value={dataAdmissao}
                onChange={(value) => setDataAdmissao(value)}
                placeholder="Data de Admissão"
                label="Data de Admissão"
                onBlur={(value) => onInputBlur("dataAdmissao", value)}
                errorMessage={errorMessage.dataAdmissao}
            />

            <Input
                type="text"
                label="Salário"
                value={`${salario}`}
                onChange={(e) => setSalario(e.target.value)}
                onBlur={(value) => handleInputBlur("salario", value)}
                errorMessage={errorMessage.salario}
            />

            <Select
                options={optionsSetor}
                value={setor}
                label="Setor"
                onChange={(selectedOption) => setSetor(selectedOption)}
                onBlur={(value) => onInputBlur("setor", value)}
                errorMessage={errorMessage.setor}
            />

            <Button type="submit" loading={isLoading}>
                {isLoading ? 'Carregando...' : (funcionarioExistente ? 'Atualizar Funcionário' : 'Adicionar Funcionário')}
            </Button>

            {onCancel && <Button type="button" onClick={onCancel}>Cancelar</Button>}

        </form>
    );
};

export default FormFuncionario;
