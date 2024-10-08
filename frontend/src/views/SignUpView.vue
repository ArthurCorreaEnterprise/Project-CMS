<template>
  <div class="signup-container">
    <div class="signup-form-container">
      <div class="signup-logo">
        <RouterLink to="/">
          <img class="logo" src="/svg/logo.svg" alt="Logo" />
        </RouterLink>
      </div>
      <div class="signup-header">
        <span>Welcome to the SantaLucia blog</span>
        <p>Enter your credentials to create your account</p>
      </div>
      <div class="signup-header">
        <form class="signup-form" @submit.prevent="handleSubmit">
          <div class="signup-input-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="formData.name" placeholder="Enter your name" required />
          </div>
          <div class="signup-input-group">
            <label for="email">E-mail</label>
            <input :class="{ 'error': emailError }" type="email" id="email" v-model="formData.email"
              placeholder="Enter your email" required />
          </div>
          <div class="signup-input-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="formData.password" placeholder="Enter your password"
              required />
          </div>
          <div class="signup-input-group">
            <label for="confirmPassword">Confirm Password</label>
            <input :class="{ 'error': confirmPasswordError }" type="password" id="confirmPassword"
              v-model="formData.confirmPassword" placeholder="Confirm your password" required />
          </div>
          <div class="signup-checkbox">
            <input type="checkbox" id="privacyPolicy" v-model="formData.privacyPolicy" required />
            <label for="privacyPolicy">I agree to the</label>
            <a href="http://">Terms & Priavcy</a>
          </div>
          <button class="colorGreen model" type="submit" :disabled="isSubmitting">
            <div v-if="!isSubmitting">Sign Up</div>
            <div v-if="isSubmitting" class="signup-spinner">
              <font-awesome-icon :icon="['fas', 'arrows-rotate']" />
            </div>
          </button>
        </form>
        <NotificationCustom v-if="errorMessage" :message="errorMessage" :type="messageType" />
      </div>
      <div class="signup-footer">
        <p>Have an account ?</p>
        <RouterLink to="/signin">Sign In</RouterLink>
      </div>
    </div>
    <div class="signup-image"></div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import NotificationCustom from '../components/NotificationCustom.vue';

const router = useRouter();

const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  privacyPolicy: '',
  access_id: 1,
});

const errorMessage = ref('');
const messageType = ref('');
const confirmPasswordError = ref(false);
const emailError = ref(false);
const isSubmitting = ref(false);

const handleSubmit = async () => {
  errorMessage.value = '';
  messageType.value = '';
  confirmPasswordError.value = false;
  emailError.value = false;

  if (formData.password !== formData.confirmPassword) {
    errorMessage.value = 'Passwords do not match.';
    messageType.value = 'error';
    confirmPasswordError.value = true;
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await axios.post('http://localhost:4000/api/users/register', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      access_id: formData.access_id,
      privacyPolicy: formData.privacyPolicy,
    });

    errorMessage.value = 'User registered successfully!';
    messageType.value = 'success';
    router.push('/signin');
  } catch (error) {
    // console.error('Error registering user:', error);
    errorMessage.value = error.response.data.error;
    messageType.value = 'error';
    emailError.value = true;
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
  @apply text-2xl capitalize font-bold bg-clip-text text-transparent bg-gradient-to-r;
  @apply from-green-600 to-yellow-600;
}

.signup-container {
  @apply flex w-full h-screen fixed
}

.signup-form-container {
  @apply border flex justify-start items-center flex-col w-1/2 gap-2 p-2
}

.signup-logo {
  @apply w-3/4 flex
}


.signup-header {
  @apply border-b-2 pb-2 w-3/4;
  @apply border-green-600
}

.signup-form {
  @apply w-full flex flex-col gap-4;
}

.signup-input-group {
  @apply flex flex-col gap-2;
}

.signup-checkbox {
  @apply flex justify-start items-center gap-2;
}

.signup-footer {
  @apply flex justify-center items-center gap-2;
}

.signup-image {
  @apply w-1/2 bg-cover bg-center;
  background-image: url("/image/image-signup.jpg")
}

.signup-spinner {
  @apply animate-spin
}
</style>
