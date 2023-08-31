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
            <a-form-item field="dynamicEffect" label="图片动效">
                <a-radio-group v-model="preferenceData.dynamicEffect"
                               @change="dynamicEffectRadioOnChange">
                    <a-row>
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
                    <a-row>
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
                    <a-row>
                        <a-col :span="12">
                            <a-checkbox name="travel" value="Fzo3zuOHN6w">旅游</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="wallpapers" value="bo8jQKTaE0Y">壁纸</a-checkbox>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox name="3d-renders" value="CDwuwXJAbEw">3D渲染</a-checkbox>
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
            <a-form-item field="customTopic" label="其它主题">
                <a-input v-model="preferenceData.customTopic"
                         :default-value="preferenceData.customTopic"
                         allow-clear
                         placeholder="输入后按下 Enter 键生效" @change="customTopicsInputOnChange"/>
                <template #extra>
                    <a-space direction="vertical">
                        <a-typography-text :style="{color: fontColor}">按下回车生效，英文结果最准确
                        </a-typography-text>
                        <a-typography-text :style="{color: fontColor}">
                            其它主题不为空时将禁用图片主题
                        </a-typography-text>
                    </a-space>
                </template>
            </a-form-item>
        </a-form>
    </a-card>
</template>

<script setup>
import {isEmptyString} from "../javascripts/publicFunctions";
import {defineProps, onMounted, ref} from "vue";
import {defaultPreferenceData} from "../javascripts/publicConstants";
import {Message} from "@arco-design/web-vue";

let preferenceData = ref(defaultPreferenceData);
let disableImageTopic = ref(false);

defineProps({
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
    // 初始化偏好设置
    let tempPreferenceData = localStorage.getItem("preferenceData");
    if (tempPreferenceData === null) {
        localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        preferenceData.value = defaultPreferenceData;
    } else {
        preferenceData.value = JSON.parse(tempPreferenceData);
    }
    disableImageTopic.value = !isEmptyString(preferenceData.value.customTopic);
})

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
function customTopicsInputOnChange(value) {
    preferenceData.value.customTopic = value;
    emit("preferenceData", preferenceData.value);
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData.value));
    Message.success("已更换自定义主题，下次加载时生效");
    disableImageTopic.value = !isEmptyString(value);
}

function refreshWindow() {
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}
</script>

<style scoped>

</style>