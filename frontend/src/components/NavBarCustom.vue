<template>
    <nav class="style-00">
        <div class="style-02">
            <img class="logo" src="/svg/logo.svg" alt="Logo" />
            <div class="style-01">
                <RouterLink to="/" active-class="active">Home</RouterLink>
                <RouterLink to="/about" active-class="active">About</RouterLink>
                <RouterLink to="/categories" active-class="active">Categories</RouterLink>
                <RouterLink to="/contact" active-class="active">Contact</RouterLink>
            </div>
        </div>
        <div class="">
            <label for="email">Search</label>
            <input type="email" id="email" v-model="formData.email"
              placeholder="Enter your email" required />
          </div>
        <div v-if="isAuthenticated" class="style-01">
            <div>
                <button>
                    <font-awesome-icon :icon="['fas', 'bell']" />
                </button>
            </div>
            <div>
                <button @click="logout">Logout</button>
            </div>
            <div class="style-03"></div>
            <button class="style-04 colorGreen model">
                <font-awesome-icon :icon="['fas', 'plus']" />
                <div>Create</div>
            </button>
        </div>
        <div v-else class="style-01">
            <RouterLink to="/signin">Sign In</RouterLink>
            <RouterLink to="/signup">Sign Up</RouterLink>
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
    @apply border flex justify-between items-center py-2 px-6
}

.style-01 {
    @apply border flex justify-between items-center w-full font-semibold
}

.style-02 {
    @apply border flex justify-between items-center gap-10 w-full
}

.style-03 {
    @apply size-10 rounded-full bg-cover bg-center;
    background-image: url("/image/image-profile.jpg")
}

.style-04 {
    @apply flex justify-center items-center gap-2 ;
}

span {
    @apply text-2xl capitalize font-bold bg-clip-text text-transparent bg-gradient-to-r;
    @apply from-green-600 to-yellow-600;
}
</style>