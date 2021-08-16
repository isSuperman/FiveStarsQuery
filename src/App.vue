<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h2>五星莊園信息查询系统 v2.0</h2>
      <v-spacer></v-spacer>
      <v-btn
        :color="btn.color"
        elevation="0"
        v-for="btn in btns"
        :key="btn.index"
        @click="routerTo(btn)"
      >
        <v-icon>mdi-{{ btn.icon }}</v-icon>
        <span>{{ btn.name }}</span>
      </v-btn>
    </v-app-bar>

    <!-- 根据应用组件来调整你的内容 -->
    <v-main>
      <!-- 给应用提供合适的间距 -->
      <v-container fluid>
        <!-- 如果使用 vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- <v-bottom-navigation horizontal color="primary"> </v-bottom-navigation> -->
  </v-app>
</template>

<script>
export default {
  methods: {
    routerTo: function (btn) {
      if (window.location.hash.slice(1) != btn.url) {
        if (this.$store.state.wb) {
          btn.color = "light-blue";
          for (const b of this.btns) {
            if (b.name != btn.name) {
              b.color = "primary";
            }
          }
          this.$router.push({
            path: btn.url,
          });
        } else {
          alert("请先读取数据");
        }
      }
    },
  },
  computed: {},
  mounted: function () {},
  data() {
    return {
      btns: [
        {
          url: "/",
          name: "统计面板",
          icon: "cable-data",
          color: "light-blue",
          active: true,
        },
        {
          url: "/query",
          name: "信息查询",
          icon: "account-search",
          color: "primary",
          active: true,
        },
        {
          url: "/normal_list",
          name: "正常车位",
          icon: "car-brake-parking",
          color: "primary",
          active: true,
        },
        {
          url: "/special_list",
          name: "特殊车位",
          icon: "car-brake-alert",
          color: "primary",
          active: true,
        },
        {
          url: "/chu",
          name: "储藏室",
          icon: "home-city-outline",
          color: "primary",
          active: true,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
</style>
