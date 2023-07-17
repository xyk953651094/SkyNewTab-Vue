<template>
  <a-layout class="popupLayout">
    <a-layout-content class="popupContent">
      <a-space>
        <a-image
            width="200px"
            alt="图片加载失败"
            :src="imagePreviewUrl"
            :style="{borderRadius: '10px'}"
        />
        <a-space direction="vertical">
          <a-button type="text" shape="round" :href="authorLink" target="_blank" :style="{color: fontColor}">
            <template #icon>
              <icon-user />
            </template>
            {{authorName}}
          </a-button>
          <a-button type="text" shape="round" :href="imageLink" target="_blank" :style="{color: fontColor}">
            <template #icon>
              <icon-location />
            </template>
            {{imageLocation}}
          </a-button>
          <a-button type="text" shape="round" :href="imageLink" target="_blank" :style="{color: fontColor}">
            <template #icon>
              <icon-info-circle />
            </template>
            {{imageDescription}}
          </a-button>
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
        </a-space>
      </a-space>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {IconUser, IconLocation, IconInfoCircle, IconGithub, IconMessage, IconGift} from "@arco-design/web-vue/es/icon";
import {Message} from "@arco-design/web-vue";
import {changeThemeColor, getComponentBackgroundColor, getFontColor, isEmptyString} from "../javascripts/publicFunctions";
import "../stylesheets/popupComponent.less"

let imageData = ref({});
let authorName = ref("暂无信息");
let authorLink = ref("");
// let authorIconUrl = ref("");
// let authorCollections = ref(0);
// let authorLikes = ref(0);
// let authorPhotos = ref(0);
let imageLink = ref("");
let imagePreviewUrl = ref("");
let imageLocation = ref("暂无信息");
let imageDescription = ref("暂无信息");
let imageColor = ref("");
let fontColor = ref("");

onMounted(() => {
  let tempImageData = localStorage.getItem("lastImage");
  if (tempImageData) {
    tempImageData = JSON.parse(tempImageData);

    imageData.value = tempImageData;
    authorName.value = imageData.value.user.name;
    authorLink.value = imageData.value.user.links.html;
    // authorIconUrl.value = imageData.value.user.profile_image.small;
    // authorCollections.value = imageData.value.user.total_collections;
    // authorLikes.value = imageData.value.user.total_likes;
    // authorPhotos.value = imageData.value.user.total_photos;
    imageLink.value = imageData.value.links.html;
    imagePreviewUrl.value = imageData.value.urls.thumb;
    imageLocation.value = isEmptyString(imageData.value.location.name)? "暂无信息" : imageData.value.location.name;
    imageDescription.value = isEmptyString(imageData.value.alt_description)? "暂无信息" : imageData.value.alt_description;
    imageColor.value = getComponentBackgroundColor(tempImageData.color);
    fontColor.value = getFontColor(getComponentBackgroundColor(tempImageData.color));

    changeThemeColor("body", imageColor.value, fontColor.value);
  }
  else {
    Message.error("暂无图片信息");
  }
})

</script>

<style scoped>

</style>