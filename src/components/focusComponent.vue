<template>
    <a-space>
        <a-popover
            :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
            :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
            :style="{width: '600px'}"
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
                                {{ "添加名单" }}
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
                                <icon-stop />
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
                        <a-space>
                            <a-select v-model="focusSound" :style="{width:'160px'}" @change="focusSoundSelectOnChange">
                                <a-option value="none">{{ "不播放白噪音" }}</a-option>
                                <a-option value="古镇雨滴">{{ "声谷 - 古镇雨滴" }}</a-option>
                                <a-option value="松树林小雪">{{ "声谷 - 松树林小雪" }}</a-option>
                                <a-option value="漓江水">{{ "声谷 - 漓江水" }}</a-option>
                                <a-option value="泉水水滴">{{ "声谷 - 泉水水滴" }}</a-option>
                            </a-select>
                            <a-select :default-value="focusPeriod" :style="{width:'120px'}" :disabled="focusMode" @change="focusTimeSelectOnChange">
                                <a-option value="manual">{{ "手动结束" }}</a-option>
                                <a-option value="1800000">{{ "30 分钟后" }}</a-option>
                                <a-option value="2700000">{{ "45 分钟后" }}</a-option>
                                <a-option value="3600000">{{ "60 分钟后" }}</a-option>
                                <a-option value="5400000">{{ "90 分钟后" }}</a-option>
                            </a-select>
                            <a-button :shape="preferenceData.buttonShape"
                                      :style="{color: fontColor, cursor: 'default'}" type="text"
                                      @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                                {{"结束时间：" + focusEndTime}}
                            </a-button>
                        </a-space>
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
                <a-col :span="12">
                    <a-typography-text :style="{color: fontColor}">
                        {{ "添加名单 " + filterList.length + " / " + focusMaxSize }}
                    </a-typography-text>
                </a-col>
                <a-col :span="12" :style="{textAlign: 'right'}">
                    <icon-stop />
                </a-col>
            </a-row>
        </template>
        <a-form>
            <a-form-item field="focusInput" label="网站域名">
                <a-input placeholder="example.com" v-model="inputValue" @change="inputOnChange"
                         maxLength=30 show-word-limit allow-clear/>
                <template #extra>
                    <a-typography-text :style="{color: fontColor}">
                        {{"开启专注模式后，访问名单中的域名时将自动跳转至本插件"}}
                    </a-typography-text>
                </template>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup>
import {defineProps, onMounted, ref, toRaw, watch} from "vue";
import {
    btnMouseOut,
    btnMouseOver,
    changeThemeColor,
    getTimeDetails
} from "@/javascripts/publicFunctions";
import {defaultPreferenceData, browserType} from "@/javascripts/publicConstants";
import {IconDelete, IconPlus, IconStop} from "@arco-design/web-vue/es/icon";
import {Message} from "@arco-design/web-vue";
import focusSoundOne from "../assets/focusSounds/古镇雨滴.mp3";
import focusSoundTwo from "../assets/focusSounds/松树林小雪.mp3";
import focusSoundThree from "../assets/focusSounds/漓江水.mp3";
import focusSoundFour from "../assets/focusSounds/泉水水滴.mp3";

const focusAudio = new Audio();

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
let focusPeriod = ref("manual");
let focusEndTime = ref("未开启专注模式");
let focusSound = ref("none");
const focusMaxSize = 10;

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

    // 初始化专注时间
    let focusPeriodStorage = localStorage.getItem("focusPeriod");
    if (focusPeriodStorage) {
        focusPeriod.value = focusMode.value ? JSON.parse(focusPeriodStorage) : "manual"
    } else {
        localStorage.setItem("focusPeriod", JSON.stringify("manual"));
    }

    // 初始化专注截止时间
    let tempFocusEndTimeStamp = -1;
    let focusEndTimeStampStorage = localStorage.getItem("focusEndTimeStamp");
    if (focusEndTimeStampStorage) {
        tempFocusEndTimeStamp = JSON.parse(focusEndTimeStampStorage);

        if (tempFocusEndTimeStamp === -1) {
            focusEndTime.value = "未开启专注模式";
        } else if (tempFocusEndTimeStamp === 0) {
            focusEndTime.value = "手动结束";
        } else {
            focusEndTime.value = getTimeDetails(new Date(tempFocusEndTimeStamp)).showDetail;
        }
    } else {
        localStorage.setItem("focusEndTimeStamp", JSON.stringify(-1));
        setExtensionStorage("focusEndTimeStamp", -1);
    }

    // 极简模式下或者专注时段过去后关闭专注模式
    if (props.preferenceData.simpleMode || (focusMode.value && tempFocusEndTimeStamp > 0 && Date.now() > tempFocusEndTimeStamp)) {
        focusMode.value = false;
        focusPeriod.value = "manual";
        focusEndTime.value = "未开启专注模式";
        resetFocusModeStorage();
    }

    if (focusMode.value) {
        Message.info({content: "已开启专注模式", position: "bottom"});
    }

    autoStopFocus(tempFocusEndTimeStamp);
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
            focusPeriod.value = "manual";
            focusEndTime.value = "未开启专注模式";
            focusSound.value = "none";
            resetFocusModeStorage();
        }
    }
}, {immediate: true})

