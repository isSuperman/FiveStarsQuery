<template>
    <v-card>
      <v-card-title>
        储藏室列表
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
    var chu_number = "B1#"; // 序号
    var chu_ceng = "__EMPTY"; //层数
    var chu_code = "__EMPTY_1"; //储藏室编号
    var chu_area = "__EMPTY_2"; //建筑面积
    var chu_danjia = "__EMPTY_3"; //单价
    var chu_zongjia = "__EMPTY_4"; //总价
    var chu_ower = "__EMPTY_5"; //姓名
    var chu_house_number = "__EMPTY_6"; //房号
    var chu_xieyi_number = "__EMPTY_7"; //协议号
    var chu_note = "__EMPTY_8"; //备注
    var allData = this.$store.state.wb;
    if (allData) {
      console.log("读取到了数据");
      var chu_sheet = XLSX.utils.sheet_to_json(
        allData.Sheets[allData.SheetNames[2]],
        { defval: "" }
      );
      for (const chu of chu_sheet) {
        if (chu[chu_code].indexOf("-") != -1) {
          this.desserts.push({
            number: chu[chu_number],
            ceng: chu[chu_ceng],
            code: chu[chu_code],
            area: chu[chu_area],
            danjia: chu[chu_danjia],
            zongjia: chu[chu_zongjia],
            name: chu[chu_ower],
            house_number: chu[chu_house_number],
            xieyi_number: chu[chu_xieyi_number],
            note: chu[chu_note],
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
        {
          text: "序号",
          align: "start",
          sortable: false,
          value: "number",
        },
        { text: "层", value: "ceng" },
        { text: "编号", value: "code" },
        { text: "面积", value: "area" },
        { text: "单价", value: "danjia" },
        { text: "总价", value: "zongjia" },
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