<template>
  <div v-if="visible" :class="['styleNotificationContainer', notificationClass]">
    <div class="styleNotificationContent">
      <font-awesome-icon :icon="['fas', iconType]" />
      <span>{{ message }}</span>
      <button @click="closeNotification" class="clearButtonHover">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 5000, // Duração padrão de 5 segundos
  },
  type: {
    type: String,
    default: '', // Tipo padrão de notificação
  },
});

const iconType = ref('');


console.log(iconType.value)

const visible = ref(true);

const closeNotification = () => {
  visible.value = false;
};

const notificationClass = computed(() => {
  if (props.type === 'error') {
    iconType.value = 'circle-exclamation'
  }
  if (props.type === 'success') {
    iconType.value = 'circle-check'
  }
  if (props.type === 'warning') {
    iconType.value = 'triangle-exclamation'
  }
  if (props.type === 'info') {
    iconType.value = 'circle-info'
  }
  else {
    iconType.value = 'circle-question'
  }
  return `notification-${props.type}`;
});

onMounted(() => {
  setTimeout(() => {
    closeNotification();
  }, props.duration);
});

watch(() => props.message, () => {
  visible.value = true;
  setTimeout(() => {
    closeNotification();
  }, props.duration);
});
</script>

<style scoped>
.styleNotificationContainer {
  @apply fixed top-5 right-5 max-w-xs p-4 text-white rounded-lg shadow-lg z-50;
  animation: slide-in-right 0.3s ease-in-out;
}

.styleNotificationContent {
  @apply flex justify-between items-center gap-2;
}


@keyframes slide-in-right {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.notification- {
  @apply bg-white
}

.notification-error {
  @apply bg-red-500;
}

.notification-success {
  @apply bg-green-500;
}

.notification-warning {
  @apply bg-yellow-500;
}

.notification-info {
  @apply bg-blue-500;
}
</style>
