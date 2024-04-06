import React from 'react';
import { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logoImage from '../assets/marca-taugor.png';
import './FuncionarioPDF.scss';
import { FaFilePdf } from 'react-icons/fa';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: 200,
    height: 'auto',
    margin: '20 auto',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 12,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const calcularIdade = (dataAniversario) => {
  const hoje = new Date();
  const aniversario = new Date(dataAniversario);
  let idade = hoje.getFullYear() - aniversario.getFullYear();
  const mesAtual = hoje.getMonth();
  const mesAniversario = aniversario.getMonth();

  if (mesAtual < mesAniversario || (mesAtual === mesAniversario && hoje.getDate() < aniversario.getDate())) {
    idade--;
  }

  return idade;
};

const FuncionarioViewer = ({ formData }) => {
  if (!formData || !formData.nome) {
    formData = { nome: "", sobrenome: "ㅤ" };
  }

  const idade = formData.dataAniversario ? calcularIdade(formData.dataAniversario) : '';

  return (
    <div className="page">
      <div className="section">
        <div className="imageContainer">
          <img src={logoImage} className="image" alt="Logo" />
        </div>
        <h1 className="heading">Informações de Contato</h1>
        <p className="text">Nome: {formData.nome + ' ' + formData.sobrenome}</p>
        <p className="text">Sexo: {formData.sexo}</p>
        <p className="text">Idade: {idade}</p>
        <p className="text">Data de Nascimento: {formData.dataAniversario}</p>
        <p className="text">Endereço: {formData.endereco}</p>
        <p className="text">Telefone: {formData.telefone}</p>
        <h1 className="heading">Informações de Funcionário</h1>
        <p className="text">Cargo: {formData.cargo}</p>
        <p className="text">Setor: {formData.setor}</p>
        <p className="text">Salário: {formData.salario}</p>
        <p className="text">Data de Admissão: {formData.dataAdmissao}</p>
      </div>
    </div>
  );
};

const FuncionarioPDF = ({ funcionario, contato }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} src={logoImage} />
        </View>
        <Text style={styles.heading}>Informações de Contato</Text>
        <Text style={styles.text}>Nome: {contato.nome}</Text>
        <Text style={styles.text}>Sexo: {contato.sexo}</Text>
        <Text style={styles.text}>Endereço: {contato.endereco}</Text>
        <Text style={styles.text}>Telefone: {contato.telefone}</Text>
        <Text style={styles.text}>Data de Aniversário: {contato.dataAniversario}</Text>
        <Text style={styles.heading}>Informações de Funcionário</Text>
        <Text style={styles.text}>Cargo: {funcionario.cargo}</Text>
        <Text style={styles.text}>Setor: {funcionario.setor}</Text>
        <Text style={styles.text}>Sálario: {funcionario.salario}</Text>
        <Text style={styles.text}>Data de Admissão: {funcionario.dataAdmissao}</Text>
      </View>
    </Page>
  </Document>
);

const FuncionarioPDFViewer = ({ funcionario, contato }) => (
  <PDFViewer width="100%" height="600px">
    <FuncionarioPDF funcionario={funcionario} contato={contato} />
  </PDFViewer>
);

export { FuncionarioPDFViewer, FuncionarioViewer };

export const handleDownloadPDF = (funcionario, contato) => (
  <PDFDownloadLink
    document={<FuncionarioPDF funcionario={funcionario} contato={contato} />}
    fileName={`Funcionario_${contato.nome}.pdf`}
  >
    {({ blob, url, loading, error }) => (
      <span className='download-btn'>
        {loading ? '...' : <FaFilePdf style={{ opacity: 0 }} />}
      </span>
    )}
  </PDFDownloadLink>
);