function setExtensionStorage(key, value) {
    // console.log(browserType + " " + key + " " + value);
    try {
        if (["Chrome", "Edge"].indexOf(browserType) !== -1) {
            chrome.storage.local.set({[key]: value});
        } else if (["Firefox", "Safari"].indexOf(browserType) !== -1) {
            browser.storage.local.set({[key]: value});
        }
    } catch (error) {
        console.error("Error writing to localStorage:", error);
    }
}

function focusModeSwitchOnChange(checked) {
    let tempFocusEndTime;
    let tempFocusEndTimeStamp;
    if (checked) {
        if (filterList.value.length === 0) {
            Message.warning("请先添加名单");
        }

        if (focusPeriod.value === "manual") {
            tempFocusEndTime = "手动结束";
            tempFocusEndTimeStamp = 0;
        } else {
            tempFocusEndTimeStamp = Date.now() + Number(focusPeriod.value);
            tempFocusEndTime = getTimeDetails(new Date(tempFocusEndTimeStamp)).showDetail;
        }
    } else {
        tempFocusEndTime = "未开启专注模式";
        tempFocusEndTimeStamp = -1;
    }

    focusMode.value = checked;
    focusEndTime.value = tempFocusEndTime;
    localStorage.setItem("focusMode", JSON.stringify(checked));
    localStorage.setItem("focusPeriod", JSON.stringify(focusPeriod.value));
    localStorage.setItem("focusEndTimeStamp", JSON.stringify(tempFocusEndTimeStamp));
    setExtensionStorage("focusMode", checked);
    setExtensionStorage("focusEndTimeStamp", tempFocusEndTimeStamp);

    autoStopFocus(tempFocusEndTimeStamp);

    // 关闭时停止播放白噪音
    if (!checked && !focusAudio.paused) {
        focusAudio.pause();
    }
}

function removeAllBtnOnClick() {
    filterList.value = [];
    localStorage.removeItem("filterList");
    setExtensionStorage("filterList", []);
    Message.success("删除成功");
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
    Message.success("删除成功");
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

function focusTimeSelectOnChange(value) {
    focusPeriod.value = value;
}

function focusSoundSelectOnChange(value) {
    focusSound.value = value;
    if (value === "none") {
        focusAudio.pause();
    } else {
        playFocusSound(focusSound.value);
    }
}

function playFocusSound(focusSound) {
    switch (focusSound) {
        case "古镇雨滴": {
            // focusAudio.src = "https://www.soundvery.com/KUpload/file/20240111/20240111145637_8657.mp3";
            focusAudio.src = focusSoundOne;
            break;
        }
        case "松树林小雪": {
            // focusAudio.src = "https://www.soundvery.com/KUpload/file/20240125/20240125190612_0979.mp3";
            focusAudio.src = focusSoundTwo;
            break;
        }
        case "漓江水": {
            // focusAudio.src = "https://www.soundvery.com/KUpload/file/20240406/20240406102328_8511.mp3";
            focusAudio.src = focusSoundThree;
            break;
        }
        case "泉水水滴": {
            // focusAudio.src = "https://www.soundvery.com/KUpload/file/20240406/20240406105745_9941.mp3";
            focusAudio.src = focusSoundFour;
            break;
        }
        default: {
            // focusAudio.src = "https://www.soundvery.com/KUpload/file/20240111/20240111145637_8657.mp3";
            focusAudio.src = focusSoundOne;
        }
    }
    focusAudio.loop = true;
    focusAudio.play();
}

// 倒计时自动关闭专注模式
function autoStopFocus(focusEndTimeStamp) {
    if (focusMode.value && focusEndTimeStamp > 0 && Date.now() < focusEndTimeStamp) {
        let interval = setInterval(() => {
            if (Date.now() >= focusEndTimeStamp) {
                focusMode.value = false;
                focusPeriod.value = "manual";
                focusEndTime.value = "未开启专注模式";
                focusSound.value = "none";
                resetFocusModeStorage();
                Message.info("已结束专注模式");
                focusAudio.pause();
                clearInterval(interval);
            }
        }, 1000);
    }
}

function resetFocusModeStorage() {
    localStorage.setItem("focusMode", JSON.stringify(false));
    localStorage.setItem("focusPeriod", JSON.stringify("manual"));
    localStorage.setItem("focusEndTimeStamp", JSON.stringify(-1));
    setExtensionStorage("focusMode", false);
    setExtensionStorage("focusEndTimeStamp", -1);
}
</script>

<style scoped>

</style>