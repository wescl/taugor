import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { ref, get, onValue } from "firebase/database";
import './Historico.scss'
import Container from '../ui/Container';

function ListaHistorico() {
    const [historico, setHistorico] = useState([]);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        const carregarHistorico = async () => {
            try {
                const historicoRef = ref(db, 'historico');
                const snapshot = await get(historicoRef);
                if (snapshot.exists()) {
                    const historicoData = snapshot.val();
                    const historicoArray = Object.values(historicoData || []);
                    historicoArray.sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora));
                    setHistorico(historicoArray);
                } else {
                    setMensagem('Não há dados de histórico.');
                }
            } catch (error) {
                console.error("Erro ao carregar histórico:", error);
            }
        };

        carregarHistorico();

        const historicoRef = ref(db, 'historico');
        const listener = onValue(historicoRef, (snapshot) => {
            try {
                const historicoData = snapshot.val();
                const historicoArray = Object.values(historicoData || []);
                historicoArray.sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora));
                setHistorico(historicoArray);
            } catch (error) {
                console.error("Erro ao atualizar histórico em tempo real:", error);
            }
        });

        return () => {
            listener();
        };
    }, []);

    return (
        <Container>
            <div className='box-historico'>
                {mensagem && <h3>{mensagem}</h3>}
                {historico.length > 0 ? (
                    <ul>
                        {historico.map((item, index) => (
                            <li key={index}>
                                <h1>
                                    {item.type ? (
                                        "Edição de Funcionário "
                                    ) : (
                                        "Novo Funcionário "
                                    )}
                                    - {item.dataHora}
                                </h1>
                                <p>Nome: {item.nome} {item.sobrenome}</p>
                                <p>Sexo: {item.sexo}</p>
                                <p>Data de Admissão: {item.dataAdmissao}</p>
                                <p>Endereço: {item.endereco}</p>
                                <p>Telefone: {item.telefone}</p>
                                <p>Cargo: {item.cargo}</p>
                                <p>Setor: {item.setor}</p>
                                <p>Salário: {item.salario}</p>
                                <p>Data de Aniversário: {item.dataAniversario}</p>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        </Container>
    );
}

export default ListaHistorico;
