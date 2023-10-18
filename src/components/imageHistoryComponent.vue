<template>
    <a-space>
        <a-popover
            :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
            :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
            :style="{width: '370px'}"
            position="tr"
        >
            <a-button id="historyBtn" :style="{display: display, cursor: 'default'}" class="componentTheme zIndexHigh"
                      :shape="preferenceData.buttonShape"
                      size="large"
                      type="primary">
                <template #icon>
                    <icon-history />
                </template>
            </a-button>
            <template #title>
                <a-typography-text :style="{color: fontColor}">{{ "历史图片 " + imageArray.length + " / " + imageArrayMaxSize }}</a-typography-text>
            </template>
            <template #content>
                <a-row class="alignCenter">
                    <a-carousel indicator-type="line" animation-name="fade" :style="{width: '350px',height: '210px'}">
                        <a-carousel-item v-for="image in imageArray" :key="image.created_at">
                            <a-image
                                :src="image.urls.regular"
                                alt="图片加载失败"
                                height="210px"
                                width="350px"
                                :preview="false"
                                :style="{cursor: 'pointer'}"
                                @click="imageOnClick(image)"
                            >
                            </a-image>
                        </a-carousel-item>
                    </a-carousel>
                </a-row>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import {IconHistory} from "@arco-design/web-vue/es/icon";
import {defineProps, onMounted, ref, watch} from "vue";
import {changeThemeColor} from "../javascripts/publicFunctions";
import {defaultPreferenceData, unsplashUrl} from "../javascripts/publicConstants";
import {Message} from "@arco-design/web-vue";

const props = defineProps({
    display: {
        type: String,
        default: () => {
            return "none"
        },
        required: true
    },
    themeColor: {
        type: Object,
        default: () => {
            return {
                "themeColor": "",
                "componentBackgroundColor": "",
                "componentFontColor": ""
            }
        },
        required: true
    },
    preferenceData: {
        type: Object,
        required: true,
        default: () => {
            return defaultPreferenceData
        }
    }
});

let hoverColor = ref("");
let backgroundColor = ref("");
let fontColor = ref("");
let imageArray = ref([]);
let imageArrayMaxSize = ref(5);

onMounted(() => {
    // 获取缓存图片列表
    let imageArrayStorage = localStorage.getItem("imageArray");
    if(imageArrayStorage !== null) {
        imageArray.value = JSON.parse(imageArrayStorage);
    }
})

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        hoverColor.value = props.themeColor.themeColor;
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#historyBtn", backgroundColor.value, fontColor.value);
    }
})

function imageOnClick(image) {
    if(image.links.html) {
        window.open(image.links.html + unsplashUrl, '_blank');
    } else {
        Message.error("无跳转链接");
    }
}
</script>

<style scoped>

</style>