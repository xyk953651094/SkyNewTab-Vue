<template>
    <a-row>
        <a-space align="center" size="mini" id="clock" class="zIndexHigh">
            <a-typography-text :style="{fontSize: '60px', height: '60px', lineHeight: '60px', color: backgroundColor}">
                {{currentTime}}
            </a-typography-text>
            <a-space align="center" size="mini" direction="vertical">
                <a-typography-text :style="{fontSize: '20px', height: '20px', lineHeight: '20px', color: backgroundColor}">
                    {{currentWeek}}
                </a-typography-text>
                <a-typography-text :style="{fontSize: '20px', height: '20px', lineHeight: '20px', color: backgroundColor}">
                    {{currentDate}}
                </a-typography-text>
            </a-space>
        </a-space>
    </a-row>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {getTimeDetails} from "../javascripts/publicFunctions";

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
let timeDetails = ref(getTimeDetails(new Date()));
let currentTime = ref(timeDetails.value.showTime);
let currentWeek = ref(timeDetails.value.showWeek);
let currentDate = ref(timeDetails.value.showDate4);

onMounted(()=>{
    setInterval(()=>{
        timeDetails.value = getTimeDetails(new Date());
        currentTime.value = timeDetails.value.showTime;
        currentWeek.value = timeDetails.value.showWeek;
        currentDate.value = timeDetails.value.showDate4;
    }, 1000);
})

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
    }
})

</script>

<style scoped>

</style>