<template>
    <a-space>
        <a-tooltip content="偏好设置">
            <a-button type="primary" shape="round" size="large" id="buttonPreference" class="frostedGlass zIndexHigh" @click="onclick"
                      :style="{display: display}">
                <template #icon>
                    <icon-settings />
                </template>
            </a-button>
            <a-drawer
                :width="340"
                :visible="visible"
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
                    偏好设置
                </template>
                <a-form layout="horizontal" auto-label-width>
                    <a-form-item field="switchDisplayImage" label="背景图片">
                        <a-switch default-checked>
                            <template #checked>开启</template>
                            <template #unchecked>关闭</template>
                        </a-switch>
                    </a-form-item>
                    <a-form-item field="switchImageEffect" label="图片质量">
                        <a-radio-group default-value="regular">
                            <a-radio value="regular">标准</a-radio>
                            <a-radio value="full">完整</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item field="switchDynamicImage" label="图片动效">
                        <a-switch default-checked>
                            <template #checked>开启</template>
                            <template #unchecked>关闭</template>
                        </a-switch>
                    </a-form-item>
                    <a-form-item field="switchImageEffect" label="动效样式">
                        <a-radio-group default-value="1">
                            <a-radio value="1">平移</a-radio>
                            <a-radio value="2">旋转</a-radio>
                        </a-radio-group>
                    </a-form-item>
                </a-form>
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
import {defineProps, ref, watch, onUpdated, onMounted} from "vue";
import {changeThemeColor, getFontColor} from "@/javascripts/publicFunctions";
const $ = require("jquery");

let visible = ref(false);
let backgroundColor = ref("");
let fontColor = ref("");

const props = defineProps({
    display: {
        type: String,
        default: () => {
            return "none";
        },
        required: true
    },
    themeColor: {
        type: String,
        default: () => {
            return "#2c3e50";
        },
        required: true
    }
});

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        changeThemeColor("#buttonPreference", props.themeColor);
        backgroundColor.value = props.themeColor;
        fontColor.value = getFontColor(props.themeColor);
    }
})

const onclick = () => {
    visible.value = true;
};

const handleOpen = () => {
    $(".arco-drawer-title").css("color", fontColor.value);     // 抽屉 header 样式
    $(".arco-form-item-label").css("color", fontColor.value);  // 抽屉 body 样式
    $(".arco-radio-label").css("color", fontColor.value);      // 抽屉 body 样式
    $(".arco-typography").css("color", fontColor.value);       // 抽屉 footer 样式
}

const handleOk = () => {
    visible.value = false;
};

const handleCancel = () => {
    visible.value = false;
}
</script>

<style scoped>

</style>