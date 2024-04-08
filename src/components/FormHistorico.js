import React, { useEffect } from 'react';
import { adicionarHistorico } from '../services/serviceHistorico';
import { format } from 'date-fns'; 

function FormHistorico({ array, dadosFuncionario, funcionarioExistente }) {

    useEffect(() => {
        const salvarFuncionario = async () => {
            if (array && dadosFuncionario && dadosFuncionario.length > 0) {
                console.log(funcionarioExistente ? 11111111111111111 : 222222222222222);

                const type = funcionarioExistente ? true : false;

                const dataHoraAtual = format(new Date(), 'dd/MM/yyyy HH:mm:ss');

                const historico = {
                    type: type,
                    nome: array[0].nome,
                    sobrenome: array[0].sobrenome,
                    sexo: array[0].sexo,
                    endereco: array[0].endereco,
                    telefone: array[0].telefone,
                    foto: array[0].foto,
                    dataAniversario: array[0].dataAniversario,
                    uid: array[0].uid,
                    cargo: dadosFuncionario[0].cargo,
                    dataAdmissao: dadosFuncionario[0].dataAdmissao,
                    setor: dadosFuncionario[0].setor,
                    salario: dadosFuncionario[0].salario,
                    id_contato: dadosFuncionario[0].id_contato,
                    dataHora: dataHoraAtual
                };

                await adicionarHistorico(historico);
            }
        };

        salvarFuncionario();
    }, [array, dadosFuncionario]);

    return (
        <div>
            
        </div>
    );
};

export default FormHistorico;
