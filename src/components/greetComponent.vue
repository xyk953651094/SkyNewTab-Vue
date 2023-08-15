<template>
    <a-space>
        <a-popover :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
                   :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
                   :style="{minWidth: '500px'}"
                   position="bl"
        >
            <a-button id="greetBtn" :style="{cursor: 'default', display: display}" class="componentTheme zIndexHigh" shape="round" size="large" type="primary">
                <template #icon>
                    <i :class="greetIcon"></i>
                </template>
                {{ greetContent + "｜" + holidayContent }}
            </a-button>
            <template #title>
                <a-row align="center">
                    <a-col :span="10">
                        <a-typography-text :style="{color: fontColor}">{{ "万年历" }}</a-typography-text>
                    </a-col>
                    <a-col :span="14" :style="{textAlign: 'right'}">
                        <a-space>
                            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                                      shape="round"
                                      type="text" @click="historyBtnOnClick">
                                <template #icon>
                                    <icon-history />
                                </template>
                                {{ "历史上的今天" }}
                            </a-button>
                            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}"
                                      shape="round"
                                      type="text" @click="infoBtnOnClick">
                                <template #icon>
                                    <icon-info-circle/>
                                </template>
                                {{ "更多信息" }}
                            </a-button>
                        </a-space>
                    </a-col>
                </a-row>
            </template>
            <template #content>
                <a-list :bordered=false>
                    <a-list-item>
                        <a-space direction="vertical">
                            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                                      :style="{color: fontColor, cursor: 'default'}"
                                      shape="round" type="text">
                                <template #icon>
                                    <icon-calendar />
                                </template>
                                {{ calendar }}
                            </a-button>
                            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                                      :style="{color: fontColor, cursor: 'default'}"
                                      shape="round" type="text">
                                <template #icon>
                                    <icon-check-circle/>
                                </template>
                                {{ "宜：" + suit }}
                            </a-button>
                            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                                      :style="{color: fontColor, cursor: 'default'}"
                                      shape="round" type="text">
                                <template #icon>
                                    <icon-close-circle/>
                                </template>
                                {{ "忌：" + avoid }}
                            </a-button>
<!--                            <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"-->
<!--                                      :style="{color: fontColor, cursor: 'default'}"-->
<!--                                      shape="round" type="text">-->
<!--                                <template #icon>-->
<!--                                    <icon-book />-->
<!--                                </template>-->
<!--                                {{ toast }}-->
<!--                            </a-button>-->
                        </a-space>
                    </a-list-item>
<!--                    <a-list-item>-->
<!--                        <a-space direction="vertical">-->
<!--                            <a-button v-for="item in history" :key="item.title"-->
<!--                                      :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"-->
<!--                                      :style="{color: fontColor, cursor: 'default'}"-->
<!--                                      shape="round" type="text">-->
<!--                                <template #icon>-->
<!--                                    <icon-history />-->
<!--                                </template>-->
<!--                                {{ item.year + "-" + item.month + "-" + item.day + "：" + item.title }}-->
<!--                            </a-button>-->
<!--                        </a-space>-->
<!--                    </a-list-item>-->
                </a-list>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import "../stylesheets/publicStyles.less"
import {defineProps, onMounted, ref, watch} from "vue"
import {IconInfoCircle, IconHistory, IconCalendar, IconCheckCircle, IconCloseCircle} from "@arco-design/web-vue/es/icon";
import {
    changeThemeColor,
    getFontColor,
    getGreetContent,
    getGreetIcon,
    getSearchEngineDetail,
    getTimeDetails,
    httpRequest,
} from "../javascripts//publicFunctions";
import {defaultPreferenceData, appId, appSecret} from "../javascripts/publicConstants";

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
let greetIcon = ref(getGreetIcon());
let greetContent = ref(getGreetContent());
let holidayContent = ref("暂无信息");
let searchEngineUrl = ref("https://www.bing.com/search?q=");
let timeDetails = ref(getTimeDetails(new Date()));
let calendar = ref(timeDetails.value.showDate4 + " " + timeDetails.value.showWeek);
let suit = ref("暂无信息");
let avoid = ref("暂无信息");
// let toast = ref("暂无信息");
// let history = ref([]);

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        hoverColor.value = props.themeColor.themeColor;
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#greetBtn", backgroundColor.value, fontColor.value);
    }
});

watch(() => props.preferenceData, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        searchEngineUrl.value = getSearchEngineDetail(newValue.searchEngine).searchEngineUrl;
    }
});

