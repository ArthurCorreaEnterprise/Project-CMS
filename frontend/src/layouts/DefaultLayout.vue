<template>
    <NavBarCustom />
    <CookieConsentCustom />
    <router-view />
    <CopyrightNotice />
  </template>
  
  <script setup>
  import NavBarCustom from '../components/NavBarCustom.vue';
  import CookieConsentCustom from '../components/CookieConsentCustom.vue';
import CopyrightNotice from "../components/CopyrightNotice.vue";

  </script>
  