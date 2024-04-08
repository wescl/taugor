import { ref, push, get, child, update, remove, onValue } from "firebase/database";
import { db } from './firebase';

const adicionarHistorico = async (historico) => {
    try {
        const historicoRef = ref(db, 'historico');
        await push(historicoRef, historico);
        console.log("Historico adicionado com sucesso!");
    } catch (error) {
        console.error("Erro ao adicionar historico:", error);
    }
};

export { adicionarHistorico };
