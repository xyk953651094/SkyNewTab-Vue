<template>
    <a-space>
        <a-tooltip :content=greetContent>
            <a-button type="primary" shape="round" size="large" id="buttonGreet" class="frostedGlass zIndexHigh"
                      :style="{ cursor: 'default'}">
                <template #icon>
                    <icon-calendar-clock/>
                </template>
                {{ greetContent }}
            </a-button>
        </a-tooltip>
    </a-space>
</template>

<script setup>
import "../stylesheets/publicStyles.css"
import { defineProps, onMounted, ref, watch } from "vue"
import { IconCalendarClock } from "@arco-design/web-vue/es/icon";
import {changeThemeColor, getDate, getGreet} from "@/javascripts/publicFunctions";

const props = defineProps({
    imageColor: {
        type: String,
        default: () => {
            return "#2c3e50";
        },
        required: true
    }
});

let greetContent = ref(getGreet());
watch(() => props.imageColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        changeThemeColor("#buttonGreet", props.imageColor);
    }
})

onMounted(() => {
    let tempDate = getDate();
    let date = tempDate.year + tempDate.month + tempDate.day;

    let appId = 'cicgheqakgmpjclo'
    let appSecret = 'RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09'
    let holidayXHR = new XMLHttpRequest();
    holidayXHR.open('GET', 'https://www.mxnzp.com/api/holiday/single/' + date + '?app_id=' + appId + '&app_secret=' + appSecret)
    holidayXHR.onload = function () {
        if (holidayXHR.status === 200) {
            let holidayData = JSON.parse(holidayXHR.responseText);
            if (holidayData.code === 1) {
                let holidayContent = holidayData.data.solarTerms;
                if (holidayData.data.solarTerms.indexOf('后') === -1) {
                    holidayContent = '今日' + holidayContent;
                }
                greetContent.value += " | " + holidayContent;
            }
        }
    }
    holidayXHR.onerror = function () {

    }
    holidayXHR.send();
})
</script>

<style scoped>

</style>