import React, { useState } from 'react';
import { adicionarContato, atualizarContato } from '../services/servicoContato';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import FormFuncionario from './FormFuncionario';
import Input from '../ui/Input';
import InputDate from '../ui/InputDate';
import Select from '../ui/Select';
import FileInput from '../ui/FileInput';
import { Row, Col } from '../ui/Grid';
import Title from '../ui/Title';
import { FaPenClip } from "react-icons/fa6";
import InputPhone from '../ui/InputPhone';
import Button from '../ui/Button';
import CustomSnackbar from '../materialUi/CustomSnackbar';

const FormContato = ({ uid, onModalClose, contatoExistente, funcionarioExistente, onCancel, onFormSubmit, onInputBlur }) => {

    const [nome, setNome] = useState(contatoExistente ? contatoExistente.nome : '');
    const [sobrenome, setSobrenome] = useState(contatoExistente ? contatoExistente.sobrenome : '');
    const [sexo, setSexo] = useState(contatoExistente ? contatoExistente.sexo : '');
    const [endereco, setEndereco] = useState(contatoExistente ? contatoExistente.endereco : '');
    const [telefone, setTelefone] = useState(contatoExistente ? contatoExistente.telefone : '');
    const [fotoPerfil, setFotoPerfil] = useState(contatoExistente ? contatoExistente.foto : '');
    const [dataAniversario, setDataAniversario] = useState(contatoExistente ? contatoExistente.dataAniversario : '');
    const [cep, setCep] = useState('');
    const [idDoDocumento, setIdDoDocumento] = useState(null);
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const [imagemFile, setImagemFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleProfilePictureChange = (file) => {
        setImagemFile(file);
        setFotoPerfil(file);
        setSelectedFile(URL.createObjectURL(file));
    };

    const validarCampos = () => {
        const errors = {};

        if (!nome.trim()) {
            errors.nome = "O nome é obrigatório.";
            setIsLoading(false);
        }

        if (!sobrenome.trim()) {
            errors.sobrenome = "O sobrenome é obrigatório.";
            setIsLoading(false);
        }

        if (!sexo) {
            errors.sexo = "Selecione o Sexo.";
            setIsLoading(false);
        }

        if (!endereco.trim()) {
            errors.endereco = "O endereço é obrigatório.";
            setIsLoading(false);
        }

        if (!telefone.trim()) {
            errors.telefone = "O telefone é obrigatório.";
            setIsLoading(false);
        }

        if (!dataAniversario) {
            errors.dataAniversario = "A data de nascimento é obrigatória.";
            setIsLoading(false);
        }

        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const errors = validarCampos();
        setErrorMessage(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        try {
            let fotoPerfilUrl = fotoPerfil;
            if (imagemFile) {
                const storage = getStorage();
                const fileRef = storageRef(storage, `profilePictures/${imagemFile.name}`);
                await uploadBytes(fileRef, imagemFile);
                fotoPerfilUrl = await getDownloadURL(fileRef);
            }

            const novoContato = {
                nome,
                sobrenome,
                sexo,
                endereco,
                telefone,
                foto: fotoPerfilUrl,
                dataAniversario,
                uid
            };

            onFormSubmit(novoContato);

            if (contatoExistente) {
                await atualizarContato(contatoExistente.id, novoContato);
                setMostrarMensagem(true);
                setOpenSnackbar(true);
            } else {
                const id = await adicionarContato(novoContato);
                setIdDoDocumento(id);
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error("Erro ao enviar imagem:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAddressByCEP = async (cep) => {
        try {
            const response = await fetch(`https://api.postmon.com.br/v1/cep/${cep}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar endereço por CEP');
            }
            const data = await response.json();
            setEndereco(`${data.logradouro}, ${data.bairro}, ${data.cidade} - ${data.estado}`);
        } catch (error) {
            console.error('Erro ao buscar endereço por CEP:', error);
        }
    };

    const optionsSexo = ['Masculino', 'Feminino', 'Outro'];

    return (
        <div>
            <CustomSnackbar open={openSnackbar} onClose={() => setOpenSnackbar(false)} message="Sucesso!" severity="success" />
            {mostrarMensagem ? (
                <FormFuncionario onModalClose={onModalClose} onFormSubmit={onFormSubmit} onInputBlur={onInputBlur} funcionarioExistente={funcionarioExistente} id_contato={funcionarioExistente ? funcionarioExistente.id_contato : null} />
            ) : idDoDocumento ? (
                <div>
                    <FormFuncionario onModalClose={onModalClose} onFormSubmit={onFormSubmit} onInputBlur={onInputBlur} id_contato={idDoDocumento} />
                </div>
            ) : (
                <>
                    <Title title="Preencha os dados de contato" icon={<FaPenClip />} />
                    <form className='form-contato' onSubmit={handleSubmit}>
                        <Row>
                            <Col size={7}>
                                <Input
                                    type="text"
                                    label="Nome"
                                    placeholder="Nome"
                                    value={nome}
                                    inputDate={true}
                                    onChange={(e) => setNome(e.target.value)}
                                    onBlur={(value) => onInputBlur("nome", value)}
                                    errorMessage={errorMessage.nome}
                                />

                                <Input
                                    type="text"
                                    label="Sobrenome"
                                    placeholder="Sobrenome"
                                    value={sobrenome}
                                    onChange={(e) => setSobrenome(e.target.value)}
                                    onBlur={(value) => onInputBlur("sobrenome", value)}
                                    errorMessage={errorMessage.sobrenome}
                                />

                                <Select
                                    options={optionsSexo}
                                    value={sexo}
                                    label="Sexo"
                                    onChange={(selectedOption) => setSexo(selectedOption)}
                                    onBlur={(value) => onInputBlur("sexo", value)}
                                    errorMessage={errorMessage.sexo}
                                />
                            </Col>

                            <Col size={5}>
                                <FileInput fotoPerfil={fotoPerfil} onChange={handleProfilePictureChange} />
                            </Col>

                        </Row>

                        <Input
                            type="text"
                            label="CEP"
                            placeholder="CEP"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            onBlur={(value) => {
                                onInputBlur("cep", value);
                                fetchAddressByCEP(value);
                            }}
                            errorMessage={errorMessage.cep}
                        />
                        <Input
                            type="text"
                            label="Endereço"
                            placeholder="Endereço"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            onBlur={(value) => onInputBlur("endereco", value)}
                            errorMessage={errorMessage.endereco}
                        />

                        <InputPhone
                            label="Telefone"
                            placeholder="Telefone"
                            value={telefone}
                            onChange={setTelefone}
                            onBlur={(value) => onInputBlur("telefone", value)}
                            maxLength={15}
                            errorMessage={errorMessage.telefone}
                        />

                        <InputDate
                            value={dataAniversario}
                            onChange={(value) => setDataAniversario(value)}
                            placeholder="Data de Nascimento"
                            label="Data de Nascimento"
                            onBlur={(value) => onInputBlur("dataAniversario", value)}
                            errorMessage={errorMessage.dataAniversario}
                            age={true}
                        />

                        <Button type="submit" loading={isLoading}>
                            {isLoading ? 'Carregando...' : (contatoExistente ? 'Próximo' : 'Próximo')}
                        </Button>

                        {onCancel && <Button type="button" onClick={onCancel}>Cancelar</Button>}
                    </form>
                </>
            )}
        </div>
    );
};

export default FormContato;
