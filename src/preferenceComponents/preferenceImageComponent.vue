<template>
    <a-card :body-style="{backgroundColor: backgroundColor}"
            :header-style="{backgroundColor: backgroundColor, color: fontColor, borderBottom: '1px solid ' + fontColor}"
            :style="{border: '1px solid' + fontColor}"
            size="small"
            title="背景设置"
    >
        <template #extra>
            <icon-settings/>
        </template>
        <a-form :model="preferenceData" auto-label-width>
            <a-form-item field="dynamicEffect" label="鼠标互动">
                <a-radio-group v-model="preferenceData.dynamicEffect"
                               @change="dynamicEffectRadioOnChange">
                    <a-row :gutter="[0, 8]">
                        <a-col :span="12">
                            <a-radio value="all" id="all">视差</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="translate" id="translate">平移</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="rotate" id="rotate">旋转</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="close" id="close">关闭</a-radio>
                        </a-col>
                    </a-row>
                </a-radio-group>
            </a-form-item>
            <a-form-item field="imageQuality" label="图片质量">
                <a-radio-group v-model="preferenceData.imageQuality"
                               :style="{width: '100%'}" @change="imageQualityRadioOnChange">
                    <a-row>
                        <a-col :span="12">
                            <a-radio value="full" id="full">清晰</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="regular" id="regular">省流</a-radio>
                        </a-col>
                    </a-row>
                </a-radio-group>
            </a-form-item>
            <a-form-item field="imageTopics" label="图片主题">
                <a-checkbox-group v-model="preferenceData.imageTopics" :disabled="disableImageTopic"
                                  direction="horizontal" @change="imageTopicsCheckboxOnChange">
                    <a-row :gutter="[0, 8]">
                        <a-col :span="12">
                            <a-checkbox name="travel" value="Fzo3zuOHN6w" id="Fzo3zuOHN6w">旅游</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="wallpapers" value="bo8jQKTaE0Y" id="bo8jQKTaE0Y">壁纸</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="3d-renders" value="CDwuwXJAbEw" id="CDwuwXJAbEw">三维</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="textures-patterns" value="iUIsnVtjB0Y" id="iUIsnVtjB0Y">纹理
                            </a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="experimental" value="qPYsDzvJOYc" id="qPYsDzvJOYc">实验</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="architecture" value="rnSKDHwwYUk" id="rnSKDHwwYUk">建筑</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="nature" value="6sMVjTLSkeQ" id="6sMVjTLSkeQ">自然</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="business-work" value="aeu6rL-j6ew" id="aeu6rL-j6ew">商务</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="fashion" value="S4MKLAsBB74" id="S4MKLAsBB74">时尚</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="film" value="hmenvQhUmxM" id="hmenvQhUmxM">电影</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="food-drink" value="xjPR4hlkBGA" id="xjPR4hlkBGA">饮食</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="health" value="_hb-dl4Q-4U" id="_hb-dl4Q-4U">健康</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="people" value="towJZFskpGg" id="towJZFskpGg">人物</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="interiors" value="R_Fyn-Gwtlw" id="R_Fyn-Gwtlw">精神</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="street-photography" value="xHxYTMHLgOc" id="xHxYTMHLgOc">街头
                            </a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="animals" value="Jpg6Kidl-Hk" id="Jpg6Kidl-Hk">动物</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="spirituality" value="_8zFHuhRhyo" id="_8zFHuhRhyo">灵魂</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="arts-culture" value="bDo48cUhwnY" id="bDo48cUhwnY">文化</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="history" value="dijpbw99kQQ" id="dijpbw99kQQ">历史</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="athletics" value="Bn-DjrcBrwo" id="Bn-DjrcBrwo">体育</a-checkbox>
                        </a-col>
                    </a-row>
                </a-checkbox-group>
            </a-form-item>
            <a-form-item label="自定主题">
                <a-space>
                    <a-form-item field="customTopic" no-style>
                        <a-input id="customTopicInput"
                                 v-model="preferenceData.customTopic"
                                 :default-value="preferenceData.customTopic"
                                 allow-clear
                                 placeholder="英文搜索最准确"/>
                    </a-form-item>
                    <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                              type="text" @click="submitCustomTopicBtnOnClick"
                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
                    >
                        <template #icon>
                            <icon-check/>
                        </template>
                    </a-button>
                    <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                              type="text" @click="clearCustomTopicBtnOnClick"
                              @mouseout="btnMouseOut(fontColor, $event)" @mouseover="btnMouseOver(hoverColor, $event)"
                    >
                        <template #icon>
                            <icon-stop/>
                        </template>
                    </a-button>
                </a-space>
            </a-form-item>
            <a-form-item field="changeImageTime" label="切换间隔">
                <a-select v-model="preferenceData.changeImageTime" :style="{width:'162px'}"
                          @change="changeImageTimeOnChange">
                    <a-option value="900000">{{ "每 15 分钟" }}</a-option>
                    <a-option value="1800000">{{ "每 30 分钟" }}</a-option>
                    <a-option value="3600000">{{ "每 60 分钟" }}</a-option>
                </a-select>
                <template #extra>
                    <a-typography-text :style="{color: fontColor}">{{ "上次切换：" + lastRequestTime }}
                    </a-typography-text>
                </template>
            </a-form-item>
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-item field="nightMode" label="降低亮度">
                        <a-switch v-model="preferenceData.nightMode" id="nightModeSwitch" @change="nightModeSwitchOnChange">
                            <template #checked>
                                已开启
                            </template>
                            <template #unchecked>
                                已关闭
                            </template>
                        </a-switch>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item field="noImageMode" label="无图模式">
                        <a-switch v-model="preferenceData.noImageMode" id="noImageModeSwitch" @change="noImageModeSwitchOnChange">
                            <template #checked>
                                已开启
                            </template>
                            <template #unchecked>
                                已关闭
                            </template>
                        </a-switch>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-card>
