<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
       <h3>Word Counter</h3>
      </div>

    </v-app-bar>

    <v-main>
      <Editor></Editor>
    </v-main>
  </v-app>
</template>

<script>

import Editor from "./components/Editor";

export default {
  name: 'App',

  components: {
    Editor,
  },

  data: () => ({
    //
  }),
};
</script>
