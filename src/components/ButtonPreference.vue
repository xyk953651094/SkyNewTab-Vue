<template>
    <a-space>
        <a-tooltip content="偏好设置" position="tr" :background-color="backgroundColor" :content-style="{color: fontColor}">
            <a-button type="primary" shape="round" size="large" id="buttonPreference" class="frostedGlass zIndexHigh" @click="onclick"
                      :style="{display: display}">
                <template #icon>
                    <icon-more-vertical />
                </template>
            </a-button>
            <a-drawer
                :width="340"
                :height="500"
                :visible="visible"
                :placement="drawerPosition"
                :drawer-style="{
                    backgroundColor: backgroundColor,
                    color: fontColor
                }"
                @ok="handleOk"
                @cancel="handleCancel"
                unmountOnClose
            >
                <template #title>
                    {{"菜单栏"}}
                </template>
                <a-row :gutter="[16, 16]">
                    <a-col :span="24">
                        <a-card title="偏好设置" size="small" >
                            <template #extra>
                                <icon-settings />
                            </template>
                            <a-form layout="vertical" :model="formInitialValues" auto-label-width>
                                <a-form-item field="displayEffectRadio" label="图片质量">
                                    <a-radio-group v-model="formInitialValues.displayEffectRadio" @change="displayEffectRadioOnChange">
                                        <a-radio value="regular">标准</a-radio>
                                        <a-radio value="full">较高</a-radio>
                                        <a-radio value="raw">最高</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                                <a-form-item field="dynamicEffectRadio" label="动效样式">
                                    <a-radio-group v-model="formInitialValues.dynamicEffectRadio" @change="dynamicEffectRadioOnChange">
                                        <a-radio value="close">关闭</a-radio>
                                        <a-radio value="translate">平移</a-radio>
                                        <a-radio value="rotate">旋转</a-radio>
                                        <a-radio value="all">全部</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                                <a-form-item field="imageTopicsCheckbox" label="图片主题">
                                    <a-space direction="vertical" size="small" fill>
                                        <a-alert>全不选与全选效果相同</a-alert>
                                        <a-checkbox-group v-model="formInitialValues.imageTopicsCheckbox" direction="horizontal" @change="imageTopicsCheckboxOnChange">
                                            <a-row>
                                                <a-col :span="12"><a-checkbox name="travel"             value="Fzo3zuOHN6w">旅游</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="wallpapers"         value="bo8jQKTaE0Y">壁纸</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="3d-renders"         value="CDwuwXJAbEw">3D渲染</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="textures-patterns"  value="iUIsnVtjB0Y">纹理</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="experimental"       value="qPYsDzvJOYc">实验</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="architecture"       value="rnSKDHwwYUk">建筑</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="nature"             value="6sMVjTLSkeQ">自然</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="business-work"      value="aeu6rL-j6ew">商务</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="fashion"            value="S4MKLAsBB74">时尚</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="film"               value="hmenvQhUmxM">电影</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="food-drink"         value="xjPR4hlkBGA">饮食</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="health"             value="_hb-dl4Q-4U">健康</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="people"             value="towJZFskpGg">人物</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="interiors"          value="R_Fyn-Gwtlw">精神</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="street-photography" value="xHxYTMHLgOc">街头</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="animals"            value="Jpg6Kidl-Hk">动物</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="spirituality"       value="_8zFHuhRhyo">灵魂</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="arts-culture"       value="bDo48cUhwnY">文化</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="history"            value="dijpbw99kQQ">历史</a-checkbox></a-col>
                                                <a-col :span="12"><a-checkbox name="athletics"          value="Bn-DjrcBrwo">体育</a-checkbox></a-col>
                                            </a-row>
                                        </a-checkbox-group>
                                    </a-space>
                                </a-form-item>>
                            </a-form>
                        </a-card>
                    </a-col>
                    <a-col :span="24">
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
                    </a-col>
                    <a-col :span="24">
                        <a-card title="其它作品" size="small" >
                            <template #extra>
                                <icon-apps />
                            </template>
                            <a-list size="small" :bordered=false hoverable>
                                <a-list-item>
                                    <a-list-item-meta title="Sky 诗词新标签页">
                                        <template #avatar>
                                            <a-avatar shape="square">
                                                <img alt="avatar" src="../assets/otherApps/skyNewTabPoem.png" />
                                            </a-avatar>
                                        </template>
                                        <template #description>
                                            <a-link href="https://www.baidu.com">前往扩展商店</a-link>
                                        </template>
                                    </a-list-item-meta>
                                </a-list-item>
                                <a-list-item>
                                    <a-list-item-meta title="Sky 新标签页">
                                        <template #avatar>
                                            <a-avatar shape="square">
                                                <img alt="avatar" src="../assets/otherApps/skyNewTab.png" />
                                            </a-avatar>
                                        </template>
                                        <template #description>
                                            <a-link href="https://www.baidu.com">前往扩展商店</a-link>
                                        </template>
                                    </a-list-item-meta>
                                </a-list-item>
                            </a-list>
                        </a-card>
                    </a-col>
                </a-row>
                <template #footer>
                    <a-typography-text>
                        Sky 新标签页 Pro V1.0.3
                    </a-typography-text>
                </template>
            </a-drawer>
        </a-tooltip>
    </a-space>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {IconMoreVertical, IconSettings, IconHeart, IconAlipayCircle, IconWechatpay, IconApps} from "@arco-design/web-vue/es/icon";
