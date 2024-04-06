import React, { useEffect } from 'react';

function FormHistorico({ dados }) {
    useEffect(() => {
        if (dados) {
            console.log('Dados do novo contato:', dados);
        }
    }, [dados]);

    return (
        <div>
            
        </div>
    );
};

export default FormHistorico;
