<template>
    <a-space>
        <a-tooltip content="偏好设置" position="tr" :background-color="backgroundColor" :content-style="{color: fontColor}">
            <a-button type="primary" shape="round" size="large" id="buttonPreference" class="componentTheme zIndexHigh" @click="onclick">
                <template #icon>
                    <icon-more-vertical />
                </template>
            </a-button>
            <a-drawer
                :width="340"
                :height="500"
                :visible="visible"
                :placement="drawerPosition"
                :drawer-style="{
                    backgroundColor: backgroundColor,
                    color: fontColor
                }"
                @ok="handleOk"
                @cancel="handleCancel"
                unmountOnClose
            >
                <template #title>
                    {{"菜单栏"}}
                </template>
                <a-row :gutter="[16, 16]">
                    <a-col :span="24">
                        <a-card title="偏好设置" size="small" >
                            <template #extra>
                                <icon-settings />
                            </template>
                            <a-form layout="vertical" :model="formInitialValues" auto-label-width>
                                <a-form-item field="searchEngineRadio" label="搜索引擎">
                                    <a-radio-group v-model="formInitialValues.searchEngineRadio" @change="searchEngineRadioOnChange">
                                        <a-radio value="bing">必应</a-radio>
                                        <a-radio value="baidu">百度</a-radio>
                                        <a-radio value="google">谷歌</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                                <a-form-item field="dynamicEffectRadio" label="图片动效（推荐选择全部）">
                                    <a-radio-group v-model="formInitialValues.dynamicEffectRadio" @change="dynamicEffectRadioOnChange">
                                        <a-radio value="close">关闭</a-radio>
                                        <a-radio value="translate">平移</a-radio>
                                        <a-radio value="rotate">旋转</a-radio>
                                        <a-radio value="all">全部</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                                <a-form-item field="imageSourceRadio" label="图片来源">
                                    <a-radio-group v-model="formInitialValues.imageSourceRadio" @change="imageSourceRadioOnChange">
                                        <a-radio value="Unsplash">Unsplash</a-radio>
                                        <a-radio value="Pexels">Pexels</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                            </a-form>
                        </a-card>
                    </a-col>
                    <a-col :span="24">
                        <a-card title="网站链接" size="small" >
                            <template #extra>
                                <icon-link />
                            </template>
                            <a-list size="small" :bordered="false">
                                <a-list-item><a-link href="https://unsplash.com/" target="_blank">Unsplash.com</a-link></a-list-item>
                                <a-list-item><a-link href="https://www.pexels.com/" target="_blank">Pexels.com</a-link></a-list-item>
                                <a-list-item><a-link href="https://pixabay.com/" target="_blank">Pixabay.com</a-link></a-list-item>
                            </a-list>
                        </a-card>
                    </a-col>
                </a-row>
                <template #footer>
                    <a-button type="text" href="https://github.com/xyk953651094" target="_blank">
                        <template #icon>
                            <icon-github />
                        </template>
                        作者主页
                    </a-button>
                </template>
            </a-drawer>
        </a-tooltip>
    </a-space>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {IconMoreVertical, IconSettings, IconLink} from "@arco-design/web-vue/es/icon";
import {changeThemeColor} from "../javascripts/publicFunctions";
import {Message} from "@arco-design/web-vue";
import {device} from "../javascripts/publicConstants";
const $ = require("jquery");

let visible = ref(false);
let drawerPosition = ref("right");
let backgroundColor = ref("");
let fontColor = ref("");
let formInitialValues = ref({
    searchEngineRadio: "bing",
    dynamicEffectRadio: "all",
    imageSourceRadio: "Unsplash",
})

const props = defineProps({
    themeColor: {
        type: Object,
        required: true,
        default: ()=> {
            return {
                "componentBackgroundColor": "",
                "componentFontColor": ""
            }
        }
    }
});

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#buttonPreference", backgroundColor.value, fontColor.value);
    }
})

