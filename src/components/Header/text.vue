<template>
  <div class="info-wrapper">
    <md-field v-if="vehicle">
      <h3 class="title">车辆信息</h3>
      <md-input-item
        type="text"
        readonly
        title="车牌号"
        class="disabled"
        :value="vehicle.plateNo"
      />
      <md-input-item
        type="text"
        title="车辆识别代号"
        name="vin"
        :value="vehicle.vin"
        :maxlength="17"
        clearable
        :error="error.vin"
        @change="changeValue"
        @blur="blurInput"
      />
      <md-input-item
        type="text"
        title="发动机号"
        :value="vehicle.engineNo"
        name="engineNo"
        clearable
        :error="error.engineNo"
        @change="changeValue"
        @blur="blurInput"
      />
      <md-input-item
        title="车主姓名"
        :value="vehicle.ownerName"
        name="ownerName"
        clearable
        :error="error.ownerName"
        @change="changeValue"
        @blur="blurInput"
      />
      <md-input-item
        title="车主身份证"
        :value="vehicle.ownerCertificateNo"
        name="ownerCertificateNo"
        clearable
        :error="error.ownerCertificateNo"
        @change="changeValue"
        @blur="blurInput"
      />
      <md-input-item
        title="注册日期"
        :value="vehicle.registerDate"
        name="registerDate"
        :error="error.registerDate"
        @focus="showDatePicker"
        @change="changeValue"
      />
      <div class="vehicle-item">
        <span class="title">车型</span>
        <div class="vehicle-model">
          {{ showEmptyVehicle ? "" : vehicle.vehicleModel }}
        </div>
        <div class="change-vehicle" @click="changeVehicle">
          {{ showEmptyVehicle ? "请选择车型" : "更换车型" }}
        </div>
      </div>
    </md-field>
    <md-field v-if="applicant" class="disabled-info">
      <h3 class="title">投保人信息</h3>
      <md-input-item
        title="投保人"
        :value="applicant.name"
        readonly
        class="disabled"
      />
      <md-input-item
        title="身份证号"
        :value="applicant.certificateNo"
        readonly
        class="disabled"
      />
    </md-field>
    <md-field v-if="insurant" class="disabled-info">
      <h3 class="title">被投保人信息</h3>
      <md-input-item
        title="被投保人"
        :value="insurant.name"
        readonly
        class="disabled"
      />
      <md-input-item
        title="身份证号"
        :value="insurant.certificateNo"
        readonly
        class="disabled"
      />
    </md-field>
    <md-date-picker
      ref="datePickerRef"
      v-model="isDatePickerShow"
      type="custom"
      title="选择出险时间"
      large-radius
      :custom-types="['yyyy', 'MM', 'dd']"
      :default-date="new Date()"
      @confirm="onDatePickerConfirm"
    ></md-date-picker>
  </div>
</template>
<script lang="ts">
import { InputItem, Field, DatePicker } from "mand-mobile";
import { defineComponent, reactive, ref } from "@vue/composition-api";
import { VehicleInfo } from "~/api/contract/type";
import validate from "@didi/mfe-utils/lib/validate";

interface IProps {
  vehicle: VehicleInfo;
  applicant: {
    name: string;
    certificateNo: string;
  };
  insurant: {
    name: string;
    certificateNo: string;
  };
}
export default defineComponent<IProps>({
  name: "QuotationUserInfo",
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [DatePicker.name]: DatePicker,
  },
  props: {
    vehicle: {
      type: Object,
      default: () => {},
    },
    applicant: {
      type: Object,
      default: () => {},
    },
    insurant: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["changeVehicle", "changeVehicleInfo"],
  setup(props, context) {
    const isDatePickerShow = ref(false);
    const datePickerRef = ref(null);
    const showEmptyVehicle = ref(false);
    const error = reactive({
      vin: "",
      engineNo: "",
      ownerName: "",
      ownerCertificateNo: "",
      registerDate: "",
    });

    const changeVehicle = () => {
      context.emit("changeVehicle");
    };

    const blurInput = (name: string) => {
      checkValue(name, props.vehicle[name]);
    };

    const changeValue = (key, value) => {
      if (key === "vin") {
        showEmptyVehicle.value = true;
      }
      checkValue(key, value);
      context.emit("changeVehicleInfo", { key, value });
    };

    // 投保之前字段信息验证
    const checkValue = (name: string, value: string) => {
      const regChinaName = /^[\u4E00-\u9FA5\uF900-\uFA2D]{2,5}$/;
      switch (name) {
        case "vin":
          error.vin = "";
          if (value.length < 17) {
            error.vin = "请填写完整且正确的vin码";
          }
          break;
        case "engineNo":
          error.engineNo = "";
          if (value.length < 6) {
            error.engineNo = "请填写正确的发动机号";
          }
          break;
        case "ownerCertificateNo":
          error.ownerCertificateNo = "";
          if (!validate.validateIdentity(value)) {
            error.ownerCertificateNo = "请填写完整且正确的身份证号";
          }
          break;
        case "ownerName":
          error.ownerName = "";
          if (!regChinaName.test(value)) {
            error.ownerName = "请输入正确的车主姓名，姓名必须为2-5个汉字";
          }
          break;
      }
    };
    const onDatePickerConfirm = (columnsValue) => {
      const value = columnsValue.map((item) => item.value).join("-");
      context.emit("changeVehicleInfo", { key: "registerDate", value });
    };
    const showDatePicker = () => {
      isDatePickerShow.value = true;
    };

    return {
      changeVehicle,
      changeValue,
      onDatePickerConfirm,
      showDatePicker,
      isDatePickerShow,
      datePickerRef,
      showEmptyVehicle,
      checkValue,
      error,
      blurInput,
    };
  },
});
</script>

