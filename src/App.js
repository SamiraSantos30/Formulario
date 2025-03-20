import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";


const App = () => {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({
    endereco: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const [posts, setPosts] = useState([]);


  const handleCepBlur = async () => {
    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.data.erro) {
          setAddress({
            endereco: response.data.logradouro,
            bairro: response.data.bairro,
            cidade: response.data.localidade,
            estado: response.data.uf,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar endereço", error);
      }
    }
  };

  
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      setPosts(response.data.slice(0, 5)); 
    });
  }, []);

  return (
    <div className="conatainer">
      <h2 className="text-2xl font-bold mb-4">Cadastro de Endereço</h2>
      <div className="containerCep">
        <input
          type="text"
          placeholder="Digite o CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          onBlur={handleCepBlur}
        />
        <input type="text" placeholder="Endereço" value={address.endereco} readOnly />
        <input type="text" placeholder="Bairro" value={address.bairro} readOnly />
        <input type="text" placeholder="Cidade" value={address.cidade} readOnly />
        <input type="text" placeholder="Estado" value={address.estado} readOnly  />
      </div>

      <h3 className="text">Blog</h3>
      <div className="text1">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded shadow-md">
            <img
              src={`https://via.placeholder.com/600/${post.id * 100}`}
              alt="Post"
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h4 className="text-lg font-bold">{post.title}</h4>
            <p className="text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
