import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importando o hook useNavigate
import '../pages/registroRetDev.css'; // Certifique-se de que o caminho está correto
import axios from 'axios';

const RegistrarRetDev = () => {
    const { id } = useParams()
    const [epiId, setEpiId] = useState(id);
    const [user, setUser] = useState({ funcionario: '', dataMovimentacao: "", tipoMovimento: "" })
    const [historico, setHistorico] = useState([])

    // Carregar o ID do EPI e o histórico no carregamento do componente

    const listaMovimentacao = async () => {
        const response = await axios.get("http://localhost:3000/listarMovimentacao")
        setHistorico(response.data.movimentacoes)
    }


    const navigate = useNavigate();

    // Função para registrar movimentações
    const registrarMovimentacao = async () => {

        try {
            const novoHistorico =
            {
                ...historico,
                epiId: epiId,
                funcionarioId: user.funcionario,
                data: user.dataMovimentacao,
                tipo: user.tipoMovimento,
            };

            await axios.post("http://localhost:3000/cadastrarMovimentacao", novoHistorico)
            listaMovimentacao()
        } catch (e) {
            console.log(e)
        }
    };

    // Constante para limpar o histórico
    const limparHistorico = () => {
        // Remove o histórico de retiradas do localStorage
        localStorage.removeItem('historicoRetiradas');

        // Atualiza o estado do histórico para limpar a exibição na página
        setHistorico([]);
    };

    useEffect(() => { listaMovimentacao() }, []);

    // Função para navegar para a página de cadastro de funcionário
    const irParaInfo = () => {
        navigate('/info'); // Substitua pelo caminho correto
    };


    return (
        <div>
            <h1>Cadastro de Retirada ou Devolução</h1>
            <div className="container">
                <div className="form-group">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            registrarMovimentacao();
                        }}
                    >
                        <div>
                            <label>ID do EPI:</label>
                            <input
                                type="text"
                                value={epiId}
                                disabled
                            />
                        </div>
                        <div>
                            <label>Funcionário:</label>
                            <input
                                id='idFun'
                                type="text"
                                value={user.funcionario}
                                onChange={(e) => setUser({ ...user, funcionario: e.target.value })}
                                placeholder="Nome do funcionário"
                            />
                        </div>
                        <div>
                            <label>Data:</label>
                            <input
                                id='data'
                                type="text"
                                value={user.dataMovimentacao}
                                onChange={(e) => setUser({ ...user, dataMovimentacao: e.target.value })}
                                placeholder="Data"
                            />
                        </div>

                        <div>
                            <label>Tipo de Movimento:</label>
                            <select
                                id='Tipo'
                                value={user.tipoMovimento}
                                onChange={(e) => setUser({ ...user, tipoMovimento: e.target.value })}
                            >
                                <option value="">Selecione</option>
                                <option value="retirada">Retirada</option>
                                <option value="devolução">Devolução</option>
                            </select>
                        </div>
                        <button id='RegistrarHistórico' type="submit">Registrar</button>
                    </form>
                </div>
                <div className="historico-container">
                    <h2>Histórico de Movimentações</h2>
                    <div>
                        {historico.length > 0 ? (
                            historico.map((item, index) => (
                                <div key={index} className="historico-item">
                                    <span>
                                        {item.data} | Funcionário {item.funcionario} realizou {item.tipo} do EPI (ID: {item.epiId})
                                    </span>
                                </div>
                            ))
                        ) : (
                            <span>Nenhuma movimentação registrada.</span>
                        )}

                        <button id='limpar' onClick={limparHistorico}>Limpar Histórico</button>


                        <button id="irParaInfo" onClick={(irParaInfo)}>
                            Informações
                        </button>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrarRetDev;