onMounted(() => {
    // 初始化偏好设置
    let tempSearchEngineRadio = localStorage.getItem("searchEngine");
    let tempDynamicEffectRadio = localStorage.getItem("dynamicEffect");
    let tempImageSourceRadio = localStorage.getItem("imageSource");

    formInitialValues.value =  {
        searchEngineRadio: tempSearchEngineRadio === null ? "bing" : tempSearchEngineRadio,
        dynamicEffectRadio: tempDynamicEffectRadio === null ? "all" : tempDynamicEffectRadio,
        imageSourceRadio: tempImageSourceRadio === null ? "Unsplash": tempImageSourceRadio,
    }

    // 屏幕适配
    if(device === "iPhone" || device === "Android") {
        drawerPosition.value = "bottom";
    }

    // 修改各类弹窗样式
    $("body").bind("DOMNodeInserted", () => {
        // popover
        let popoverEle = $(".arco-popover");
        if (popoverEle.length && popoverEle.length > 0) {
            $(".arco-popover-title").css("color", fontColor.value);
            $(".arco-popover-popup-arrow").css({"backgroundColor": backgroundColor.value, border: "1px solid " + backgroundColor.value});
        }

        // message
        let messageEle = $(".arco-message");
        if(messageEle.length && messageEle.length > 0) {
            messageEle.css({"backgroundColor": backgroundColor.value, "border-color": backgroundColor.value});
            $(".arco-message-icon").css("color", fontColor.value);
            $(".arco-message-content").css("color", fontColor.value);
        }

        // drawer
        let drawerEle = $(".arco-drawer");
        if (drawerEle.length && drawerEle.length > 0) {
            $(".arco-drawer-close-btn").css("color", fontColor.value);
            $(".arco-drawer-title").css("color", fontColor.value);
            $(".arco-card").css("border", "1px solid " + fontColor.value);
            $(".arco-card-header").css({"backgroundColor": backgroundColor.value, "borderBottom": "1px solid " + fontColor.value});
            $(".arco-card-header-title").css("color", fontColor.value);
            $(".arco-card-header-extra").css("color", fontColor.value);
            $(".arco-card-body").css("backgroundColor", backgroundColor.value);
            $(".arco-typography").css("color", fontColor.value);
            $(".arco-form-item-label").css("color", fontColor.value);
            $(".arco-radio-label").css("color", fontColor.value);
            $(".arco-checkbox-label").css("color", fontColor.value);
            $(".arco-collapse-item-header").css({"backgroundColor": backgroundColor.value, "color": fontColor.value});
            $(".arco-collapse-item-content").css({"backgroundColor": backgroundColor.value, "color": fontColor.value});
            $(".arco-list-item-meta-title").css("color", fontColor.value);
            $(".arco-drawer-footer").css("textAlign", "center");
            $(".arco-drawer-footer > .arco-btn").css("marginLeft", 0);
        }
    });
})

const onclick = () => {
    visible.value = true;
};

const handleOk = () => {
    visible.value = false;
};

const handleCancel = () => {
    visible.value = false;
}

const emit = defineEmits(["searchEngine", "dynamicEffect","imageSource"]);

// 搜索引擎
const searchEngineRadioOnChange = (value) => {
    emit("searchEngine", value);
    localStorage.setItem("searchEngine", value);
    Message.success("已更换搜索引擎");
}

// 动效样式
const dynamicEffectRadioOnChange = (value) => {
    emit("dynamicEffect", value);
    localStorage.setItem("dynamicEffect", value);
    Message.success("已更换显示效果");
}

// 搜索引擎
const imageSourceRadioOnChange = (value) => {
    emit("imageSource", value);
    localStorage.setItem("imageSource", value);
    Message.success("已更换图片来源");
    localStorage.removeItem("lastImageRequestTime");
    window.location.reload();
}

</script>

<style scoped>

</style>