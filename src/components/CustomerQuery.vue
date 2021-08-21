<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-text-field
          label="请输入房号..."
          prepend-icon="mdi-map-marker"
          v-model="houseNumber"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-btn color="primary" block large @click="query">查 询</v-btn>
      </v-col>
    </v-row>

    <v-row v-show="showInfo" style="margin-top: -30px">
      <v-col cols="12">
        <v-card>
          <v-card-title>姓名：{{ name }}</v-card-title>
          <v-card-subtitle>档案号：</v-card-subtitle>
          <v-card-text>
            <v-col cols="12" v-show="car.length > 0">
              <v-subheader>车位</v-subheader>
              <v-divider></v-divider>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">车位号</th>
                      <th class="text-left">成交价</th>
                      <th class="text-left">协议号</th>
                      <th class="text-left">车位类型</th>
                      <th class="text-left">备注</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="c in car" :key="c.code">
                      <td>{{ c.code }}</td>
                      <td>{{ c.chengjiao }}</td>
                      <td>{{ c.xieyi_number }}</td>
                      <td>{{ c.leixing }}</td>
                      <td>{{ c.note }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
            <v-col cols="12" v-show="chu.length > 0">
              <v-subheader>储藏室</v-subheader>
              <v-divider></v-divider>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">储藏室编号</th>
                      <th class="text-left">建筑面积（㎡）</th>
                      <th class="text-left">单价（元）</th>
                      <th class="text-left">总价（元）</th>
                      <th class="text-left">优惠金额</th>
                      <th class="text-left">协议号</th>
                      <th class="text-left">备注</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="c in chu" :key="c.code">
                      <td>{{ c.code }}</td>
                      <td>{{ c.area }}</td>
                      <td>{{ c.danjia }}</td>
                      <td>{{ c.zongjia }}</td>
                      <td>{{ c.youhui }}</td>
                      <td>{{ c.xieyi_number }}</td>
                      <td>{{ c.note }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import XLSX from "xlsx";
// var n_car_number = "序号";
var n_car_code = "车位号";
var n_car_ower = "姓名";
var n_car_house_number = "房号";
var n_car_xieyi_number = "协议号";
var n_car_note = "备注";

// var s_car_number = "A型无障碍车位"; //序号
var s_car_house_number = "__EMPTY"; //房号
var s_car_ower = "__EMPTY_1"; //姓名
var s_car_code = "__EMPTY_2"; //车位号
var s_car_xieyi_number = "__EMPTY_3"; //协议号
var s_car_leixing = "__EMPTY_4"; //车位类型
var s_car_note = "__EMPTY_5"; //备注

// var chu_number = "B1#"; // 序号
// var chu_ceng = "__EMPTY"; //层数
var chu_code = "__EMPTY_1"; //储藏室编号
var chu_area = "__EMPTY_2"; //建筑面积
var chu_danjia = "__EMPTY_3"; //单价
var chu_zongjia = "__EMPTY_4"; //总价
var chu_ower = "__EMPTY_5"; //姓名
var chu_house_number = "__EMPTY_6"; //房号
var chu_xieyi_number = "__EMPTY_7"; //协议号
var chu_note = "__EMPTY_8"; //备注
export default {
  name: "CustomerQuery",
  components: {},
  computed: {},
  mounted: function () {},
  data: () => ({
    houseNumber: "",
    name: "",
    car: [],
    chu: [],
    showInfo: false,
  }),
  methods: {
    query: function () {
      var allData = this.$store.state.wb;
      if (this.houseNumber == "") {
        this.$store.state.infoMsg = "请输入房号！";
        this.$store.state.showInfo = true;

      } else {
        if (allData) {
          this.$store.state.infoMsg = "";
          this.$store.state.showInfo = false;
          let hn = this.houseNumber;
          Object.assign(this.$data, this.$options.data());
          this.houseNumber = hn;
          this.$emit("query_click", this.index);

          //正常车位表
          var n_car_sheet = XLSX.utils.sheet_to_json(
            allData.Sheets[allData.SheetNames[0]],
            { defval: "" }
          );
          //特殊车位表
          var s_car_sheet = XLSX.utils.sheet_to_json(
            allData.Sheets[allData.SheetNames[1]],
            { defval: "" }
          );
          //储藏室
          var chu_sheet = XLSX.utils.sheet_to_json(
            allData.Sheets[allData.SheetNames[2]],
            {
              defval: "",
            }
          );
          this.findName(n_car_sheet, s_car_sheet, chu_sheet);
        } else {
          this.$store.state.infoMsg = "请先读取数据源！";
          this.$store.state.showInfo = true;
          this.$router.push({
            path: "/",
          });
        }
      }
    },
    findName: function (n_car_sheet, s_car_sheet, chu_sheet) {
      if (!this.name) {
        for (const item of n_car_sheet) {
          if (this.houseNumber == item[n_car_house_number]) {
            this.name = item[n_car_ower];
            this.showInfo = true;
            console.log(this.name);
            console.log("success in n car");
          }
        }
      }
      if (!this.name) {
        for (const item1 of s_car_sheet) {
          if (this.houseNumber == item1[s_car_house_number]) {
            this.name = item1[s_car_ower];
            this.showInfo = true;
            console.log(this.name);
            console.log("success in s car");
          }
        }
      }
      if (!this.name) {
        for (const item2 of chu_sheet) {
          if (this.houseNumber == item2[chu_house_number]) {
            this.name = item2[chu_ower];
            this.showInfo = true;
            console.log(this.name);
            console.log("success in chu sheet");
          }
        }
      }
      if (!this.name) {
        this.$store.state.infoMsg = "没有找到相关记录！";
        this.$store.state.showInfo = true;
      }
      if (this.name) {
        this.findCar(n_car_sheet, s_car_sheet);
        this.findChu(chu_sheet);
      }
    },
    findCar: function (n_car_sheet, s_car_sheet) {
      for (const ncar of n_car_sheet) {
        if (this.houseNumber == ncar[n_car_house_number]) {
          this.car.push({
            code: ncar[n_car_code],
            chengjiao: 0,
            xieyi_number: ncar[n_car_xieyi_number],
            leixing: "正常车位",
            note: ncar[n_car_note],
          });
        }
      }
      for (const scar of s_car_sheet) {
        if (this.houseNumber == scar[s_car_house_number]) {
          this.car.push({
            code: scar[s_car_code],
            chengjiao: 0,
            xieyi_number: scar[s_car_xieyi_number],
            leixing: "特殊车位-" + scar[s_car_leixing],
            note: scar[s_car_note],
          });
        }
      }
    },
    findChu: function (chu_sheet) {
      for (const item of chu_sheet) {
        if (this.houseNumber == item[chu_house_number]) {
          this.chu.push({
            code: item[chu_code],
            area: item[chu_area],
            danjia: item[chu_danjia],
            zongjia: item[chu_zongjia],
            youhui: 0,
            xieyi_number: item[chu_xieyi_number],
            note: item[chu_note],
          });
        }
      }
    },
    resetData: function () {
      this.index = 0;
      this.$emit("back_click", this.index);
      this.showInfo = false;
      this.houseNumber = "";
    },
  },
};
</script>