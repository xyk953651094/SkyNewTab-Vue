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
                            <a-radio value="all">视差</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="translate">平移</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="rotate">旋转</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="close">关闭</a-radio>
                        </a-col>
                    </a-row>
                </a-radio-group>
            </a-form-item>
            <a-form-item field="imageQuality" label="图片质量">
                <a-radio-group v-model="preferenceData.imageQuality"
                               @change="imageQualityRadioOnChange">
                    <a-row :gutter="[0, 8]">
                        <a-col :span="12">
                            <a-radio value="full">最高</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="regular">标准</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="small">较低</a-radio>
                        </a-col>
                        <a-col :span="12">
                            <a-radio value="small_s3">最低</a-radio>
                        </a-col>
                    </a-row>
                </a-radio-group>
            </a-form-item>
            <a-form-item field="imageTopics" label="图片主题">
                <a-checkbox-group v-model="preferenceData.imageTopics" :disabled="disableImageTopic"
                                  direction="horizontal" @change="imageTopicsCheckboxOnChange">
                    <a-row :gutter="[0, 8]">
                        <a-col :span="12">
                            <a-checkbox name="travel" value="Fzo3zuOHN6w">旅游</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="wallpapers" value="bo8jQKTaE0Y">壁纸</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="3d-renders" value="CDwuwXJAbEw">三维</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="textures-patterns" value="iUIsnVtjB0Y">纹理
                            </a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="experimental" value="qPYsDzvJOYc">实验</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="architecture" value="rnSKDHwwYUk">建筑</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="nature" value="6sMVjTLSkeQ">自然</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="business-work" value="aeu6rL-j6ew">商务</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="fashion" value="S4MKLAsBB74">时尚</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="film" value="hmenvQhUmxM">电影</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="food-drink" value="xjPR4hlkBGA">饮食</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="health" value="_hb-dl4Q-4U">健康</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="people" value="towJZFskpGg">人物</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="interiors" value="R_Fyn-Gwtlw">精神</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="street-photography" value="xHxYTMHLgOc">街头
                            </a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="animals" value="Jpg6Kidl-Hk">动物</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="spirituality" value="_8zFHuhRhyo">灵魂</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="arts-culture" value="bDo48cUhwnY">文化</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="history" value="dijpbw99kQQ">历史</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="athletics" value="Bn-DjrcBrwo">体育</a-checkbox>
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
                    <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                              :style="{color: fontColor}" :shape="preferenceData.buttonShape"
                              type="text" @click="submitCustomTopicBtnOnClick"
                    >
                        <template #icon>
                            <icon-check/>
                        </template>
                    </a-button>
                    <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                              :style="{color: fontColor}" :shape="preferenceData.buttonShape"
                              type="text" @click="clearCustomTopicBtnOnClick"
                    >
                        <template #icon>
                            <icon-stop />
                        </template>
                    </a-button>
                </a-space>
            </a-form-item>
            <a-form-item field="changeImageTime" label="切换间隔">
                <a-select v-model="preferenceData.changeImageTime" :style="{width:'162px'}" @change="changeImageTimeOnChange">
                    <a-option value="900000">{{"每 15 分钟"}}</a-option>
                    <a-option value="1800000">{{"每 30 分钟"}}</a-option>
                    <a-option value="3600000">{{"每 60 分钟"}}</a-option>
                </a-select>
                <template #extra>
                    <a-typography-text :style="{color: fontColor}">{{"上次切换：" + lastRequestTime}}</a-typography-text>
                </template>
            </a-form-item>
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-item field="nightMode" label="降低亮度">
                        <a-switch v-model="preferenceData.nightMode" @change="nightModeSwitchOnChange">
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
                    <a-form-item field="noImageMode" label="夜间模式">
                        <a-switch v-model="preferenceData.autoDarkMode" @change="autoDarkModeSwitchOnChange">
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
                        <a-switch v-model="preferenceData.noImageMode" @change="noImageModeSwitchOnChange">
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
            <a-alert :show-icon="false" title="提示信息" type="info"
                     :style="{display: preferenceData.displayAlert ? 'block' : 'none'}">
                <a-typography-paragraph>
                    <ol>
                        <a-space direction="vertical">
                            <li>新的主题刷新后可能不会立即生效</li>
                            <li>启用自定主题时不能使用图片主题</li>
                            <li>禁用自定主题时才能使用图片主题</li>
                            <li>夜间模式于18点至6点自动降低亮度</li>
                        </a-space>
                    </ol>
                </a-typography-paragraph>
            </a-alert>
        </a-form>
    </a-card>
</template>

<script setup>
import {IconCheck, IconStop} from "@arco-design/web-vue/es/icon";
import {
    getFontColor,
    getPreferenceDataStorage,
    getTimeDetails,
    isEmpty
} from "../javascripts/publicFunctions";
import {defineProps, onMounted, ref} from "vue";
import {Message} from "@arco-design/web-vue";

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

function btnMouseOver() {
    this.style.backgroundColor = props.hoverColor;
    this.style.color = getFontColor(props.hoverColor);
}

function btnMouseOut() {
    this.style.backgroundColor = "transparent";
    this.style.color = props.fontColor;
}

// 动效样式
function dynamicEffectRadioOnChange(value) {
    preferenceData.value.dynamicEffect = value;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    Message.success("已更换显示效果，一秒后刷新页面");
    refreshWindow();
}

// 图片质量
function imageQualityRadioOnChange(value) {
    preferenceData.value.imageQuality = value;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    Message.success("已更新图片质量，一秒后刷新页面");
    refreshWindow();
}

// 图片主题
function imageTopicsCheckboxOnChange(values) {
    preferenceData.value.imageTopics = values;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    Message.success("已更换图片主题，下次加载时生效");
    if (values.length === 0) {
        Message.info("全不选与全选的效果一样");
    }
}

// 自定义主题
function submitCustomTopicBtnOnClick() {
    let inputValue = document.getElementById("customTopicInput").children[0].value;
    preferenceData.value.customTopic = inputValue;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    Message.success("已启用自定主题，一秒后刷新页面");
    disableImageTopic.value = !isEmpty(inputValue);
    refreshWindow();
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
        Message.success("已降低背景亮度，一秒后刷新页面");
    } else {
        Message.success("已恢复背景亮度，一秒后刷新页面");
    }
    refreshWindow();
}

function autoDarkModeSwitchOnChange(checked) {
    preferenceData.value.autoDarkMode = checked;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));

    let currentTime = parseInt(getTimeDetails(new Date()).hour);
    if(currentTime > 18 || currentTime < 6) {
        if (checked) {
            Message.success("已开启夜间自动降低背景亮度，一秒后刷新页面");
        } else {
            Message.success("已关闭夜间自动降低背景亮度，一秒后刷新页面");
        }
        refreshWindow();
    }
    else {
        if (checked) {
            Message.success("已开启夜间自动降低背景亮度");
        } else {
            Message.success("已关闭夜间自动降低背景亮度");
        }
    }
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