watch(() => props.preferenceData.simpleMode, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        display.value = newValue ? "none" : "block";
    }
});

function btnMouseOver() {
    this.style.backgroundColor = hoverColor.value;
    this.style.color = getFontColor(hoverColor.value);
}

function btnMouseOut() {
    this.style.backgroundColor = "transparent";
    this.style.color = fontColor.value;
}

function infoBtnOnClick() {
    window.open(searchEngineUrl.value + "万年历", "_blank",);
}

function historyBtnOnClick() {
    window.open(searchEngineUrl.value + "历史上的今天", "_blank",);
}

// 万年历
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
        data.yearTips + data.chineseZodiac + "年｜" + data.lunarCalendar + "｜" + data.constellation;
    suit.value = data.suit.replace(/\./g, " · ");
    avoid.value = data.avoid.replace(/\./g, " · ");
}

function getHoliday() {
    let headers = {};
    let url = "https://www.mxnzp.com/api/holiday/single/" + getTimeDetails(new Date()).showDate3;
    let data = {
        "app_id": appId,
        "app_secret": appSecret,
    };
    httpRequest(headers, url, data, "GET")
        .then(function (resultData) {
            localStorage.setItem("lastGreetRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            if (resultData.code === 1) {
                localStorage.setItem("lastHoliday", JSON.stringify(resultData.data));      // 保存请求结果，防抖节流
                setHoliday(resultData.data);
            }
        })
        .catch(function () {
            // 请求失败也更新请求时间，防止超时后无信息可显示
            localStorage.setItem("lastGreetRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
        })
}

// 每日一句
// function setToast(data) {
//     toast.value = data[0].content;
//     if(!isEmptyString(data[0].author)) {
//         toast.value += " - " + data[0].author;
//     }
// }
//
// function getToast() {
//     let headers = {};
//     let url = "https://www.mxnzp.com/api/daily_word/recommend";
//     let data = {
//         "app_id": appId,
//         "app_secret": appSecret,
//         "count": 1
//     };
//     httpRequest(headers, url, data, "GET")
//         .then(function (resultData) {
//             if (resultData.code === 1) {
//                 localStorage.setItem("lastToast", JSON.stringify(resultData.data));      // 保存请求结果
//                 setToast(resultData.data);
//             }
//         })
// }
//
// 历史上的今天
// function setHistory(data) {
//     if (data.length > 5) {
//         for(let i = 0; i < 5; i++) {
//             history.value.push(data[i]);
//         }
//     }
//     else {
//         history.value = data;
//     }
// }
//
// function getHistory() {
//     let headers = {};
//     let url = "https://www.mxnzp.com/api/history/today";
//     let data = {
//         "app_id": appId,
//         "app_secret": appSecret,
//     };
//     httpRequest(headers, url, data, "GET")
//         .then(function (resultData) {
//             if (resultData.code === 1) {
//                 localStorage.setItem("lastHistory", JSON.stringify(resultData.data));      // 保存请求结果
//                 setHistory(resultData.data);
//             }
//         })
// }

onMounted(() => {
    if(!props.preferenceData.simpleMode) {
        // 防抖节流
        let lastRequestTime = localStorage.getItem("lastGreetRequestTime");
        let nowTimeStamp = new Date().getTime();
        if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
            getHoliday();
            // getToast();
            // getHistory();
        } else if (nowTimeStamp - parseInt(lastRequestTime) > 4 * 60 * 60 * 1000) {  // 必须多于四小时才能进行新的请求
            getHoliday();
            // getToast();
            // getHistory();
        } else {  // 四小时之内使用上一次请求结果
            let lastHoliday = localStorage.getItem("lastHoliday");
            // let lastToast = localStorage.getItem("lastToast");
            // let lastHistory = localStorage.getItem("lastHistory");
            if (lastHoliday) {
                lastHoliday = JSON.parse(lastHoliday);
                setHoliday(lastHoliday);
            }
            // if (lastToast) {
            //     lastToast = JSON.parse(lastToast);
            //     setToast(lastToast);
            // }
            // if (lastHistory) {
            //     lastHistory = JSON.parse(lastHistory);
            //     setHistory(lastHistory);
            // }
        }

        setInterval(() => {
            greetIcon.value = getGreetIcon();
            greetContent.value = getGreetContent();
        }, 60 * 60 * 1000);
    }
})
</script>

<style scoped>

</style>