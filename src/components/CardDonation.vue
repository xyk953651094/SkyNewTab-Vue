<template>
    <a-card title="捐款支持" size="small" >
        <template #extra>
            <icon-heart />
        </template>
        <a-space direction="vertical" size="small" fill>
            <a-alert type="warning">捐款不会为您带来额外体验</a-alert>
            <a-collapse :accordion=true :bordered=false>
                <a-collapse-item header="支付宝" key="AliPay" :style="{backgroundColor: backgroundColor}">
                    <template #expand-icon>
                        <icon-alipay-circle />
                    </template>
                    <div>Beijing Toutiao Technology Co., Ltd.</div>
                    <div>Beijing Toutiao Technology Co., Ltd.</div>
                    <div>Beijing Toutiao Technology Co., Ltd.</div>
                </a-collapse-item>
                <a-collapse-item header="微信支付" key="WeChatPay">
                    <template #expand-icon>
                        <icon-wechatpay/>
                    </template>
                    <div>Beijing Toutiao Technology Co., Ltd.</div>
                    <div>Beijing Toutiao Technology Co., Ltd.</div>
                    <div>Beijing Toutiao Technology Co., Ltd.</div>
                </a-collapse-item>
                <a-collapse-item header="PayPal" key="PayPal">
                    <div>Beijing Toutiao Technology Co., Ltd.</div>
                    <div>Beijing Toutiao Technology Co., Ltd.</div>
                    <div>Beijing Toutiao Technology Co., Ltd.</div>
                </a-collapse-item>
            </a-collapse>
        </a-space>
    </a-card>
</template>

<script setup>
import {defineProps, ref, watch} from "vue"
import {IconHeart, IconAlipayCircle, IconWechatpay} from "@arco-design/web-vue/es/icon";


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

watch(() => props.themeColor, (newValue, oldValue) => {
    if(newValue !== oldValue) {
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
    }
})
</script>

<style scoped>

</style>