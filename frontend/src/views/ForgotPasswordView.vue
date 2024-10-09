<template>
    <div class="signin-container">
        <div class="signin-image"></div>
        <div class="signin-form-container">
            <div class="signin-header">
                <span>Forgot your password?</span>
                <p>Confirm the email to be able to reset the password</p>
            </div>
            <div class="signin-header">
                <form class="signin-form" @submit.prevent="handleSubmit">
                    <div class="signin-input-group">
                        <label for="email">E-mail</label>
                        <input :class="{ 'error': errorAuth }" type="email" id="email" v-model="formData.email"
                            placeholder="Enter your email" required />
                    </div>
                    <div class="signin-input-group">
                        <label for="code">Code</label>
                        <input :class="{ 'error': errorAuth }" type="number" id="code" v-model="formData.code"
                            placeholder="Enter your code" required />
                    </div>
                    <div class="signin-input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" v-model="formData.password"
                            placeholder="Enter your password" required />
                    </div>
                    <div class="signin-input-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <input :class="{ 'error': confirmPasswordError }" type="password" id="confirmPassword"
                            v-model="formData.confirmPassword" placeholder="Confirm your password" required />
                    </div>
                    <div class="signin-options">
                        <div class="signin-checkbox">
                            <input type="checkbox" id="rememberMe" v-model="formData.rememberMe" />
                            <label for="rememberMe">remember me</label>
                        </div>
                        <RouterLink class="" to="/forgotpassword">Forgot Password</RouterLink>
                    </div>
                    <button class="Green" type="submit" :disabled="isSubmitting">
                        <div v-if="!isSubmitting">Sign In</div>
                        <div v-if="isSubmitting" class="signin-spinner">
                            <font-awesome-icon :icon="['fas', 'arrows-rotate']" />
                        </div>
                    </button>
                </form>
                <NotificationCustom v-if="errorMessage" :message="errorMessage" :type="messageType" />
            </div>
            <div class="signin-footer">
                <p>Remembered the password ?</p>
                <RouterLink to="/signin">Sign In</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import NotificationCustom from '../components/NotificationCustom.vue';

const store = useStore();
const router = useRouter();

const formData = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    code: '',
});

const errorMessage = ref('');
const messageType = ref('');
const errorAuth = ref(false);
const isSubmitting = ref(false);
const confirmPasswordError = ref(false);


const handleSubmit = async () => {
    errorMessage.value = '';
    messageType.value = '';
    errorAuth.value = false;

    try {
        await store.dispatch('login', {
            email: formData.email,
            password: formData.password,
            rememberMe: formData.rememberMe,
        });
        errorMessage.value = 'Authentication successful!';
        messageType.value = 'success';
        router.push('/');
    } catch (error) {
        // console.error('Error registering user:', error);
        errorMessage.value = 'Incorrect password or email';
        messageType.value = 'error';
        errorAuth.value = true;
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style scoped>
a {
    @apply underline font-semibold;
    @apply text-blue-700;
}

span {
    @apply text-4xl capitalize font-bold bg-clip-text text-transparent bg-gradient-to-r;
    @apply from-green-600 to-yellow-600;
}

.signin-container {
    @apply flex w-full h-screen fixed
}

.signin-form-container {
    @apply border flex justify-center items-center flex-col w-1/2 gap-2 p-2
}

.signin-header {
    @apply border-b-2 pb-4 w-3/4;
    @apply border-green-600
}

.signin-options {
    @apply flex justify-between items-center w-full;
}

.signin-form {
    @apply w-full flex flex-col gap-4;
}

.signin-input-group {
    @apply flex flex-col gap-2;
}

.signin-checkbox {
    @apply flex justify-start items-center gap-2;
}

.signin-footer {
    @apply flex justify-center items-center gap-2;
}

.signin-image {
    @apply w-1/2 bg-cover bg-center;
    background-image: url("/image/image-forgotpassword.jpg")
}

.signin-spinner {
    @apply animate-spin
}
</style>
