<template>
<!--    <popover-component popover-position="bl" popover-min-width="550px"-->
<!--                       button-id="greetBtn" :button-display="display"-->
<!--                       :button-content="greetContent + ' ｜ ' + holidayContent"-->
<!--                       :button-shape="preferenceData.buttonShape" :theme-color="themeColor"-->
<!--    >-->
<!--        <template #buttonIcon>-->
<!--            <i :class="greetIcon"></i>-->
<!--        </template>-->
<!--        <template #popoverTitle>-->
<!--            <a-row align="center">-->
<!--                <a-col :span="10">-->
<!--                    <a-typography-text :style="{color: fontColor}">{{ "万年历" }}</a-typography-text>-->
<!--                </a-col>-->
<!--                <a-col :span="14" :style="{textAlign: 'right'}">-->
<!--                    <a-space>-->
<!--                        <a-button :shape="preferenceData.buttonShape"-->
<!--                                  :style="{color: fontColor}" type="text"-->
<!--                                  @click="historyBtnOnClick"-->
<!--                                  @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">-->
<!--                            <template #icon>-->
<!--                                <icon-history/>-->
<!--                            </template>-->
<!--                            {{ "历史上的今天" }}-->
<!--                        </a-button>-->
<!--&lt;!&ndash;                        <a-button :shape="preferenceData.buttonShape"&ndash;&gt;-->
<!--&lt;!&ndash;                                  :style="{color: fontColor}" type="text"&ndash;&gt;-->
<!--&lt;!&ndash;                                  @click="infoBtnOnClick"&ndash;&gt;-->
<!--&lt;!&ndash;                                  @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">&ndash;&gt;-->
<!--&lt;!&ndash;                            <template #icon>&ndash;&gt;-->
<!--&lt;!&ndash;                                <icon-more-vertical/>&ndash;&gt;-->
<!--&lt;!&ndash;                            </template>&ndash;&gt;-->
<!--&lt;!&ndash;                            {{ "更多信息" }}&ndash;&gt;-->
<!--&lt;!&ndash;                        </a-button>&ndash;&gt;-->
<!--                        <button-component  button-content="更多信息" button-cursor="default"-->
<!--                                           :button-on-click="infoBtnOnClick" :button-shape="preferenceData.buttonShape"-->
<!--                                           :hover-color="hoverColor" :background-color="backgroundColor" :font-color="fontColor">-->
<!--                            <template #buttonIcon>-->
<!--                                <icon-more-vertical/>-->
<!--                            </template>-->
<!--                        </button-component>-->
<!--                    </a-space>-->
<!--                </a-col>-->
<!--            </a-row>-->
<!--        </template>-->
<!--        <template #popoverContent>-->
<!--            <a-list :bordered=false>-->
<!--                <a-list-item>-->
<!--                    <a-space direction="vertical">-->
<!--                        <a-button :shape="preferenceData.buttonShape"-->
<!--                                  :style="{color: fontColor, cursor: 'default'}"-->
<!--                                  type="text"-->
<!--                                  @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">-->
<!--                            <template #icon>-->
<!--                                <icon-calendar/>-->
<!--                            </template>-->
<!--                            {{ calendar }}-->
<!--                        </a-button>-->
<!--                        <a-button :shape="preferenceData.buttonShape"-->
<!--                                  :style="{color: fontColor, cursor: 'default'}"-->
<!--                                  type="text"-->
<!--                                  @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">-->
<!--                            <template #icon>-->
<!--                                <icon-check-circle/>-->
<!--                            </template>-->
<!--                            {{ "宜：" + (suit.length < btnMaxSize ? suit : suit.substring(0, btnMaxSize) + "...") }}-->
<!--                        </a-button>-->
<!--                        <a-button :shape="preferenceData.buttonShape"-->
<!--                                  :style="{color: fontColor, cursor: 'default'}"-->
<!--                                  type="text"-->
<!--                                  @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">-->
<!--                            <template #icon>-->
<!--                                <icon-close-circle/>-->
<!--                            </template>-->
<!--                            {{-->
<!--                                "忌：" + (avoid.length < btnMaxSize ? avoid : avoid.substring(0, btnMaxSize) + "...")-->
<!--                            }}-->
<!--                        </a-button>-->
<!--                    </a-space>-->
<!--                </a-list-item>-->
<!--            </a-list>-->
<!--        </template>-->
<!--    </popover-component>-->

    <a-space>
        <a-popover :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
                   :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
                   :style="{minWidth: '550px'}"
                   position="bl"
        >
            <a-button id="greetBtn" :shape="preferenceData.buttonShape" :style="{cursor: 'default', display: display}"
                      class="componentTheme zIndexHigh" size="large" type="primary">
                <template #icon>
                    <i :class="greetIcon"></i>
                </template>
                {{ greetContent + " ｜ " + holidayContent }}
            </a-button>
            <template #title>
                <a-row align="center">
                    <a-col :span="10">
                        <a-typography-text :style="{color: fontColor}">{{ "万年历" }}</a-typography-text>
                    </a-col>
                    <a-col :span="14" :style="{textAlign: 'right'}">
                        <a-button :shape="preferenceData.buttonShape"
                                  :style="{color: fontColor}" type="text"
                                  @click="infoBtnOnClick"
                                  @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                            <template #icon>
                                <icon-more-vertical/>
                            </template>
                            {{ "更多信息" }}
                        </a-button>
                    </a-col>
                </a-row>
            </template>
            <template #content>
                <a-list :bordered=false :split="false">
                    <a-list-item>
                        <a-button :shape="preferenceData.buttonShape"
                                  :style="{color: fontColor, cursor: 'default'}"
                                  type="text"
                                  @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                            <template #icon>
                                <icon-calendar/>
                            </template>
                            {{ calendar }}
                        </a-button>
                    </a-list-item>
                    <a-list-item>
                        <a-button :shape="preferenceData.buttonShape"
                                  :style="{color: fontColor, cursor: 'default'}"
                                  type="text"
                                  @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                            <template #icon>
                                <icon-check-circle/>
                            </template>
                            {{ "宜：" + (suit.length < btnMaxSize ? suit : suit.substring(0, btnMaxSize) + "...") }}
                        </a-button>
                    </a-list-item>
                    <a-list-item>
                        <a-button :shape="preferenceData.buttonShape"
                                  :style="{color: fontColor, cursor: 'default'}"
                                  type="text"
                                  @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)">
                            <template #icon>
                                <icon-close-circle/>
                            </template>
                            {{
                                "忌：" + (avoid.length < btnMaxSize ? avoid : avoid.substring(0, btnMaxSize) + "...")
                            }}
                        </a-button>
                    </a-list-item>
                </a-list>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import "@/stylesheets/publicStyles.less"
