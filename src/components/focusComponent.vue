<template>
    <a-space>
        <a-popover
            :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
            :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
            :style="{width: '500px'}"
            position="br"
        >
            <a-button id="focusBtn" :shape="preferenceData.buttonShape" :style="{cursor: 'default', display: display}"
                      class="componentTheme zIndexHigh"
                      size="large"
                      type="primary">
                <template #icon>
                    <i :class="focusMode ? 'bi bi-cup-hot-fill' : 'bi bi-cup-hot'"></i>
                </template>
                {{ focusMode ? "专注中" : "未专注" }}
            </a-button>
            <template #title>
                <a-row align="center">
                    <a-col :span="8">
                        <a-typography-text :style="{color: fontColor}">
                            {{"专注模式 " + filterList.length + " / " + focusMaxSize}}
                        </a-typography-text>
                    </a-col>
                    <a-col :span="16" :style="{textAlign: 'right'}">
                        <a-space>
                            <a-switch v-model="focusMode" id="focusModeSwitch" @change="focusModeSwitchOnChange">
                                <template #checked>已开启</template>
                                <template #unchecked>已关闭</template>
                            </a-switch>
                            <a-button :shape="preferenceData.buttonShape"
                                      :style="{color: fontColor}" type="text"
                                      @click="showAddModalBtnOnClick"
                                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                <template #icon>
                                    <icon-plus/>
                                </template>
                                {{ "添加域名" }}
                            </a-button>
                            <a-button :shape="preferenceData.buttonShape"
                                      :style="{color: fontColor}" type="text"
                                      @click="removeAllBtnOnClick"
                                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                <template #icon>
                                    <icon-delete/>
                                </template>
                                {{ "全部删除" }}
                            </a-button>
                        </a-space>
                    </a-col>
                </a-row>
            </template>
            <template #content>
                <a-list :bordered=false>
                    <a-list-item v-for="item in filterList" :key="item.timestamp">
                        <a-button :shape="preferenceData.buttonShape"
                                  :style="{color: fontColor, cursor: 'default'}"
                                  type="text"
                                  @mouseout="btnMouseOut(fontColor, $event)"
                                  @mouseover="btnMouseOver(hoverColor, $event)">
                            <template #icon>
                                <icon-link />
                            </template>
                            {{ item.domain }}
                        </a-button>
                        <template #actions>
                            <a-button :shape="preferenceData.buttonShape"
                                      :style="{color: fontColor}" type="text"
                                      @click="removeBtnOnClick(item)"
                                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                <template #icon>
                                    <icon-delete/>
                                </template>
                            </a-button>
                        </template>
                    </a-list-item>
                    <template #footer>
                        <a-typography-text :style="{color: fontColor}">
                            {{"开启专注模式后，访问以上域名时将自动跳转至新标签页"}}
                        </a-typography-text>
                    </template>
                </a-list>
            </template>
        </a-popover>
    </a-space>
    <a-modal v-model:visible="displayModal" :closable="false"
             :mask-style="{backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}"
             :onBeforeOk="modalBeforeOk"
             unmount-on-close @cancel="modalCancelBtnOnClick" @ok="modalOkBtnOnClick">
        <template #title>
            <a-row :style="{width: '100%'}" align="center">
                <a-col :span="24" :style="{display: 'flex', alignItems: 'center'}">
                    <a-typography-text :style="{color: fontColor}">
                        {{ "添加域名 " + filterList.length + " / " + focusMaxSize }}
                    </a-typography-text>
                </a-col>
            </a-row>
        </template>
        <a-form>
            <a-form-item field="focusInput" label="网站域名">
                <a-input placeholder="example.com" v-model="inputValue" @change="inputOnChange"
                         maxLength=20 show-word-limit allow-clear/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import {defineProps, onMounted, ref, toRaw, watch} from "vue";
