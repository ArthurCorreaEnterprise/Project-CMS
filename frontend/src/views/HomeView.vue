<template>
    <div class="home">
        <h1>Home</h1>

        <div v-if="isAuthenticated">
            <h2>Bem-vindo, {{ user.name }}!</h2>
            <p>Email: {{ user.email }}</p>
            <p>ID: {{ user.id }}</p>
        </div>

        <div v-else>
            <h2>Ninguém está logado no momento.</h2>
            <p>Por favor, faça login para acessar as funcionalidades restritas.</p>
        </div>

        <div>
            <h1>Lista de Blogs</h1>
            <div v-if="loading">Carregando blogs...</div>
            <div v-if="error">{{ error }}</div>
            <ul v-if="blogs.length > 0">
                <li v-for="blog in blogs" :key="blog.id">
                    <h2>{{ blog.title }}</h2>
                    <p>{{ blog.content }}</p>
                    <img :src="blog.cover" alt="Imagem de Capa" v-if="blog.cover" />
                    <p><strong>Categoria:</strong> {{ blog.category_id }}</p>
                </li>
            </ul>
            <div v-else>Não há blogs cadastrados.</div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

const store = useStore();
const blogs = ref([]);
const loading = ref(true);
const error = ref(null);

// Computed para verificar se alguém está autenticado e pegar os dados do usuário
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const user = computed(() => store.getters.getUser);

// Função para buscar os blogs
const fetchBlogs = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/blogs/'); // Ajuste a URL conforme sua API
        blogs.value = response.data;
    } catch (err) {
        error.value = 'Erro ao buscar blogs: ' + (err.response ? err.response.data.error : err.message);
    } finally {
        loading.value = false;
    }
};

// Executa a busca ao montar o componente
onMounted(fetchBlogs);
</script>

<style scoped>
.home {
    text-align: center;
    margin-top: 50px;
}

h1 {
    font-size: 2rem;
    margin-bottom: 20px;
}

h2 {
    font-size: 1.5rem;
    color: #42b983;
}

p {
    font-size: 1.1rem;
}

img {
    max-width: 100%;
    height: auto; /* Mantém a proporção da imagem */
}
</style>
