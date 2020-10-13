<template>
  <v-app>
    <v-main> <ListPage /> </v-main>
  </v-app>
</template>

<script>
import ListPage from "./views/ListPage.vue";

export default {
  name: "App",
  components: { ListPage },
};
</script>
