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
                               :style="{width: '100%'}" @change="searchEngineRadioOnChange">
                    <a-row>
                        <a-col :span="12">
                            <a-radio value="bing" id="bing">必应</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="google" id="google">谷歌</a-radio>
                        </a-col>
                    </a-row>
                </a-radio-group>
            </a-form-item>
            <a-form-item field="buttonShape" label="按钮形状">
                <a-radio-group v-model="preferenceData.buttonShape"
                               :style="{width: '100%'}" @change="buttonShapeRadioOnChange">
                    <a-row>
                        <a-col :span="12">
                            <a-radio value="round" id="round">圆形</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="default" id="default">方形</a-radio>
                        </a-col>
                    </a-row>
                </a-radio-group>
            </a-form-item>
            <a-form-item field="simpleMode" label="简洁模式">
                <a-switch v-model="preferenceData.simpleMode" id="simpleModeSwitch" @change="simpleModeSwitchOnChange">
                    <template #checked>
                        已开启
                    </template>
                    <template #unchecked>
                        已关闭
                    </template>
                </a-switch>
            </a-form-item>
            <a-form-item field="clearStorageButton" label="危险设置">
                <a-space>
                    <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                              type="text" @click="resetPreferenceBtnOnClick"
                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
                    >
                        <template #icon>
                            <icon-redo/>
                        </template>
                        重置设置
                    </a-button>
                    <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                              type="text" @click="clearStorageBtnOnClick"
                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
                    >
                        <template #icon>
                            <icon-redo/>
                        </template>
                        重置插件
                    </a-button>
                </a-space>
            </a-form-item>
        </a-form>
    </a-card>
    <a-modal v-model:visible="displayResetPreferenceModal" :closable="false"
             :mask-style="{backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}"
             unmount-on-close @cancel="resetPreferenceCancelBtnOnClick" @ok="resetPreferenceOkBtnOnClick">
        <template #title>
            <a-row :style="{width: '100%'}" align="center">
                <a-col :span="24" :style="{display: 'flex', alignItems: 'center'}">
                    <a-typography-text :style="{color: fontColor}">
                        {{ "确定重置设置？" }}
                    </a-typography-text>
                </a-col>
            </a-row>
        </template>
        <a-typography-text :style="{color: fontColor}">
            {{ "注意：所有设置项将被重置为默认值，确定重置吗？" }}
        </a-typography-text>
    </a-modal>
    <a-modal v-model:visible="displayClearStorageModal" :closable="false"
             :mask-style="{backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}"
             unmount-on-close @cancel="clearStorageBtnCancelOnClick" @ok="clearStorageOkBtnOnClick">
        <template #title>
            <a-row :style="{width: '100%'}" align="center">
                <a-col :span="24" :style="{display: 'flex', alignItems: 'center'}">
                    <a-typography-text :style="{color: fontColor}">
                        {{ "确定重置插件？" }}
                    </a-typography-text>
                </a-col>
            </a-row>
        </template>
        <a-typography-text :style="{color: fontColor}">
            {{ "注意：本地存储的所有数据将被清空，确定重置吗？" }}
        </a-typography-text>
    </a-modal>
</template>

<script setup>
import {IconRedo, IconSettings} from "@arco-design/web-vue/es/icon";
import {
    btnMouseOut,
    btnMouseOver,
    getPreferenceDataStorage,
    isEmpty, resetRadioColor, resetSwitchColor,
} from "@/javascripts/publicFunctions";
import {defineProps, onMounted, ref} from "vue";
import {Message} from "@arco-design/web-vue";
import {defaultPreferenceData} from "@/javascripts/publicConstants";

let displayResetPreferenceModal = ref(false);
let displayClearStorageModal = ref(false);
let preferenceData = ref(getPreferenceDataStorage());
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
    disableImageTopic.value = !isEmpty(preferenceData.value.customTopic);
})

// 搜索引擎
function searchEngineRadioOnChange(value) {
    preferenceData.value.searchEngine = value;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    Message.success("已更换搜索引擎");

    resetRadioColor(value, ["bing", "google"], props.hoverColor);
}

function buttonShapeRadioOnChange(value) {
    preferenceData.value.buttonShape = value;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    Message.success("已更换按钮形状");

    resetRadioColor(value, ["round", "default"], props.hoverColor);
}

function simpleModeSwitchOnChange(checked) {
    preferenceData.value.simpleMode = checked;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    if (checked) {
        Message.success("已开启简洁模式");
    } else {
        Message.success("已关闭简洁模式，一秒后刷新页面");
        refreshWindow();
    }

    resetSwitchColor("#simpleModeSwitch", checked, props.hoverColor);
}

// 重置设置
function resetPreferenceBtnOnClick() {
    displayResetPreferenceModal.value = true;
}

function resetPreferenceOkBtnOnClick() {
    displayResetPreferenceModal.value = false;
    localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
    Message.success("已重置设置，一秒后刷新页面");
    refreshWindow();
}

function resetPreferenceCancelBtnOnClick() {
    displayResetPreferenceModal.value = false;
}

// 重置插件
function clearStorageBtnOnClick() {
    displayClearStorageModal.value = true;
}

function clearStorageOkBtnOnClick() {
    displayClearStorageModal.value = false;
    localStorage.clear();
    Message.success("已重置插件，一秒后刷新页面");
    refreshWindow();
}

function clearStorageBtnCancelOnClick() {
    displayClearStorageModal.value = false;
}

function refreshWindow() {
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}
</script>

<style scoped>

</style>