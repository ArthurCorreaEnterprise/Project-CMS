import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowLeft,
  faArrowsRotate,
  faBell,
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faCircleQuestion,
  faEnvelope,
  faKey,
  faMagnifyingGlass,
  faMoon,
  faPlus,
  faRightFromBracket,
  faRightToBracket,
  faSun,
  faTriangleExclamation,
  faUser,
  faXmark
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faMagnifyingGlass,
  faRightFromBracket,
  faXmark,
  faEnvelope,
  faKey,
  faArrowLeft,
  faRightToBracket,
  faGoogle,
  faUser,
  faMoon,
  faSun,
  faArrowsRotate,
  faCircleExclamation,
  faCircleCheck,
  faTriangleExclamation,
  faCircleInfo,
  faCircleQuestion,
  faBell,
  faPlus
)

const app = createApp(App);

// Tenta fazer o auto-login sempre que o app for carregado
store.dispatch('tryAutoLogin');

app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router);
app.mount('#app');
