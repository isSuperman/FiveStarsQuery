<template>
  <v-container>
    <v-row>
      <Header title="客户信息查询"></Header>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12">
        <CustomerQuery v-on:query_click="query_click" v-on:back_click="back_click"></CustomerQuery>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Header from "@/components/Header";
import CustomerQuery from "@/components/CustomerQuery";
export default {
  name: "Query",
  components: { Header, CustomerQuery },
  methods:{
      query_click: function(query_click){
          this.index = query_click
      },
      back_click: function(back_click){
          this.index = back_click
      }
  },
  data() {
    return {
      index: 0,
    };
  },
};
</script>