import {getFontColor, getDevice, changeThemeColor} from "@/javascripts/publicFunctions";
import {Message} from "@arco-design/web-vue";
const $ = require("jquery");

let visible = ref(false);
let drawerPosition = ref("right");
let backgroundColor = ref("");
let fontColor = ref("");
let formInitialValues = ref({
    displayEffectRadio: "regular",
    dynamicEffectRadio: "all",
    imageTopicsCheckbox: ["Fzo3zuOHN6w"],
})

const props = defineProps({
    themeColor: {
        type: String,
        required: true
    },
    display: {
        type: String,
        default: () => {
            return "none";
        },
        required: true
    },
});

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        backgroundColor.value = props.themeColor;
        fontColor.value = getFontColor(props.themeColor);
        changeThemeColor("#buttonPreference", props.themeColor);
    }
})

onMounted(() => {
    // 初始化偏好设置
    let tempDisplayEffectRadio = localStorage.getItem("displayEffect");
    let tempDynamicEffectRadio = localStorage.getItem("dynamicEffect");
    let tempImageTopicsCheckbox = localStorage.getItem("imageTopics");
    if (tempImageTopicsCheckbox !== null) {
        tempImageTopicsCheckbox = tempImageTopicsCheckbox.split(",");
    }

    formInitialValues.value =  {
        displayEffectRadio: tempDisplayEffectRadio === null ? "regular" : tempDisplayEffectRadio,
        dynamicEffectRadio: tempDynamicEffectRadio === null ? "all" : tempDynamicEffectRadio,
        imageTopicsCheckbox: tempImageTopicsCheckbox === null ? ["Fzo3zuOHN6w"] : tempImageTopicsCheckbox,
    }

    // 屏幕适配
    let device = getDevice();
    if(device === "iPhone" || device === "Android") {
        drawerPosition.value = "bottom";
    }

    // 修改各类弹窗样式
    $("body").bind("DOMNodeInserted", () => {
        // popover
        let popoverEle = $(".arco-popover");
        if (popoverEle.length && popoverEle.length > 0) {
            $(".arco-popover-title").css("color", fontColor.value);
            $(".arco-popover-popup-arrow").css({"backgroundColor": backgroundColor.value, border: "1px solid " + backgroundColor.value});
        }

        // message
        let messageEle = $(".arco-message");
        if(messageEle.length && messageEle.length > 0) {
            messageEle.css({"backgroundColor": backgroundColor.value, "border-color": backgroundColor.value});
            $(".arco-message-icon").css("color", fontColor.value);
            $(".arco-message-content").css("color", fontColor.value);
        }

        // drawer
        let drawerEle = $(".arco-drawer");
        if (drawerEle.length && drawerEle.length > 0) {
            $(".arco-drawer-close-btn").css("color", fontColor.value);
            $(".arco-drawer-title").css("color", fontColor.value);
            $(".arco-card").css("border", "1px solid " + fontColor.value);
            $(".arco-card-header").css({"backgroundColor": backgroundColor.value, "borderBottom": "1px solid " + fontColor.value});
            $(".arco-card-header-title").css("color", fontColor.value);
            $(".arco-card-header-extra").css("color", fontColor.value);
            $(".arco-card-body").css("backgroundColor", backgroundColor.value);
            $(".arco-typography").css("color", fontColor.value);
            $(".arco-form-item-label").css("color", fontColor.value);
            $(".arco-radio-label").css("color", fontColor.value);
            $(".arco-checkbox-label").css("color", fontColor.value);
            $(".arco-collapse-item-header").css({"backgroundColor": backgroundColor.value, "color": fontColor.value});
            $(".arco-collapse-item-content").css({"backgroundColor": backgroundColor.value, "color": fontColor.value});
            $(".arco-list-item-meta-title").css("color", fontColor.value);
        }
    });
})

const onclick = () => {
    visible.value = true;
};

const handleOk = () => {
    visible.value = false;
};

const handleCancel = () => {
    visible.value = false;
}

const emit = defineEmits(["displayEffect","dynamicEffect","imageTopics"]);

// 图片质量
const displayEffectRadioOnChange = (value) => {
    emit("displayEffect", value);
    localStorage.setItem("displayEffect", value);
    Message.success("调整成功，新的图片质量将在下次加载时生效");
}

// 动效样式
const dynamicEffectRadioOnChange = (value) => {
    emit("dynamicEffect", value);
    localStorage.setItem("dynamicEffect", value);
    Message.success("调整成功，新的显示效果已生效");
}

// 图片主题
const imageTopicsCheckboxOnChange = (values) =>  {
    let value = "";
    for (let i = 0; i < values.length; i++) {
        value += values[i];
        if (i !== values.length - 1) {
            value += ",";
        }
    }
    emit("imageTopics", value);
    localStorage.setItem("imageTopics", value);
    Message.success("调整成功，新的主题将在下次加载时生效");
    if (values.length === 0) {
        Message.info("全不选与全选的效果一样");
    }
}
</script>

<style scoped>

</style>