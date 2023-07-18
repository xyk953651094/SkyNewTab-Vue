<template>
  <a-layout class="popupLayout">
    <a-layout-header class="popupHeader">
      <a-button type="text" shape="round" href="https://github.com/xyk953651094" target="_blank" :style="{color: fontColor, cursor: 'default'}">
        <template #icon>
          <icon-dashboard />
        </template>
        云开新标签页的仪表盘
      </a-button>
    </a-layout-header>
    <a-layout-content class="popupContent">
      <a-space direction="vertical">
        <popup-status-component :font-color="fontColor"/>
        <popup-image-component :image-data="imageData" :font-color="fontColor"/>
      </a-space>
    </a-layout-content>
    <a-layout-footer class="popupFooter">
      <a-space>
        <a-button type="text" shape="round" href="https://github.com/xyk953651094" target="_blank" :style="{color: fontColor}">
          <template #icon>
            <icon-github />
          </template>
          主页
        </a-button>
        <a-button type="text" shape="round" href="https://xyk953651094.blogspot.com" target="_blank" :style="{color: fontColor}">
          <template #icon>
            <icon-message />
          </template>
          博客
        </a-button>
        <a-button type="text" shape="round" href="https://afdian.net/a/xyk953651094" target="_blank" :style="{color: fontColor}">
          <template #icon>
            <icon-gift />
          </template>
          捐赠
        </a-button>
      </a-space>
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {IconDashboard, IconGithub, IconMessage, IconGift} from "@arco-design/web-vue/es/icon";
import {Message} from "@arco-design/web-vue";
import {getComponentBackgroundColor, getFontColor} from "../javascripts/publicFunctions";
import "../stylesheets/popupComponent.less"
import PopupImageComponent from "../popupComponents/popupImageComponent.vue";
import PopupStatusComponent from "../popupComponents/popupStatusComponent.vue";

const $ = require("jquery")

let imageData = ref({});
let backgroundColor = ref("");
let fontColor = ref("");

onMounted(() => {
  let tempImageData = localStorage.getItem("lastImage");
  if (tempImageData) {
    tempImageData = JSON.parse(tempImageData);

    imageData.value = tempImageData;
    backgroundColor.value = getComponentBackgroundColor(tempImageData.color);
    fontColor.value = getFontColor(getComponentBackgroundColor(tempImageData.color));

    $("body").css({"backgroundColor": backgroundColor.value});
  }
  else {
    Message.error("暂无图片信息");
  }
})

</script>

<style scoped>

</style>