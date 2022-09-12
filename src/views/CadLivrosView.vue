<script>
import LivrosApi from "@/api/livros.js";
import AutoresApi from "@/api/autores.js";
import CategoriasApi from "@/api/categorias.js";
import EditorasApi from "@/api/editoras.js";
const livrosApi = new LivrosApi();
const autoresApi = new AutoresApi();
const categoriasApi = new CategoriasApi();
const editorasApi = new EditorasApi();
export default {
  data() {
    return {
      livro: {},
      livros: [],
      categoria: {},
      categorias: [],
      editora: {},
      editoras: [],
      autor: {},
      autores: [],
    };
  },
  async created() {
    this.livros = await livrosApi.buscarTodosOsLivros();
    this.autores = await autoresApi.buscarTodosOsAutores();
    this.categorias = await categoriasApi.buscarTodasAsCategorias();
    this.editoras = await editorasApi.buscarTodasAsEditoras();
  },
  methods: {
    async salvar() {
      if (this.livro.id) {
        await livrosApi.atualizarLivro(this.livro);
      } else {
        await livrosApi.adicionarLivro(this.livro);
      }
      this.livros = await livrosApi.buscarTodosOsLivros();
      this.categorias = await categoriasApi.buscarTodasAsCategorias();
      this.editoras = await editorasApi.buscarTodasAsEditoras();
      this.autores = await autoresApi.buscarTodosOsAutores();
      this.livro = {};
    },
    async excluir(livro) {
      await livrosApi.excluirLivro(livro.id);
      this.livros = await livrosApi.buscarTodosOsLivros();
    },
    editar(livro) {
      Object.assign(this.livro, livro);
    },
  },
};
</script>

<template>
  <main>
    <div class="container">
      <h1>Cadastro de Livros</h1>
      <div class="form-input">
        <input type="text" v-model="livro.titulo" placeholder="título" />
        <input type="text" v-model="livro.ISBN" placeholder="ISBN" />

        <select
          name="categoria"
          id="categoria"
          v-model="livro.categoria">
          <option class="disabled" value="" disabled selected>Categoria</option>
          <option value="Ficcão">Ficção</option>
          <option value="Fantasia">Fantasia</option>
          <option value="Filosofia">Filosofia</option>
          <option value="Biografia">Biografia</option>
        </select>


        <select name="editora" id="editora" v-model="livro.editora">
          <option value="" disabled selected>Editora</option>
          <option value="DarkSide">DarkSide</option>
          <option value="Moderna">Moderna</option>
          <option value="Draco">Draco</option>
          <option value="Arqueiro">Arqueiro</option>
          <option value="FTD">FTD</option>
        </select>
        <input
          type="number"
          id="quantidade"
          name="quantidade"
          placeholder="Quantidade"
          v-model="livro.quantidade"
        />
        <input
          type="number"
          id="dinheiro"
          name="dinheiro"
          placeholder="Preço em reais"
          v-model="livro.preco"
        />
        <button @click="salvar" id="save-btn">salvar</button>
      </div>
      <div class="list-books">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>ISBN</th>
              <th>Categoria</th>
              <th>Editora</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="livro in livros" :key="livro.id">
              <td>{{ livro.id }}</td>
              <td>{{ livro.titulo }}</td>
              <td>{{ livro.ISBN }}</td>
              <td>{{ livro.categoria }}</td>
              <td>{{ livro.editora }}</td>
              <td>{{ livro.quantidade }}</td>
              <td>{{ livro.preco }}</td>
              <td>
                <div class="edit-btn">
                  <button @click="editar(livro)">editar</button>
                  <button @click="excluir(livro)">excluir</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
