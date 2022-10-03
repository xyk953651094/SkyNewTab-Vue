<template>
    <a-space>
        <a-popover :title="calendar" position="tl"
                   :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
                   :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
        >
            <a-button type="primary" shape="round" size="large" id="buttonGreet" class="componentTheme zIndexHigh"
                      :style="{ cursor: 'default'}">
                <template #icon>
                    <icon-face-smile-fill />
                </template>
                {{ greetContent }}
            </a-button>
            <template #content>
                <p>{{"宜：" + suit}}</p>
                <p>{{"忌：" + avoid}}</p>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import "../stylesheets/publicStyles.css"
import {defineProps, onMounted, ref, watch} from "vue"
import {IconFaceSmileFill} from "@arco-design/web-vue/es/icon";
import {getTimeDetails, getGreet, changeThemeColor} from "@/javascripts/publicFunctions";
const $ = require("jquery");

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
let greetContent = ref(getGreet());
let calendar = ref("暂无信息");
let suit = ref("暂无信息");
let avoid = ref("暂无信息");

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#buttonGreet", backgroundColor.value, fontColor.value);
    }
})

onMounted(() => {
    let holidayParameters = {
        "app_id": "cicgheqakgmpjclo",
        "app_secret": "RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09",
    };

    let calendarDetails = getTimeDetails(new Date());
    calendar.value = calendarDetails.showDate4 + " " + calendarDetails.showWeek
    $.ajax({
        url: "https://www.mxnzp.com/api/holiday/single/" + getTimeDetails(new Date()).showDate3,
        type: "GET",
        data: holidayParameters,
        timeout: 10000,
        success: (resultData) => {
            if (resultData.code === 1) {
                let holidayContent = resultData.data.solarTerms;
                if (resultData.data.solarTerms.indexOf("后") === -1) {
                    holidayContent = "今日" + holidayContent;
                }

                greetContent.value += " ｜ " + holidayContent;
                calendar.value += "｜" + resultData.data.yearTips + resultData.data.chineseZodiac + "年｜" + resultData.data.lunarCalendar;
                suit.value = resultData.data.suit.replace(/\./g, "·");
                avoid.value = resultData.data.avoid.replace(/\./g, "·");
            }
        },
        error: function () {}
    });
})
</script>

<style scoped>

</style>