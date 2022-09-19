<template>
    <a-space>
        <a-tooltip content="偏好设置">
            <a-button type="primary" shape="round" size="large" id="buttonPreference" class="frostedGlass zIndexHigh" @click="onclick"
                      :style="{display: display, backgroundColor: backgroundColor, color: fontColor}">
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
                @open="handleOpen"
                @ok="handleOk"
                @cancel="handleCancel"
                unmountOnClose
            >
                <template #title>
                    抽屉
                </template>
                <a-row :gutter="[16, 16]">
                    <a-col :span="24">
                        <a-card :title="timeDetails[0]" header-style="{fontSize: 16px}" body-style="{fontSize: 16px}" size="small" hoverable>
                            <a-typography-paragraph>
                                <ul>
                                    <li>
                                        <a-typography-text>{{timeDetails[1]}}</a-typography-text>
                                    </li>
                                    <li>
                                        <a-typography-text>{{timeDetails[1]}}</a-typography-text>
                                    </li>
                                    <li>
                                        <a-typography-text>{{timeDetails[1]}}</a-typography-text>
                                    </li>
                                </ul>
                            </a-typography-paragraph>
                        </a-card>
                    </a-col>
                    <a-col :span="24">
                        <a-card title="【唐】· 张若虚 ·《春江花月夜》" header-style="{fontSize: 16px}" body-style="{fontSize: 16px}" size="small" hoverable>
                            <a-typography-paragraph>
                                「 江畔何人初见月，江月何年初照人，江畔何人初见月，江月何年初照人，江畔何人初见月，江月何年初照人 」
                            </a-typography-paragraph>
                        </a-card>
                    </a-col>
                    <a-col :span="24">
                        <a-card title="偏好设置" header-style="{fontSize: 16px}" body-style="{fontSize: 16px}" size="small" hoverable>
                            <a-form layout="horizontal" auto-label-width>
                                <a-form-item field="displayEffectRadio" label="图片质量">
                                    <a-radio-group default-value="regular" v-model="displayEffectRadioCheckedValue"
                                                   @change="displayEffectRadioOnChange"
                                    >
                                        <a-radio value="regular">标准</a-radio>
                                        <a-radio value="full">最高</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                                <a-form-item field="dynamicEffectRadio" label="动效样式">
                                    <a-radio-group default-value="translate" v-model="dynamicEffectRadioCheckedValue"
                                                   @change="dynamicEffectRadioOnChange"
                                    >
                                        <a-radio value="close">关闭</a-radio>
                                        <a-radio value="translate">平移</a-radio>
                                        <a-radio value="rotate">旋转</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                                <a-form-item field="imageTopicsCheckbox" label="图片主题">
                                    <a-checkbox-group direction="horizontal" v-model="imageTopicsCheckboxCheckedValue" @change="imageTopicsCheckboxOnChange">
                                        <a-row>
                                            <a-col :span="12"><a-checkbox value="travel">旅游</a-checkbox></a-col>
                                            <a-col :span="12"><a-checkbox value="wallpapers">壁纸</a-checkbox></a-col>
                                            <a-col :span="12"><a-checkbox value="textures-patterns">纹理 & 图案</a-checkbox></a-col>
                                            <a-col :span="12"><a-checkbox value="nature">自然</a-checkbox></a-col>
                                            <a-col :span="12"><a-checkbox value="interiors">精神</a-checkbox></a-col>
                                            <a-col :span="12"><a-checkbox value="street-photography">街头摄影</a-checkbox></a-col>
                                            <a-col :span="12"><a-checkbox value="arts-culture">艺术 & 文化</a-checkbox></a-col>
                                        </a-row>
                                    </a-checkbox-group>
                                </a-form-item>
                            </a-form>
                        </a-card>
                    </a-col>
                </a-row>
                <template #footer>
                    <a-typography-text>
                        版本号：V1.0.3
                    </a-typography-text>
                </template>
            </a-drawer>
        </a-tooltip>
    </a-space>
</template>

<script setup>
import {defineProps, onBeforeMount, onMounted, ref, watch} from "vue";
import {IconMoreVertical} from "@arco-design/web-vue/es/icon";
import {getTimeDetails, changeThemeColor, getFontColor, deviceModel} from "@/javascripts/publicFunctions";
const $ = require("jquery");

let visible = ref(false);
let drawerPosition = ref("right");
let backgroundColor = ref("");
let fontColor = ref("");
let displayEffectRadioCheckedValue = ref("regular");
let dynamicEffectRadioCheckedValue = ref("1");
let imageTopicsCheckboxCheckedValue = ref([]);
let timeDetails = ref([]);

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
        changeThemeColor("#buttonPreference", props.themeColor);
        backgroundColor.value = props.themeColor;
        fontColor.value = getFontColor(props.themeColor);
    }
})

onBeforeMount(() => {
    let device = deviceModel();
    if(device === "iPhone" || device === "Android") {
        drawerPosition.value = "bottom";
    }
})

onMounted(() => {
    let temp = getTimeDetails(new Date());
    timeDetails.value = [temp.showDate2 + " " + temp.showWeek, temp.showLocaleDate];
})

const onclick = () => {
    visible.value = true;
};

const handleOpen = () => {
    $(".arco-drawer-title").css("color", fontColor.value);                                       // 抽屉 header 样式
    $(".arco-card-header").css("backgroundColor", backgroundColor.value);  // 抽屉 body 样式
    $(".arco-card-header-title").css("color", fontColor.value);
    $(".arco-card-body").css("backgroundColor", backgroundColor.value);
    $(".arco-typography").css("color", fontColor.value);
    $(".arco-form-item-label").css({"color": fontColor.value, "fontSize": "16px"});
    $(".arco-radio-label").css({"color": fontColor.value, "fontSize": "16px"});
    $(".arco-checkbox-label").css({"color": fontColor.value, "fontSize": "16px"});
}

const handleOk = () => {
    visible.value = false;
};

const handleCancel = () => {
    visible.value = false;
}

// 图片质量
const displayEffectRadioOnChange = (value) => {
    console.log(value);
}

// 动效样式
const dynamicEffectRadioOnChange = (value) => {
    console.log(value);
}

// 图片主题
const imageTopicsCheckboxOnChange = (values) =>  {
    console.log('checked = ', values);
}
</script>

<style scoped>

</style>