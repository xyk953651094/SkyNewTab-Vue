<template>
    <a-space :style="{display: simpleMode ? 'none' : 'inline-flex'}">
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                  type="text"
                  @click="greetBtnOnClick"
                  @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <i :class="greetIcon"></i>
            </template>
            {{ greetContent }}
        </a-button>
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                  type="text"
                  @click="weatherBtnOnClick"
                  @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <i :class="weatherIcon"></i>
            </template>
            {{ weatherContent }}
        </a-button>
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor, cursor: 'default'}"
                  type="text"
                  @mouseout="btnMouseOut(fontColor, $event)"
                  @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <icon-calendar-clock/>
            </template>
            {{ dailySize + " 个" }}
        </a-button>
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor, cursor: 'default'}"
                  type="text"
                  @mouseout="btnMouseOut(fontColor, $event)"
                  @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <icon-check-square/>
            </template>
            {{ todoSize + " 个" }}
        </a-button>
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor, cursor: 'default'}"
                  type="text"
                  @mouseout="btnMouseOut(fontColor, $event)"
                  @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <i :class="focusMode ? 'bi bi-cup-hot-fill' : 'bi bi-cup-hot'"></i>
            </template>
            {{focusMode ? "专注中" : "未专注" }}
        </a-button>
    </a-space>
    <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor, cursor: 'default', display: simpleMode ? 'inline-block' : 'none'}"
              type="text"
              @mouseout="btnMouseOut(fontColor, $event)"
              @mouseover="btnMouseOver(hoverColor, $event)">
        <template #icon>
            <icon-info-circle/>
        </template>
        已开启极简模式
    </a-button>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {IconCalendarClock, IconCheckSquare, IconInfoCircle} from "@arco-design/web-vue/es/icon";
import {
    btnMouseOut,
    btnMouseOver,
    getGreetContent,
    getGreetIcon,
    getSearchEngineDetail,
    getWeatherIcon
} from "@/javascripts/publicFunctions";
import {defaultPreferenceData} from "@/javascripts/publicConstants";

const props = defineProps({
    imageData: {
        type: Object,
        required: true
    },
    hoverColor: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    },
    fontColor: {
        type: String,
        default: () => {
            return "#000000";
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

let greetIcon = ref(getGreetIcon());
let greetContent = ref(getGreetContent());
let weatherIcon = ref("");
let weatherContent = ref("");
let dailySize = ref("");
let todoSize = ref("");
let focusMode = ref(false);
let searchEngineUrl = ref("https://www.bing.com/search?q=");
let simpleMode = ref(false);

function setHoliday(data) {
    let holidayContent = data.solarTerms;
    if (data.solarTerms.indexOf("后") === -1) {
        holidayContent = "今日" + holidayContent;
    }
    if (data.typeDes !== "休息日" && data.typeDes !== "工作日") {
        holidayContent = holidayContent + " · " + data.typeDes;
    }
    return holidayContent;
}

onMounted(() => {
    let tempGreet = localStorage.getItem("lastHoliday");
    let tempWeather = localStorage.getItem("lastWeather");
    let tempDaily = localStorage.getItem("daily");
    let tempTodos = localStorage.getItem("todos");
    let tempFocusMode = localStorage.getItem("focusMode");
    greetContent.value = tempGreet ? getGreetContent() + " ｜ " + setHoliday(JSON.parse(tempGreet)) : "暂无信息";
    weatherIcon.value = tempWeather ? getWeatherIcon(JSON.parse(tempWeather).weatherData.weather) : "";
    weatherContent.value = tempWeather ? JSON.parse(tempWeather).weatherData.weather + " ｜ " + JSON.parse(tempWeather).weatherData.temperature + "°C" : "暂无信息";
    dailySize.value = tempDaily ? JSON.parse(tempDaily).length : 0;
    todoSize.value = tempTodos ? JSON.parse(tempTodos).length : 0;
    focusMode.value = tempFocusMode ? JSON.parse(tempFocusMode) : false;
})

watch(() => props.preferenceData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        searchEngineUrl.value = getSearchEngineDetail(newValue.searchEngine).searchEngineUrl;
        simpleMode.value = newValue.simpleMode;
    }
}, {immediate: true});

function greetBtnOnClick() {
    window.open(searchEngineUrl.value + "万年历", "_blank",);
}

function weatherBtnOnClick() {
    window.open(searchEngineUrl.value + "天气", "_blank",);
}

</script>

<style scoped>

</style>