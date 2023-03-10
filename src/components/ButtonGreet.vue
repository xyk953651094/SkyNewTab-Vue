<template>
    <a-space>
        <a-popover position="tl"
                   :title="calendar"
                   :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
                   :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
        >
            <a-button type="primary" shape="round" size="large" id="buttonGreet" class="componentTheme zIndexHigh"
                      :style="{ cursor: 'default'}">
                <template #icon>
                    <i :class="greetIcon"></i>
                </template>
                {{ greetContent }}
            </a-button>
            <template #content>
                <p><icon-check-circle />{{" 宜：" + suit}}</p>
                <p><icon-close-circle />{{" 忌：" + avoid}}</p>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import "../stylesheets/publicStyles.css"
import {defineProps, onMounted, ref, watch} from "vue"
import {IconCheckCircle, IconCloseCircle} from "@arco-design/web-vue/es/icon";
import {
    getTimeDetails,
    getGreetContent,
    getGreetIcon,
    changeThemeColor,
    httpRequest,
} from "../javascripts/publicFunctions";

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

let backgroundColor = ref("");
let fontColor = ref("");
let greetIcon = ref(getGreetIcon());
let greetContent = ref(getGreetContent());
let calendar = ref("暂无信息");
let showSun = ref("block");
let showMoon = ref("none");
let suit = ref("暂无信息");
let avoid = ref("暂无信息");

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#buttonGreet", backgroundColor.value, fontColor.value);
    }
})

function setHoliday(data) {
    let holidayContent = data.solarTerms;
    if (data.typeDes !== "休息日" && data.typeDes !== "工作日"){
        holidayContent = holidayContent + " · " + data.typeDes;
    }
    if (data.solarTerms.indexOf("后") === -1) {
        holidayContent = "今日" + holidayContent;
    }

    greetContent.value += "｜" + holidayContent;
    calendar.value += "｜" + data.yearTips + data.chineseZodiac + "年｜" + data.lunarCalendar;
    suit.value = data.suit.replace(/\./g, " · ");
    avoid.value = data.avoid.replace(/\./g, " · ");
}

function getHoliday() {
    let url = "https://www.mxnzp.com/api/holiday/single/" + getTimeDetails(new Date()).showDate3;
    let data = {
        "app_id": "cicgheqakgmpjclo",
        "app_secret": "RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09",
    };
    httpRequest(url, data, "GET")
        .then(function(resultData){
            localStorage.setItem("lastHolidayRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            if (resultData.code === 1) {
                localStorage.setItem("lastHoliday", JSON.stringify(resultData.data));      // 保存请求结果，防抖节流
                setHoliday(resultData.data);
            }
        })
        .catch(function(){
            // 请求失败也更新请求时间，防止超时后无信息可显示
            localStorage.setItem("lastHolidayRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
        })
}

onMounted(() => {
    let hours = new Date().getHours();
    if (hours >= 6 && hours < 18) {
        showSun.value = "block";
        showMoon.value = "none";
    }
    else {
        showSun.value = "none";
        showMoon.value = "block";
    }

    let calendarDetails = getTimeDetails(new Date());
    calendar.value = calendarDetails.showDate4 + " " + calendarDetails.showWeek

    // 防抖节流
    let lastRequestTime = localStorage.getItem("lastHolidayRequestTime");
    let nowTimeStamp = new Date().getTime();
    if(lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
        getHoliday();
    }
    else if(nowTimeStamp - parseInt(lastRequestTime) > 60 * 60 * 1000) {  // 必须多于一小时才能进行新的请求
        getHoliday();
    }
    else {  // 一小时之内使用上一次请求结果
        let lastHoliday = localStorage.getItem("lastHoliday");
        if (lastHoliday) {
            lastHoliday = JSON.parse(lastHoliday);
            setHoliday(lastHoliday);
        }
    }
})
</script>

<style scoped>

</style>