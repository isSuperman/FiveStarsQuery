<template>
    <v-card>
      <v-card-title>
        正常车位列表
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
    var n_car_number = "序号";
    var n_car_code = "车位号";
    var n_car_ower = "姓名";
    var n_car_house_number = "房号";
    var n_car_xieyi_number = "协议号";
    var n_car_note = "备注";
    var allData = this.$store.state.wb;
    if (allData) {
      console.log("读取到了数据");
      var n_car_sheet = XLSX.utils.sheet_to_json(
        allData.Sheets[allData.SheetNames[0]],
        { defval: "" }
      );
      for (const ncar of n_car_sheet) {
        this.desserts.push({
          number: ncar[n_car_number],
          ncar_number: ncar[n_car_code],
          name: ncar[n_car_ower],
          house_number: ncar[n_car_house_number],
          xieyi_number: ncar[n_car_xieyi_number],
          note: ncar[n_car_note],
        });
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
        {
          text: "序号",
          align: "start",
          sortable: false,
          value: "number",
        },
        { text: "车位号", value: "ncar_number" },
        { text: "姓名", value: "name" },
        { text: "房号", value: "house_number" },
        { text: "协议号", value: "xieyi_number" },
        { text: "备注", value: "note" },
      ],
      desserts: [],
    };
  },
};
</script>