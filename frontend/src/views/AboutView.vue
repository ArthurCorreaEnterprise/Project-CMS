<template>
    <div>
        <h1>Cadastrar Blog</h1>
        <form @submit.prevent="submitForm">
            <div>
                <label for="title">Título:</label>
                <input type="text" id="title" v-model="blog.title" required />
            </div>
            <div>
                <label for="content">Conteúdo:</label>
                <QuillEditor v-model="blog.content" />
            </div>
            <div>
                <label for="cover">Imagem de Capa:</label>
                <input type="file" id="cover" @change="handleImageUpload" accept="image/*" required />
            </div>
            <div>
                <label for="category">Categoria:</label>
                <select id="category" v-model="blog.category_id" required>
                    <option value="" disabled>Selecione uma categoria</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>
            <button type="submit">Salvar Blog</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import QuillEditor from '../components/QuillEditor.vue';
import axios from 'axios';

const store = useStore();

const blog = ref({
    title: '',
    content: '',
    cover: null,
    category_id: null,
});

// Para armazenar as categorias
const categories = ref([]);

// Pega as categorias do banco de dados
const fetchCategories = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/categories/'); // Ajuste a URL conforme sua API
        categories.value = response.data;
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
    }
};

// Lida com o upload da imagem
const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        blog.value.cover = file; // Armazena a imagem no estado
    }
};

// Envia o formulário
const submitForm = async () => {
    try {
        const userId = store.state.user.id;
        if (!userId) {
            throw new Error('Usuário não autenticado');
        }

        console.log('Dados do blog:', blog.value);
        console.log('userId:', userId); // Adicionei esse log

        const formData = new FormData();
        formData.append('title', blog.value.title);
        formData.append('content', blog.value.content);
        formData.append('cover', blog.value.cover); // Adiciona a imagem ao FormData
        formData.append('category_id', blog.value.category_id);
        formData.append('user_id', userId);

        // Adicione um log para verificar o conteúdo do FormData
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const response = await axios.post('http://localhost:4000/api/blogs/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Importante para upload de arquivos
            },
        });

        console.log('Blog cadastrado com sucesso:', response.data);

        // Limpa o formulário após o envio
        blog.value.title = '';
        blog.value.content = '';
        blog.value.cover = null;
        blog.value.category_id = null;
    } catch (error) {
        console.error('Erro ao cadastrar blog:', error.response ? error.response.data : error.message);
    }
};

// Executa ao montar o componente
onMounted(() => {
    fetchCategories();
});
</script>

<style scoped>
/* Estilos para o formulário, se necessário */
</style>
