<template>
    <a-space>
        <a-popover position="tr"
                   :title="popoverTitle"
                   :arrow-style="{backgroundColor: backgroundColor, border: '1px solid' + backgroundColor}"
                   :content-style="{ backgroundColor: backgroundColor, color: fontColor, border: 'none' }"
        >
            <a-button type="primary" shape="round" size="large" id="buttonCreateTime" class="componentTheme zIndexHigh"
                      :style="{display: display}">
                <template #icon>
                    <icon-calendar-clock />
                </template>
                {{ createTime }}
            </a-button>
            <template #content>
                <p class="createTimePopoverP"><icon-info-circle />{{" 图片描述：" + (description == null? "暂无信息" : description)}}</p>
                <p class="createTimePopoverP"><icon-message />{{" 附加描述：" + (altDescription == null? "暂无信息" : altDescription)}}</p>
            </template>
        </a-popover>
    </a-space>
</template>

<script setup>
import {defineProps, ref, watch} from "vue"
import {IconInfoCircle, IconMessage} from "@arco-design/web-vue/es/icon";
import {changeThemeColor} from "@/javascripts/publicFunctions";
import "../stylesheets/createTimeComponent.less"

let backgroundColor = ref("");
let fontColor = ref("");
let createTime = ref("暂无信息");
let popoverTitle = ref("暂无信息");
let description = ref("暂无信息");
let altDescription = ref("暂无信息");

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
    },
    display: {
        type: String,
        default: () => {
            return "none";
        },
        required: true
    },
    imageData: {
        type: Object,
        required: true
    }
});

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#buttonCreateTime", backgroundColor.value, fontColor.value);
    }
})

watch(() => props.imageData, (newValue, oldValue) => {
    if(newValue !== oldValue) {
        createTime.value = props.imageData.created_at.split("T")[0];
        popoverTitle.value = "拍摄日期：" + createTime.value;
        description.value = props.imageData.description;
        altDescription.value = props.imageData.alt_description;
    }
})
</script>