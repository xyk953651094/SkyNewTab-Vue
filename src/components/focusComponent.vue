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
                        <a-typography-text :style="{color: fontColor}">{{"专注模式" }}</a-typography-text>
                    </a-col>
                    <a-col :span="16" :style="{textAlign: 'right'}">
                        <a-space>
                            <a-switch v-model="focusMode" id="focusModeSwitch" @change="focusModeSwitchOnChange">
                                <template #checked>已开启</template>
                                <template #unchecked>已关闭</template>
                            </a-switch>
                            <a-button :shape="preferenceData.buttonShape"
                                      :style="{color: fontColor}" type="text"
                                      @click="removeAllBtnOnClick"
                                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                <template #icon>
                                    <icon-delete/>
                                </template>
                                {{ "全部清空" }}
                            </a-button>
                        </a-space>
                    </a-col>
                </a-row>
            </template>
            <template #content>
                <a-list :bordered=false>
                    <template #header>
                        <a-row align="center">
                            <a-col :span="8">
                                <a-space>
                                    <a-typography-text :style="{color: fontColor}">{{(focusFilter === "whiteListFilter" ? "白名单 " : "黑名单 ") + filterList.length + " / " + focusMaxSize }}</a-typography-text>
                                    <a-button :shape="preferenceData.buttonShape"
                                              :style="{color: fontColor}" type="text"
                                              @click="switchFilterBtnOnClick"
                                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                        <template #icon>
                                            <icon-sync />
                                        </template>
                                    </a-button>
                                </a-space>
                            </a-col>
                            <a-col :span="16" :style="{textAlign: 'right'}">
                                <a-space>
                                    <a-input placeholder="example.com" v-model="inputValue" @change="inputOnChange"
                                             maxLength=20 show-word-limit allow-clear/>
                                    <a-button :shape="preferenceData.buttonShape"
                                              :style="{color: fontColor}" type="text"
                                              @click="addFilterListBtnOnClick"
                                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                        <template #icon>
                                            <icon-plus/>
                                        </template>
                                        {{ "添加" }}
                                    </a-button>
                                </a-space>
                            </a-col>
                        </a-row>
                    </template>
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
                            {{
                                focusFilter === "whiteListFilter" ?
                                    "白名单模式下，访问白名单外的网站将自动跳转至新标签页或空白页" :
                                    "黑名单模式下，访问黑名单中的网站将自动跳转至新标签页或空白页"
                            }}
                        </a-typography-text>
                    </template>
                </a-list>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import {defineProps, onMounted, ref, toRaw, watch} from "vue";
import {btnMouseOut, btnMouseOver, changeThemeColor, getBrowserType} from "@/javascripts/publicFunctions";
import {defaultPreferenceData} from "@/javascripts/publicConstants";
import {IconLink, IconDelete, IconPlus, IconSync} from "@arco-design/web-vue/es/icon";
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
let focusMode = ref(false);
let focusFilter = ref("whiteListFilter");
let inputValue = ref("");
let filterList = ref([]);
const focusMaxSize = 5;

onMounted(() => {
    // 初始化专注模式开启状态
    let tempFocusMode = false;
    let focusModeStorage = localStorage.getItem("focusMode");
    if (focusModeStorage) {
        tempFocusMode = JSON.parse(focusModeStorage);
    } else {
        localStorage.setItem("focusMode", JSON.stringify(false));
        setExtensionStorage("focusMode", false);
    }

    // 初始化过滤模式
    let tempFocusFilter = "whiteListFilter";
    let focusFilterStorage = localStorage.getItem("focusFilter");
    if (focusFilterStorage) {
        tempFocusFilter = focusFilterStorage;
    } else {
        localStorage.setItem("focusFilter", "whiteListFilter");
        setExtensionStorage("focusFilter", "whiteListFilter");
    }

    // 初始化名单
    let tempFilterList =[];
    let filterListStorage = localStorage.getItem("filterList");
    if (filterListStorage) {
        tempFilterList = JSON.parse(filterListStorage);
    } else {
        localStorage.setItem("filterList", JSON.stringify([]));
        setExtensionStorage("filterList", []);
    }

    focusMode.value = tempFocusMode;
    focusFilter.value = tempFocusFilter;
    filterList.value = tempFilterList;
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
    const browserType = getBrowserType();
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
    let tempFilterList = localStorage.getItem("filterList");
    if (tempFilterList) {
        filterList.value = [];
        localStorage.removeItem("filterList");
        setExtensionStorage("filterList", []);
    }
}

function  switchFilterBtnOnClick() {
    let tempFocusFilter = focusFilter.value;
    focusFilter.value = (tempFocusFilter === "whiteListFilter" ? "blackListFilter" : "whiteListFilter");
    localStorage.setItem("focusFilter", focusFilter.value);
    setExtensionStorage("focusFilter", focusFilter.value);
}

function inputOnChange(value) {
    inputValue.value = value;
}

function addFilterListBtnOnClick() {
    if (filterList.value.length < focusMaxSize) {
        if (inputValue.value.length > 0) {
            let tempFilterList = filterList.value;
            tempFilterList.push({
                "domain": inputValue.value,
                "timeStamp": Date.now()
            });

            inputValue.value = "";
            filterList.value = tempFilterList;
            localStorage.setItem("filterList", JSON.stringify(filterList.value));
            setExtensionStorage("filterList", toRaw(filterList.value));  // 不这么做传给 background 的字就变成 object
        }
        else {
            Message.error("域名不能为空");
        }
    }
    else {
        Message.error("名单数量最多为" + focusMaxSize + "个");
    }
}

function removeBtnOnClick(item) {
    let tempFilterList = localStorage.getItem("filterList");
    if (tempFilterList) {
        tempFilterList = JSON.parse(tempFilterList);
        let index = -1;
        for (let i = 0; i < tempFilterList.length; i++) {
            if (item.timeStamp === tempFilterList[i].timeStamp) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            tempFilterList.splice(index, 1);
        }
        localStorage.setItem("filterList", JSON.stringify(tempFilterList));
        setExtensionStorage("filterList", tempFilterList);

        filterList.value = tempFilterList;
    }
}

</script>

<style scoped>

</style>