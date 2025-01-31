<script setup lang="ts">
import { reactive } from "vue";
import { useTranslation, useValue } from "localiz/vue";
import HelloWorld from "./components/HelloWorld.vue";

const { i18n } = useTranslation();

const options = reactive({ name: "jhon doe" });
const helloValue = useValue("hello", options);

const onChangeLanguage = () => {
  i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
};

const onChangeName = () => {
  options.name = options.name === "jane doe" ? "jhon doe" : "jane doe";
};
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <p>{{ helloValue }}</p>
  <button @click="onChangeLanguage">change language</button>
  <button @click="onChangeName">change name</button>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