import {defineProps, onMounted, ref, watch} from "vue"
import {
    IconCalendar,
    IconCheckCircle,
    IconCloseCircle,
    IconMoreVertical,
} from "@arco-design/web-vue/es/icon";
import {
    btnMouseOut,
    btnMouseOver,
    changeThemeColor,
    getGreetContent,
    getGreetIcon,
    getSearchEngineDetail,
    getTimeDetails,
    httpRequest
} from "@/javascripts//publicFunctions";
import {appId, appSecret, defaultPreferenceData} from "@/javascripts/publicConstants";
import {Notification} from "@arco-design/web-vue";

const btnMaxSize = 80;

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
}, {immediate: true});

watch(() => props.preferenceData.simpleMode, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        display.value = newValue ? "none" : "block";
    }
}, {immediate: true});

function infoBtnOnClick() {
    window.open(searchEngineUrl.value + "万年历", "_self");
}

// 万年历
function setHoliday(data) {
    let tempHolidayContent = data.solarTerms;
    if (data.solarTerms.indexOf("后") === -1) {
        tempHolidayContent = "今日" + tempHolidayContent;
    }

    if (data.typeDes !== "休息日" && data.typeDes !== "工作日") {
        tempHolidayContent = tempHolidayContent + " · " + data.typeDes;

        // 发送恭贺通知
        let hideBlessStorage = localStorage.getItem("displayBless");
        if (hideBlessStorage === null) {
            Notification.success({
                showIcon: false,
                title: "今日" + data.typeDes,
                content: "云开新标签页祝您" + data.typeDes + "快乐！",
                position: "bottomLeft",
                duration: 5000
            });
            localStorage.setItem("displayBless", JSON.stringify(true));
        }
    } else {
        localStorage.removeItem("displayBless");
    }

    holidayContent.value = tempHolidayContent;
    calendar.value = timeDetails.value.showDate4 + " " + timeDetails.value.showWeek + " ｜ " +
        data.yearTips + data.chineseZodiac + "年 ｜ " + data.lunarCalendar + " ｜ " + data.constellation;
    suit.value = data.suit ? data.suit.replace(/\./g, " · ") : "暂无信息";
    avoid.value = data.avoid ? data.avoid.replace(/\./g, " · ") : "暂无信息";
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
            // localStorage.setItem("lastGreetRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流

            // 请求失败时使用上一次请求结果
            let lastHoliday = localStorage.getItem("lastHoliday");
            if (lastHoliday) {
                lastHoliday = JSON.parse(lastHoliday);
                setHoliday(lastHoliday);
            }
        })
}

onMounted(() => {
    if (!props.preferenceData.simpleMode) {
        // 防抖节流
        let lastRequestTime = localStorage.getItem("lastGreetRequestTime");
        let nowTimeStamp = new Date().getTime();
        if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
            getHoliday();
        } else if (nowTimeStamp - parseInt(lastRequestTime) > 4 * 60 * 60 * 1000) {  // 必须多于四小时才能进行新的请求
            getHoliday();
        } else {  // 四小时之内使用上一次请求结果
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
    }
})
</script>

<style scoped>

</style>