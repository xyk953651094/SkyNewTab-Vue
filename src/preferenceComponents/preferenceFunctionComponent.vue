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
                    <a-row :gutter="[0, 8]">
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
            <a-form-item field="buttonShape" label="按钮形状">
                <a-radio-group v-model="preferenceData.buttonShape"
                               :style="{width: '100%'}" @change="buttonShapeRadioOnChange">
                    <a-row>
                        <a-col :span="12">
                            <a-radio value="round">圆形</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="default">方形</a-radio>
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
            <a-form-item field="clearStorageButton" label="危险设置">
                <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                          type="text" @click="clearStorageBtnOnClick"
                          @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
                >
                    <template #icon>
                        <icon-redo/>
                    </template>
                    重置插件
                </a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>

<script setup>
import {IconRedo, IconSettings} from "@arco-design/web-vue/es/icon";
import {btnMouseOut, btnMouseOver, getPreferenceDataStorage, isEmpty} from "../javascripts/publicFunctions";
import {defineProps, onMounted, ref} from "vue";
import {Message} from "@arco-design/web-vue";

let preferenceData = ref(getPreferenceDataStorage());
let disableImageTopic = ref(false);

defineProps({
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
    disableImageTopic.value = !isEmpty(preferenceData.value.customTopic);
})

// 搜索引擎
function searchEngineRadioOnChange(value) {
    preferenceData.value.searchEngine = value;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    Message.success("已更换搜索引擎");
}

function buttonShapeRadioOnChange(value) {
    preferenceData.value.buttonShape = value;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    Message.success("已更换按钮形状");
    // refreshWindow();
}

function simpleModeSwitchOnChange(checked) {
    preferenceData.value.simpleMode = checked;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    if (checked) {
        Message.success("已开启简洁模式");
    } else {
        Message.success("已关闭简洁模式");
    }
    // refreshWindow();
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