</template>

<script setup>
import {IconCheck, IconStop} from "@arco-design/web-vue/es/icon";
import {
    btnMouseOut,
    btnMouseOver,
    getPreferenceDataStorage,
    getTimeDetails,
    isEmpty, resetCheckboxColor, resetRadioColor, resetSwitchColor,
} from "@/javascripts/publicFunctions";
import {defineProps, onMounted, ref} from "vue";
import {Message} from "@arco-design/web-vue";
import {imageTopics} from "@/javascripts/publicConstants";

let preferenceData = ref(getPreferenceDataStorage());
let lastRequestTime = ref("暂无信息");
let disableImageTopic = ref(false);

const props = defineProps({
    hoverColor: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    },
    backgroundColor: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    },
    fontColor: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    }
});

const emit = defineEmits(["preferenceData"]);

onMounted(() => {
    let tempLastRequestTime = localStorage.getItem("lastImageRequestTime");
    if (tempLastRequestTime !== null) {
        lastRequestTime.value = getTimeDetails(new Date(parseInt(tempLastRequestTime))).showDetail;
    }

    disableImageTopic.value = !isEmpty(preferenceData.value.customTopic);
})

// 动效样式
function dynamicEffectRadioOnChange(value) {
    preferenceData.value.dynamicEffect = value;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    Message.success("已更换显示效果，一秒后刷新页面");

    resetRadioColor(value, ["all", "translate", "rotate", "close"], props.hoverColor);
    refreshWindow();
}

// 图片质量
function imageQualityRadioOnChange(value) {
    preferenceData.value.imageQuality = value;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    Message.success("已更新图片质量，一秒后刷新页面");

    resetRadioColor(value, ["full", "regular"], props.hoverColor);
    refreshWindow();
}

// 图片主题
function imageTopicsCheckboxOnChange(values) {
    preferenceData.value.imageTopics = values;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    Message.success("已更换图片主题，下次切换图片时生效");
    if (values.length === 0) {
        Message.info("全不选与全选的效果一样");
    }

    resetCheckboxColor(values, imageTopics, props.hoverColor);
}

// 自定义主题
function submitCustomTopicBtnOnClick() {
    let inputValue = document.getElementById("customTopicInput").children[0].value;
    preferenceData.value.customTopic = inputValue;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    Message.success("已启用自定主题，下次切换图片时生效");
    disableImageTopic.value = !isEmpty(inputValue);
}

function clearCustomTopicBtnOnClick() {
    preferenceData.value.customTopic = "";
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    Message.success("已禁用自定主题，一秒后刷新页面");
    disableImageTopic.value = false;
    refreshWindow();
}

function changeImageTimeOnChange(value) {
    console.log(value);
    preferenceData.value.changeImageTime = value;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    Message.success("已修改切换间隔，一秒后刷新页面");
    refreshWindow();
}

function nightModeSwitchOnChange(checked) {
    preferenceData.value.nightMode = checked;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    if (checked) {
        Message.success("已降低背景亮度");
    } else {
        Message.success("已恢复背景亮度");
    }

    resetSwitchColor("#nightModeSwitch", checked, props.hoverColor);
}

function noImageModeSwitchOnChange(checked) {
    preferenceData.value.noImageMode = checked;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    if (checked) {
        Message.success("已开启无图模式，一秒后刷新页面");
    } else {
        Message.success("已关闭无图模式，一秒后刷新页面");
    }

    resetSwitchColor("#noImageModeSwitch", checked, props.hoverColor);
    refreshWindow();
}

function refreshWindow() {
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}
</script>

<style scoped>

</style>