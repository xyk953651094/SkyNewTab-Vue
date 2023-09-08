<template>
    <a-card :body-style="{backgroundColor: backgroundColor}"
            :header-style="{backgroundColor: backgroundColor, borderBottom: '1px solid ' + fontColor}"
            :style="{border: '1px solid' + fontColor}"
            size="small"
            title="功能设置"
    >
        <template #extra>
            <icon-settings/>
        </template>
        <a-form :model="preferenceData" auto-label-width>
            <a-form-item field="searchEngine" label="搜索引擎">
                <a-radio-group v-model="preferenceData.searchEngine"
                               @change="searchEngineRadioOnChange">
                    <a-row>
                        <a-col :span="12">
                            <a-radio value="baidu">Baidu</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="bing">Bing</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="google">Google</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="yandex">Yandex</a-radio>
                        </a-col>
                    </a-row>
                </a-radio-group>
            </a-form-item>
            <a-form-item field="simpleMode" label="简洁模式">
                <a-switch v-model="preferenceData.simpleMode" @change="simpleModeSwitchOnChange">
                    <template #checked>
                        已开启
                    </template>
                    <template #unchecked>
                        已关闭
                    </template>
                </a-switch>
            </a-form-item>
            <a-form-item field="noImageMode" label="无图模式">
                <a-switch v-model="preferenceData.noImageMode" @change="noImageModeSwitchOnChange">
                    <template #checked>
                        已开启
                    </template>
                    <template #unchecked>
                        已关闭
                    </template>
                </a-switch>
            </a-form-item>
            <a-form-item field="clearStorageButton" label="危险设置">
                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                          :style="{color: fontColor}" shape="round"
                          type="text" @click="clearStorageBtnOnClick"
                >
                    <template #icon>
                        <icon-delete/>
                    </template>
                    清空并重置所有内容
                </a-button>
            </a-form-item>
            <a-form-item label="提示信息">
                <a-typography-paragraph>
                    <ol>
                        <a-space direction="vertical">
                            <li>清空并重置所有内容将删除所有缓存，插件出现问题时可尝试此按钮</li>
                        </a-space>
                    </ol>
                </a-typography-paragraph>
            </a-form-item>
        </a-form>
    </a-card>
</template>

<script setup>
import {IconSettings, IconDelete} from "@arco-design/web-vue/es/icon";
import {getFontColor, isEmptyString} from "../javascripts/publicFunctions";
import {defineProps, onMounted, ref} from "vue";
import {defaultPreferenceData} from "../javascripts/publicConstants";
import {Message} from "@arco-design/web-vue";

let preferenceData = ref(defaultPreferenceData);
let disableImageTopic = ref(false);

const props = defineProps({
    hoverColor: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    },
    backgroundColor: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    },
    fontColor: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    }
});

const emit = defineEmits(["preferenceData"]);

onMounted(() => {
    // 初始化偏好设置
    let tempPreferenceData = localStorage.getItem("preferenceData");
    if (tempPreferenceData === null) {
        localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        preferenceData.value = defaultPreferenceData;
    } else {
        preferenceData.value = JSON.parse(tempPreferenceData);
    }
    disableImageTopic.value = !isEmptyString(preferenceData.value.customTopic);
})

function btnMouseOver() {
    this.style.backgroundColor = props.hoverColor;
    this.style.color = getFontColor(props.hoverColor);
}

function btnMouseOut() {
    this.style.backgroundColor = "transparent";
    this.style.color = props.fontColor;
}

// 搜索引擎
function searchEngineRadioOnChange(value) {
    preferenceData.value.searchEngine = value;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    Message.success("已更换搜索引擎");
}

function simpleModeSwitchOnChange(checked) {
    preferenceData.value.simpleMode = checked;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    if (checked) {
        Message.success("已开启简洁模式，一秒后刷新页面");
    } else {
        Message.success("已关闭简洁模式，一秒后刷新页面");
    }
    refreshWindow();
}

function noImageModeSwitchOnChange(checked) {
    preferenceData.value.noImageMode = checked;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    if (checked) {
        Message.success("已开启无图模式，一秒后刷新页面");
    } else {
        Message.success("已关闭无图模式，一秒后刷新页面");
    }
    refreshWindow();
}

// 重置设置
function clearStorageBtnOnClick() {
    localStorage.clear();
    Message.success("已重置所有内容，一秒后刷新页面");
    refreshWindow();
}

function refreshWindow() {
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}
</script>

<style scoped>

</style>