<template>
    <nav class="style-00">
        <div class="style-01">
            <img class="logo" src="/svg/logo.svg" alt="Logo" />
            <div class="style-02">
                <RouterLink to="/" active-class="active">Home</RouterLink>
                <RouterLink to="/about" active-class="active">About</RouterLink>
                <RouterLink to="/categories" active-class="active">Categories</RouterLink>
                <RouterLink to="/contact" active-class="active">Contact</RouterLink>
            </div>
        </div>
        <div class="style-03">
            <font-awesome-icon class="style-04" :icon="['fas', 'magnifying-glass']" />
            <input type="search" id="search" placeholder="Quick Search" />
        </div>
        <div v-if="isAuthenticated" class="">
            <div>
                <button>
                    <font-awesome-icon :icon="['fas', 'bell']" />
                </button>
            </div>
            <div>
                <button @click="logout">Logout</button>
            </div>
            <div class="">
                <font-awesome-icon :icon="['fas', 'user']" />
            </div>
            <button class="">
                <font-awesome-icon :icon="['fas', 'plus']" />
                <div>Create</div>
            </button>
        </div>
        <div v-else class="style-05">
            <button class="BlueBorder">
                <RouterLink to="/signup">Sign Up</RouterLink>
            </button>
            <button class="Blue">
                <RouterLink to="/signin">Sign In</RouterLink>
            </button>
        </div>
    </nav>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters.isAuthenticated);

const logout = () => {
    store.dispatch('logout');
    router.push('/');
};
</script>

<style scoped>
.style-00 {
    @apply border-b flex justify-between items-center px-6 py-2 w-full;
    @apply border-gray-200
}

.style-01 {
    @apply border flex justify-between items-center gap-20;
}

.style-02 {
    @apply border flex justify-between items-center gap-10 font-bold;
    @apply text-gray-400;
}

.style-03 {
    @apply border relative flex justify-start items-center;
}

.style-04 {
    @apply border left-2 absolute;
    @apply text-gray-400
}

.style-05 {
    @apply border flex gap-2;
}

input {
    @apply pl-8 w-96;
    @apply bg-gray-200 border-gray-200
}

.active {
    @apply font-bold;
    @apply text-gray-500
}
</style>