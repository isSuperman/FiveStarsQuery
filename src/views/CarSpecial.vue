<template>
    <v-card>
      <v-card-title>
        特殊车位列表
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="搜索"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
      ></v-data-table>
    </v-card>
</template>

<script>
import XLSX from "xlsx";

export default {
  name: "CarNormal",
  mounted: function () {
    // var s_car_number = "A型无障碍车位"; //序号
    var s_car_house_number = "__EMPTY"; //房号
    var s_car_ower = "__EMPTY_1"; //姓名
    var s_car_code = "__EMPTY_2"; //车位号
    var s_car_xieyi_number = "__EMPTY_3"; //协议号
    var s_car_leixing = "__EMPTY_4"; //车位类型
    var s_car_note = "__EMPTY_5"; //备注
    var allData = this.$store.state.wb;
    if (allData) {
      console.log("读取到了数据");
      var s_car_sheet = XLSX.utils.sheet_to_json(
        allData.Sheets[allData.SheetNames[1]],
        { defval: "" }
      );
      for (const scar of s_car_sheet) {
        if (scar[s_car_code].indexOf("-") != -1) {
          this.desserts.push({
            house_number: scar[s_car_house_number],
            name: scar[s_car_ower],
            car_code: scar[s_car_code],
            xieyi_number: scar[s_car_xieyi_number],
            leixing: scar[s_car_leixing],
            note: scar[s_car_note],
          });
        }
      }
    } else {
      console.log("未读取到数据");
    }
  },
  props: ["wb"],
  data() {
    return {
      search: "",
      headers: [
        { text: "车位号", value: "car_code" },
        { text: "姓名", value: "name" },
        {
          text: "房号",
          align: "start",
          sortable: false,
          value: "house_number",
        },
        { text: "协议号", value: "xieyi_number" },
        { text: "类型", value: "leixing" },
        { text: "备注", value: "note" },
      ],
      desserts: [],
    };
  },
};
</script>