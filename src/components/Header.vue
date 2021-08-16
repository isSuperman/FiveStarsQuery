<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="display-1">{{title}}</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Header",
  props:{
      title: String
  },
  data() {
      return {
         
      }
  },
};
</script>