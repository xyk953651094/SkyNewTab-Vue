<template>
    <a-space>
        <a-popover :title="calendar" position="tl"
                   :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
                   :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
        >
            <a-button type="primary" shape="round" size="large" id="buttonGreet" class="frostedGlass zIndexHigh"
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
import {getTimeDetails, getGreet, getFontColor, changeThemeColor} from "@/javascripts/publicFunctions";
const $ = require("jquery");

const props = defineProps({
    themeColor: {
        type: String,
        required: true
    }
});

let backgroundColor = ref("");
let fontColor = ref("");
let greetContent = ref(getGreet());
let calendar = ref("");
let suit = ref("");
let avoid = ref("");

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor;
        fontColor.value = getFontColor(props.themeColor);
        changeThemeColor("#buttonGreet", props.themeColor);
    }
})

onMounted(() => {
    $("#buttonGreet").hover(function(){
        $(".arco-popover-title").css("color", fontColor.value);
        $(".arco-popover-popup-arrow").css({"backgroundColor": backgroundColor.value, border: "1px solid " + backgroundColor.value});
    });

    let holidayParameters = {
        "app_id": "cicgheqakgmpjclo",
        "app_secret": "RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09",
    };
    $.ajax({
        url: "https://www.mxnzp.com/api/holiday/single/" + getTimeDetails(new Date()).showDate3,
        type: "GET",
        data: holidayParameters,
        timeout: 5000,
        success: (resultData) => {
            if (resultData.code === 1) {
                let holidayContent = resultData.data.solarTerms;
                if (resultData.data.solarTerms.indexOf("后") === -1) {
                    holidayContent = "今日" + holidayContent;
                }
                let temp = getTimeDetails(new Date());

                greetContent.value += " ｜ " + holidayContent;
                calendar.value = temp.showDate4 + " " + temp.showWeek + "｜" +
                    resultData.data.yearTips + resultData.data.chineseZodiac + "年｜" +
                    resultData.data.lunarCalendar;
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