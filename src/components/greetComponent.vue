<template>
    <a-space>
        <a-popover :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
                   :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
                   :title="calendar"
                   position="tl"
        >
            <a-button id="greetBtn" class="componentTheme zIndexHigh" shape="round" size="large" type="primary"
                      @click="greetBtnOnClick">
                <template #icon>
                    <i :class="greetIcon"></i>
                </template>
                {{ greetContent + "｜" + holidayContent }}
            </a-button>
            <template #content>
                <a-space direction="vertical" fill size="mini">
                    <a-space>
                        <icon-check-circle/>
                        <a-typography-text :style="{color: fontColor}">{{ " 宜：" + suit }}</a-typography-text>
                    </a-space>
                    <a-space>
                        <icon-close-circle/>
                        <a-typography-text :style="{color: fontColor}">{{ " 忌：" + avoid }}</a-typography-text>
                    </a-space>
                </a-space>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import "../stylesheets/publicStyles.less"
import {defineProps, onMounted, ref, watch} from "vue"
import {IconCheckCircle, IconCloseCircle} from "@arco-design/web-vue/es/icon";
import {
    changeThemeColor,
    getGreetContent,
    getGreetIcon,
    getTimeDetails,
    httpRequest,
} from "../javascripts//publicFunctions";

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
    searchEngine: {
        type: String,
        required: true,
        default: () => {
            return "bing"
        }
    }
});

let backgroundColor = ref("");
let fontColor = ref("");
let greetIcon = ref(getGreetIcon());
let greetContent = ref(getGreetContent());
let holidayContent = ref("暂无信息");
let searchEngineUrl = ref("https://www.bing.com/search?q=");
let timeDetails = ref(getTimeDetails(new Date()));
let calendar = ref(timeDetails.value.showDate4 + " " + timeDetails.value.showWeek);
let suit = ref("暂无信息");
let avoid = ref("暂无信息");

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#greetBtn", backgroundColor.value, fontColor.value);
    }
});

watch(() => props.searchEngine, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        switch (newValue) {
            case "bing":
                searchEngineUrl.value = "https://www.bing.com/search?q=";
                break;
            case "baidu":
                searchEngineUrl.value = "https://www.baidu.com/s?wd=";
                break;
            case "google":
                searchEngineUrl.value = "https://www.google.com/search?q=";
                break;
            default:
                searchEngineUrl.value = "https://www.bing.com/search?q=";
                break;
        }
    }
});

function greetBtnOnClick() {
    window.open(searchEngineUrl.value + "日历", "_blank",);
}

function setHoliday(data) {
    let tempHolidayContent = data.solarTerms;
    if (data.typeDes !== "休息日" && data.typeDes !== "工作日") {
        tempHolidayContent = tempHolidayContent + " · " + data.typeDes;
    }
    if (data.solarTerms.indexOf("后") === -1) {
        tempHolidayContent = "今日" + tempHolidayContent;
    }

    holidayContent.value = tempHolidayContent;
    calendar.value = timeDetails.value.showDate4 + " " + timeDetails.value.showWeek + "｜" +
        data.yearTips + data.chineseZodiac + "年｜" + data.lunarCalendar;
    suit.value = data.suit.replace(/\./g, " · ");
    avoid.value = data.avoid.replace(/\./g, " · ");
}

function getHoliday() {
    let headers = {};
    let url = "https://www.mxnzp.com/api/holiday/single/" + getTimeDetails(new Date()).showDate3;
    let data = {
        "app_id": "cicgheqakgmpjclo",
        "app_secret": "RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09",
    };
    httpRequest(headers, url, data, "GET")
        .then(function (resultData) {
            localStorage.setItem("lastHolidayRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            if (resultData.code === 1) {
                localStorage.setItem("lastHoliday", JSON.stringify(resultData.data));      // 保存请求结果，防抖节流
                setHoliday(resultData.data);
            }
        })
        .catch(function () {
            // 请求失败也更新请求时间，防止超时后无信息可显示
            localStorage.setItem("lastHolidayRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
        })
}

onMounted(() => {
    // 防抖节流
    let lastRequestTime = localStorage.getItem("lastHolidayRequestTime");
    let nowTimeStamp = new Date().getTime();
    if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
        getHoliday();
    } else if (nowTimeStamp - parseInt(lastRequestTime) > 4 * 60 * 60 * 1000) {  // 必须多于四小时才能进行新的请求
        getHoliday();
    } else {  // 一小时之内使用上一次请求结果
        let lastHoliday = localStorage.getItem("lastHoliday");
        if (lastHoliday) {
            lastHoliday = JSON.parse(lastHoliday);
            setHoliday(lastHoliday);
        }
    }

    setInterval(() => {
        greetIcon.value = getGreetIcon();
        greetContent.value = getGreetContent();
    }, 60 * 60 * 1000);
})
</script>

<style scoped>

</style>