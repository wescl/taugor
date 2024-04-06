import { ref, push, get, child, update, remove, onValue } from "firebase/database";
import { db } from './firebase';

const adicionarFuncionario = async (novoFuncionario) => {
    try {
        const funcionariosRef = ref(db, 'funcionarios');
        await push(funcionariosRef, novoFuncionario);
        console.log("Funcionário adicionado com sucesso!");
    } catch (error) {
        console.error("Erro ao adicionar funcionário:", error);
    }
};

const buscarFuncionarios = async () => {
    try {
        const funcionariosRef = ref(db, 'funcionarios');
        const snapshot = await get(funcionariosRef);
        const funcionarios = [];
        snapshot.forEach((childSnapshot) => {
            funcionarios.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        return funcionarios;
    } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
        return [];
    }
};

const listenToFuncionarios = (setFuncionarios) => {
    const funcionariosRef = ref(db, 'funcionarios');
    onValue(funcionariosRef, (snapshot) => {
        const funcionarios = [];
        snapshot.forEach((childSnapshot) => {
            funcionarios.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        setFuncionarios(funcionarios);
    });
};

const buscarFuncionarioPorId = async (funcionarioId) => {
    try {
        const funcionarioRef = ref(db, `funcionarios/${funcionarioId}`);
        const snapshot = await get(funcionarioRef);
        if (snapshot.exists()) {
            return { id: snapshot.key, ...snapshot.val() };
        } else {
            console.log("Funcionário não encontrado.");
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar funcionário:", error);
        return null;
    }
};

const atualizarFuncionario = async (funcionarioId, novosDados) => {
    try {
        const funcionarioRef = ref(db, `funcionarios/${funcionarioId}`);
        await update(funcionarioRef, novosDados);
        console.log("Funcionário atualizado com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar funcionário:", error);
    }
};

const excluirFuncionario = async (funcionarioId) => {
    try {
        const funcionarioRef = ref(db, `funcionarios/${funcionarioId}`);
        await remove(funcionarioRef);
        console.log("Funcionário excluído com sucesso!");
    } catch (error) {
        console.error("Erro ao excluir funcionário:", error);
    }
};

export { adicionarFuncionario, buscarFuncionarios, listenToFuncionarios, buscarFuncionarioPorId, atualizarFuncionario, excluirFuncionario };
