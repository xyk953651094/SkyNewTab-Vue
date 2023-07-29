<template>
    <a-space>
        <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor, cursor: 'default'}" shape="round"
                  type="text">
            <template #icon>
                <i :class="greetIcon"></i>
            </template>
            {{ greetContent }}
        </a-button>
        <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor, cursor: 'default'}" shape="round"
                  type="text">
            <template #icon>
                <i :class="weatherIcon"></i>
            </template>
            {{ weatherContent }}
        </a-button>
        <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor, cursor: 'default'}" shape="round"
                  type="text">
            <template #icon>
                <icon-calendar-clock/>
            </template>
            {{ "倒数日：" + dailyAmount + " 个" }}
        </a-button>
        <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor, cursor: 'default'}" shape="round"
                  type="text">
            <template #icon>
                <icon-check-square/>
            </template>
            {{ "待办事项：" + todoAmount + " 个" }}
        </a-button>
    </a-space>
</template>

<script setup>
import {defineProps, onMounted, ref} from "vue";
import {IconCalendarClock, IconCheckSquare} from "@arco-design/web-vue/es/icon";
import {getFontColor, getGreetContent, getGreetIcon, getWeatherIcon} from "../javascripts/publicFunctions";

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
});

let greetIcon = ref(getGreetIcon());
let greetContent = ref(getGreetContent());
let weatherIcon = ref("");
let weatherContent = ref("");
let dailyAmount = ref("");
let todoAmount = ref("");

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
    dailyAmount.value = tempDaily ? JSON.parse(tempDaily).length : 0;
    todoAmount.value = tempTodos ? JSON.parse(tempTodos).length : 0;
})

function btnMouseOver() {
    this.style.backgroundColor = props.imageData.color;
    this.style.color = getFontColor(props.imageData.color);
}

function btnMouseOut() {
    this.style.backgroundColor = "transparent";
    this.style.color = props.fontColor;
}


</script>

<style scoped>

</style>