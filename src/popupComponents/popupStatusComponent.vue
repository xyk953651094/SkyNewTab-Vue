<template>
    <a-space :style="{display: simpleMode ? 'none' : 'inline-flex'}">
        <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                  shape="round"
                  type="text" @click="greetBtnOnClick">
            <template #icon>
                <i :class="greetIcon"></i>
            </template>
            {{ greetContent }}
        </a-button>
        <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                  shape="round"
                  type="text" @click="weatherBtnOnClick">
            <template #icon>
                <i :class="weatherIcon"></i>
            </template>
            {{ weatherContent }}
        </a-button>
        <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor, cursor: 'default'}"
                  shape="round"
                  type="text">
            <template #icon>
                <icon-calendar-clock/>
            </template>
            {{ dailySize + " 个倒数日" }}
        </a-button>
        <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor, cursor: 'default'}"
                  shape="round"
                  type="text">
            <template #icon>
                <icon-check-square/>
            </template>
            {{ todoSize + " 个待办事项" }}
        </a-button>
    </a-space>
    <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor, cursor: 'default', display: simpleMode ? 'inline-block' : 'none'}" shape="round"
              type="text">
        <template #icon>
            <icon-info-circle/>
        </template>
        已开启简洁模式
    </a-button>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {IconCalendarClock, IconCheckSquare, IconInfoCircle} from "@arco-design/web-vue/es/icon";
import {
    getFontColor,
    getGreetContent,
    getGreetIcon,
    getSearchEngineDetail,
    getWeatherIcon
} from "../javascripts/publicFunctions";
import {defaultPreferenceData} from "../javascripts/publicConstants";

const props = defineProps({
    imageData: {
        type: Object,
        required: true
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
    greetContent.value = tempGreet ? getGreetContent() + "｜" + setHoliday(JSON.parse(tempGreet)) : "暂无信息";
    weatherIcon.value = tempWeather ? getWeatherIcon(JSON.parse(tempWeather).weatherData.weather) : "";
    weatherContent.value = tempWeather ? JSON.parse(tempWeather).weatherData.weather + "｜" + JSON.parse(tempWeather).weatherData.temperature + "°C" : "暂无信息";
    dailySize.value = tempDaily ? JSON.parse(tempDaily).length : 0;
    todoSize.value = tempTodos ? JSON.parse(tempTodos).length : 0;
})

watch(() => props.preferenceData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        searchEngineUrl.value = getSearchEngineDetail(newValue.searchEngine).searchEngineUrl;
        simpleMode.value = newValue.simpleMode;
    }
});

function btnMouseOver() {
    this.style.backgroundColor = props.imageData.color;
    this.style.color = getFontColor(props.imageData.color);
}

function btnMouseOut() {
    this.style.backgroundColor = "transparent";
    this.style.color = props.fontColor;
}

function greetBtnOnClick() {
    window.open(searchEngineUrl.value + "万年历", "_blank",);
}

function weatherBtnOnClick() {
    window.open(searchEngineUrl.value + "天气", "_blank",);
}

</script>

<style scoped>

</style>