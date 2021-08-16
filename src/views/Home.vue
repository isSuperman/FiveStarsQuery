<template>
  <v-container>
    <v-row>
      <v-col cols="9">
        <Header title="数据统计面板"></Header>
      </v-col>
      <v-col cols="3">
        <v-file-input @change="importf" placeholder="选择数据源"></v-file-input>
      </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="6">
        <v-card elevation="2">
          <v-card-title>正常车位 {{ car.normal.sum }}</v-card-title>
          <v-card-text>
            已售 {{ car.normal.selled.sum }}
            <v-progress-linear
              :value="n_car_selled_percent"
              height="20"
              color="orange"
            ></v-progress-linear>
            库存 {{ car.normal.remain }}
            <v-progress-linear
              :value="n_car_remain_percent"
              height="20"
              color="green"
            ></v-progress-linear>
            <br />
            销售金额：￥{{ car.normal.money }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card elevation="2">
          <v-card-title>特殊车位 {{ car.special.sum }}</v-card-title>
          <v-card-text>
            已售 {{ car.special.selled.sum }}
            <v-progress-linear
              :value="s_car_selled_percent"
              height="20"
              color="orange"
            ></v-progress-linear>
            库存 {{ car.special.remain }}
            <v-progress-linear
              :value="s_car_remain_percent"
              height="20"
              color="green"
            ></v-progress-linear>
            <br />
            销售金额：￥{{ car.special.money }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title>储藏室 {{ chu.sum }}</v-card-title>
          <v-card-text>
            已售 {{ chu.selled.sum }}
            <v-progress-linear
              :value="chu_selled_percent"
              height="20"
              color="orange"
            ></v-progress-linear>
            剩余 {{ chu.remain }}
            <v-progress-linear
              :value="chu_remain_percent"
              height="20"
              color="green"
            ></v-progress-linear>
            <br />
            销售金额：￥{{ chu.money }}<br />
            赠送：{{ chu.zeng }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Header from "@/components/Header";
import XLSX from "xlsx";
var wb; //读取完成的数据
var rABS = false; //是否将文件读取为二进制字符串
export default {
  name: "Console",
  computed: {
    n_car_selled_percent: function () {
      return (this.car.normal.selled.sum / this.car.normal.sum) * 100;
    },
    n_car_remain_percent: function () {
      return (this.car.normal.remain / this.car.normal.sum) * 100;
    },
    s_car_selled_percent: function () {
      return (this.car.special.selled.sum / this.car.special.sum) * 100;
    },
    s_car_remain_percent: function () {
      return (this.car.special.remain / this.car.special.sum) * 100;
    },
    chu_selled_percent: function () {
      return (this.chu.selled.sum / this.chu.sum) * 100;
    },
    chu_remain_percent: function () {
      return (this.chu.remain / this.chu.sum) * 100;
    },
  },
  data: () => ({
    car: {
      normal: {
        sum: 0,
        selled: {
          sum: 0,
          percent: 0,
        },
        remain: 0,
        money: 0,
      },
      special: {
        sum: 0,
        selled: {
          sum: 0,
          percent: 0,
        },
        remain: 0,
        money: 0,
      },
    },
    chu: {
      sum: 0,
      selled: {
        sum: 0,
        percent: 0,
      },
      remain: 0,
      money: 0,
      zeng: 0,
    },
  }),
  mounted: function () {
    let allData = this.$store.state.wb;
    if (allData) {
      this.setData(allData)
    }
  },
  components: {
    Header,
  },
  methods: {
    importf: function (obj) {
      if (!obj) {
        location.reload();
        return;
      }
      var f = obj;
      var reader = new FileReader();
      reader.onload = (e) => {
        var data = e.target.result;
        if (rABS) {
          (wb = XLSX.read(this.fixdata(data))),
            {
              //手动转化
              type: "base64",
            };
        } else {
          wb = XLSX.read(data, {
            type: "binary",
          });
        }
        Object.assign(this.$data, this.$options.data())
        this.$store.commit("storeData", wb);
        let allData = this.$store.state.wb;
        this.setData(allData)
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    fixdata: function (data) {
      var o = "",
        l = 0,
        w = 10240;
      for (; l < data.byteLength / w; ++l)
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        );
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    },
    setData: function (allData) {
      //正常车位表
      var n_car_sheet = XLSX.utils.sheet_to_json(
        allData.Sheets[allData.SheetNames[0]],
        { defval: "" }
      );
      for (const n_car of n_car_sheet) {
        //计算总数
        if (n_car["车位号"].indexOf("-") != -1) {
          this.car.normal.sum += 1;
        }
        //计算已售
        if (n_car["房号"].indexOf("-") != -1 || n_car["姓名"]) {
          this.car.normal.selled.sum += 1;
        }
      }
      this.car.normal.remain = this.car.normal.sum - this.car.normal.selled.sum;
      //特殊车位表
      var s_car_sheet = XLSX.utils.sheet_to_json(
        allData.Sheets[allData.SheetNames[1]],
        { defval: "" }
      );
      for (const s_car of s_car_sheet) {
        //计算总数
        if (s_car["__EMPTY_2"].indexOf("-") != -1) {
          this.car.special.sum += 1;
        }
        //计算已售
        if (s_car["__EMPTY"].indexOf("-") != -1) {
          this.car.special.selled.sum += 1;
        }
      }
      this.car.special.remain =
        this.car.special.sum - this.car.special.selled.sum;
      //储藏室
      var chu_sheet = XLSX.utils.sheet_to_json(
        allData.Sheets[allData.SheetNames[2]],
        {
          defval: "",
        }
      );
      for (const chu of chu_sheet) {
        if (chu["__EMPTY_1"].indexOf("-") != -1) {
          this.chu.sum += 1;
        }
        if (chu["__EMPTY_6"]) {
          this.chu.selled.sum += 1;
        }
        var regPos = /^[0-9]+.?[0-9]*/; //判断是否是数字。

        if (regPos.test(Number(chu["__EMPTY_4"]))) {
          this.chu.money += Number(chu["__EMPTY_4"]);
        }
        if (chu["__EMPTY_8"].indexOf("赠送") != -1) {
          this.chu.zeng += 1;
        }
      }
      this.chu.remain = this.chu.sum - this.chu.selled.sum;
    },
  },
};
</script>