import {btnMouseOut, btnMouseOver, changeThemeColor, getBrowserType} from "@/javascripts/publicFunctions";
import {defaultPreferenceData} from "@/javascripts/publicConstants";
import {IconLink, IconDelete, IconPlus} from "@arco-design/web-vue/es/icon";
import {Message} from "@arco-design/web-vue";

const props = defineProps({
    themeColor: {
        type: Object,
        required: true,
        default: () => {
            return {
                "themeColor": "",
                "componentBackgroundColor": "",
                "componentFontColor": ""
            }
        }
    },
    preferenceData: {
        type: Object,
        required: true,
        default: () => {
            return defaultPreferenceData
        }
    }
});

let display = ref("block");
let hoverColor = ref("");
let backgroundColor = ref("");
let fontColor = ref("");
let displayModal = ref(false);
let focusMode = ref(false);
let inputValue = ref("");
let filterList = ref([]);
const focusMaxSize = 10;
const browserType = getBrowserType();

onMounted(() => {
    // 初始化专注模式开启状态
    let focusModeStorage = localStorage.getItem("focusMode");
    if (focusModeStorage) {
        focusMode.value = JSON.parse(focusModeStorage);
    } else {
        localStorage.setItem("focusMode", JSON.stringify(false));
        setExtensionStorage("focusMode", false);
    }

    // 初始化名单
    let filterListStorage = localStorage.getItem("filterList");
    if (filterListStorage) {
        filterList.value = JSON.parse(filterListStorage);
    } else {
        localStorage.setItem("filterList", JSON.stringify([]));
        setExtensionStorage("filterList", []);
    }
})

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        hoverColor.value = props.themeColor.themeColor;
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#focusBtn", backgroundColor.value, fontColor.value);
    }
})

watch(() => props.preferenceData.simpleMode, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        display.value = newValue ? "none" : "block";
        if (newValue) {
            focusMode.value = false;
            localStorage.setItem("focusMode", JSON.stringify(false));
            setExtensionStorage("focusMode", false);
        }
    }
}, {immediate: true})

function setExtensionStorage(key, value) {
    // console.log(browserType + " " + key + " " + value);
    if (["Chrome", "Edge"].indexOf(browserType) !== -1) {
        chrome.storage.local.set({[key]: value});
    }
    else if (["Firefox", "Safari"].indexOf(browserType) !== -1) {
        browser.storage.local.set({[key]: value});
    }
}

function focusModeSwitchOnChange(checked) {
    focusMode.value = checked;
    localStorage.setItem("focusMode", JSON.stringify(checked));
    setExtensionStorage("focusMode", checked);
}

function removeAllBtnOnClick() {
    filterList.value = [];
    localStorage.removeItem("filterList");
    setExtensionStorage("filterList", []);
}

function removeBtnOnClick(item) {
    let index = -1;
    for (let i = 0; i < filterList.value.length; i++) {
        if (item.timeStamp === filterList.value[i].timeStamp) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        filterList.value.splice(index, 1);
    }

    localStorage.setItem("filterList", JSON.stringify(filterList.value));
    setExtensionStorage("filterList", filterList.value);
}

function showAddModalBtnOnClick() {
    if (filterList.value.length < focusMaxSize) {
        displayModal.value = true;
        inputValue.value = "";
    } else {
        Message.error("域名数量最多为" + focusMaxSize + "个");
    }
}

function inputOnChange(value) {
    inputValue.value = value;
}

function modalBeforeOk() {
    if (inputValue.value && inputValue.value.length > 0) {
        return true;
    } else {
        Message.error("域名不能为空");
        return false;
    }
}

function modalOkBtnOnClick() {
    filterList.value.push({
        "domain": inputValue.value,
        "timeStamp": Date.now()
    });

    displayModal.value = false;
    localStorage.setItem("filterList", JSON.stringify(filterList.value));
    setExtensionStorage("filterList", toRaw(filterList.value));  // 不这么做传给 background 的字就变成 object
    Message.success("添加成功");
}

function modalCancelBtnOnClick() {
    displayModal.value = false;
}
</script>

<style scoped>

</style>