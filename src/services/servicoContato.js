import { ref, push, get, child, update, remove, onValue } from "firebase/database";
import { db } from './firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const adicionarContato = async (novoContato) => {
    try {
        const contatosRef = ref(db, 'contatos');
        const novoContatoRef = await push(contatosRef, novoContato);
        const idDoDocumento = novoContatoRef.key;
        console.log("Contato adicionado com sucesso!");
        return idDoDocumento;
    } catch (error) {
        console.error("Erro ao adicionar contato:", error);
        throw error; 
    }
};

const enviarImagem = async (imagemFile) => {
    try {
        if (!imagemFile) {
            throw new Error("Nenhuma imagem fornecida.");
        }

        const storage = getStorage();
        const storageRef = storage.ref();
        const nomeArquivo = imagemFile.name;
        const arquivoRef = storageRef.child(nomeArquivo);
        const snapshot = await uploadBytes(arquivoRef, imagemFile);
        const url = await getDownloadURL(snapshot.ref);
        return url;
    } catch (error) {
        console.error("Erro ao enviar imagem para o armazenamento:", error);
        throw error;
    }
};

const buscarContatos = async (nome = null) => {
    try {
        const contatosRef = ref(db, 'contatos');
        const snapshot = await get(contatosRef);
        const contatos = [];
        snapshot.forEach((childSnapshot) => {
            const contato = { id: childSnapshot.key, ...childSnapshot.val() };
            if (!nome || contato.nome.toLowerCase().includes(nome.toLowerCase())) {
                contatos.push(contato);
            }
        });
        return contatos;
    } catch (error) {
        console.error("Erro ao buscar contatos:", error);
        return [];
    }
};

const listenToContatos = (setContatos) => {
    const contatosRef = ref(db, 'contatos');
    onValue(contatosRef, (snapshot) => {
        const contatos = [];
        snapshot.forEach((childSnapshot) => {
            contatos.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        setContatos(contatos);
    });
};

const buscarContatoPorId = async (contatoId) => {
    try {
        const contatoRef = ref(db, `contatos/${contatoId}`);
        const snapshot = await get(contatoRef);
        if (snapshot.exists()) {
            return { id: snapshot.key, ...snapshot.val() };
        } else {
            console.log("Contato não encontrado.");
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar contato:", error);
        return null;
    }
};

const atualizarContato = async (contatoId, novosDados) => {
    try {
        const contatoRef = ref(db, `contatos/${contatoId}`);
        await update(contatoRef, novosDados);
        console.log("Contato atualizado com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar contato:", error);
    }
};

const excluirContato = async (contatoId) => {
    try {
        const contatoRef = ref(db, `contatos/${contatoId}`);
        await remove(contatoRef);
        console.log("Contato excluído com sucesso!");
    } catch (error) {
        console.error("Erro ao excluir contato:", error);
    }
};

export { adicionarContato, enviarImagem, buscarContatos, listenToContatos, buscarContatoPorId, atualizarContato, excluirContato };
