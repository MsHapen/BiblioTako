import axios from 'axios';
export default class CategoriasApi {
  async buscarTodasAsCategorias() {
    const response = await axios.get('http://localhost:4000/categorias/');
    return response.data;
  }

  async buscarCategorias(id) {
    const response = await axios.get(`http://localhost:4000/categorias/${id}`);
    return response.data;
  }

  async adicionarCategorias(categorias) {
    const response = await axios.post('http://localhost:4000/categorias', categorias);
    return response.data;
  }

  async excluirCategoria(id) {
    const response = await axios.delete(`http://localhost:4000/categorias/${id}`);
    return response.data;
  }

  async atualizarAutores(autores) {
    const response = await axios.put(
      `http://localhost:4000/autores/${autores.id}`,
      autores,
    );
    return response.data;
  }
}