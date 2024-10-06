<template>
    <div class="quill-editor-container">
      <div ref="editor" class="quill-editor" />
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import Quill from 'quill';
  import 'quill/dist/quill.snow.css';
  
  // Define the emits
  const emit = defineEmits();
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  });
  
  const editor = ref(null);
  const quill = ref(null);
  
  onMounted(() => {
    quill.value = new Quill(editor.value, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          ['link', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'], // Remove formatting button
        ],
      },
    });
  
    // Set the initial content
    quill.value.root.innerHTML = props.modelValue;
  
    // Emit the value when the content changes
    quill.value.on('text-change', () => {
      const content = quill.value.root.innerHTML;
      emit('update:modelValue', content);
    });
  });
  
  // Watch for changes to the modelValue prop
  watch(
    () => props.modelValue,
    (newValue) => {
      if (quill.value.root.innerHTML !== newValue) {
        quill.value.root.innerHTML = newValue;
      }
    }
  );
  </script>
  
  <style scoped>
  .quill-editor-container {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    min-height: 200px; /* Ajuste conforme necessário */
  }
  .quill-editor {
    height: 100%;
  }
  </style>
  