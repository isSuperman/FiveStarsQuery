<template>
  <div>
    <v-alert type="warning">{{this.$store.state.infoMsg}}</v-alert>
  </div>
</template>

<script>
export default {
  name: "Alert",
};
</script>