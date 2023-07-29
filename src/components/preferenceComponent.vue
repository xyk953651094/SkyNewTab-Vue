<template>
    <a-space>
        <a-tooltip :background-color="backgroundColor" :content-style="{color: fontColor}" content="菜单栏"
                   position="br">
            <a-button id="preferenceBtn" class="componentTheme zIndexHigh" shape="round" size="large" type="primary"
                      @click="showDrawerBtnOnClick">
                <template #icon>
                    <icon-more-vertical/>
                </template>
            </a-button>
            <a-drawer
                :closable="false"
                :drawer-style="{
                    backgroundColor: backgroundColor,
                    color: fontColor
                }"
                :height="500"
                :placement="drawerPosition"
                :visible="visible"
                :width="340"
                unmountOnClose
                @cancel="handleCancel"
                @ok="handleOk"
            >
                <template #title>
                    {{ "菜单栏" }}
                </template>
                <a-row :gutter="[16, 16]">
                    <a-col :span="24">
                        <a-card :body-style="{backgroundColor: backgroundColor}" :header-style="{backgroundColor: backgroundColor, color: fontColor, borderBottom: '1px solid ' + fontColor}"
                                :style="{border: '1px solid' + fontColor}"
                                size="small"
                                title="偏好设置"
                        >
                            <template #extra>
                                <icon-settings/>
                            </template>
                            <a-form :model="formInitialValues" auto-label-width layout="vertical">
                                <a-form-item field="searchEngineRadio" label="搜索引擎">
                                    <a-radio-group v-model="formInitialValues.searchEngineRadio"
                                                   @change="searchEngineRadioOnChange">
                                        <a-radio value="bing">必应</a-radio>
                                        <a-radio value="baidu">百度</a-radio>
                                        <a-radio value="google">谷歌</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                                <a-form-item field="dynamicEffectRadio" label="图片动效（推荐视差）">
                                    <a-radio-group v-model="formInitialValues.dynamicEffectRadio"
                                                   @change="dynamicEffectRadioOnChange">
                                        <a-radio value="all">视差</a-radio>
                                        <a-radio value="translate">平移</a-radio>
                                        <a-radio value="rotate">旋转</a-radio>
                                        <a-radio value="close">关闭</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                                <a-form-item field="imageQualityRadio" label="图片质量（推荐标准）">
                                    <a-radio-group v-model="formInitialValues.imageQualityRadio"
                                                   @change="imageQualityRadioOnChange">
                                        <a-radio value="full">高</a-radio>
                                        <a-radio value="regular">标准</a-radio>
                                        <a-radio value="small">低</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                                <a-form-item field="imageTopicsCheckbox" label="图片主题（全不选与全选效果一致）">
                                    <a-checkbox-group v-model="formInitialValues.imageTopicsCheckbox"
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
                                <a-form-item field="clearStorageButton" label="其他设置">
                                    <a-button id="clearStorageBtn" :onmouseout="btnMouseOut" :onmouseover="btnMouseOver"
                                              :style="{color: fontColor}" shape="round"
                                              type="text" @click="clearStorageBtnOnClick"
                                    >
                                        <template #icon>
                                            <icon-delete/>
                                        </template>
                                        清空缓存
                                    </a-button>
                                </a-form-item>
                            </a-form>
                        </a-card>
                    </a-col>
                    <a-col :span="24">
                        <a-card :body-style="{backgroundColor: backgroundColor}" :header-style="{backgroundColor: backgroundColor, borderBottom: '1px solid ' + fontColor}"
                                :style="{border: '1px solid' + fontColor}"
                                size="small"
                                title="网站链接"
                        >
                            <template #extra>
                                <icon-link/>
                            </template>
                            <a-space direction="vertical">
                                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}" href="https://unsplash.com/"
                                          shape="round"
                                          target="_blank" type="text">
                                    <a-avatar :size="16" :style="{backgroundColor: 'transparent'}" image-url="https://unsplash.com/favicon.ico"
                                              shape="square"/>
                                    &nbsp;&nbsp;Unsplash.com
                                </a-button>
                                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}" href="https://www.pexels.com/"
                                          shape="round"
                                          target="_blank" type="text">
                                    <a-avatar :size="16" :style="{backgroundColor: 'transparent'}" image-url="https://www.pexels.com/favicon.ico"
                                              shape="square"/>
                                    &nbsp;&nbsp;Pexels.com
                                </a-button>
                                <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}" href="https://pixabay.com/"
                                          shape="round"
                                          target="_blank" type="text">
                                    <a-avatar :size="16" :style="{backgroundColor: 'transparent'}" image-url="https://pixabay.com/favicon.ico"
                                              shape="square"/>
                                    &nbsp;&nbsp;Pixabay.com
                                </a-button>
                            </a-space>
                        </a-card>
                    </a-col>
                </a-row>
                <template #footer>
                    <a-space>
                        <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}" href="https://github.com/xyk953651094"
                                  shape="round" target="_blank" type="text">
                            <template #icon>
                                <icon-github/>
                            </template>
                            主页
                        </a-button>
                        <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}" href="https://xyk953651094.blogspot.com"
                                  shape="round" target="_blank" type="text">
                            <template #icon>
                                <icon-message/>
                            </template>
                            博客
                        </a-button>
                        <a-button :onmouseout="btnMouseOut" :onmouseover="btnMouseOver" :style="{color: fontColor}" href="https://afdian.net/a/xyk953651094"
                                  shape="round" target="_blank" type="text">
                            <template #icon>
                                <icon-gift/>
                            </template>
                            捐赠
                        </a-button>
                    </a-space>
                </template>
            </a-drawer>
        </a-tooltip>
    </a-space>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {
    IconDelete,
    IconGift,
    IconGithub,
    IconLink,
    IconMessage,
    IconMoreVertical,
    IconSettings,
} from "@arco-design/web-vue/es/icon";
import {changeThemeColor, getFontColor} from "../javascripts/publicFunctions";
import {Message} from "@arco-design/web-vue";
import {device} from "../javascripts/publicConstants";

let visible = ref(false);
let drawerPosition = ref("right");
let hoverColor = ref("");
let backgroundColor = ref("");
let fontColor = ref("");
let formInitialValues = ref({
    searchEngineRadio: "bing",
    dynamicEffectRadio: "all",
    imageQualityRadio: "regular",
    imageTopicsCheckbox: ["Fzo3zuOHN6w"],
})

const props = defineProps({
    themeColor: {
        type: Object,
        required: true,
        default: () => {
            return {
                "themeColor": "",
                "componentBackgroundColor": "",
                "componentFontColor": ""
            }
        }
    }
});

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        hoverColor.value = props.themeColor.themeColor;
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#preferenceBtn", backgroundColor.value, fontColor.value);
    }
})

onMounted(() => {
    // 初始化偏好设置
    let tempSearchEngineRadio = localStorage.getItem("searchEngine");
    let tempDynamicEffectRadio = localStorage.getItem("dynamicEffect");
    let tempImageQualityRadio = localStorage.getItem("imageQuality");
    let tempImageTopicsCheckbox = localStorage.getItem("imageTopics");
    if (tempImageTopicsCheckbox !== null) {
        tempImageTopicsCheckbox = tempImageTopicsCheckbox.split(",");
    }

    formInitialValues.value = {
        searchEngineRadio: tempSearchEngineRadio === null ? "bing" : tempSearchEngineRadio,
        dynamicEffectRadio: tempDynamicEffectRadio === null ? "all" : tempDynamicEffectRadio,
        imageQualityRadio: tempImageQualityRadio === null ? "regular" : tempImageQualityRadio,
        imageTopicsCheckbox: tempImageTopicsCheckbox === null ? ["Fzo3zuOHN6w"] : tempImageTopicsCheckbox,
    }

    // 屏幕适配
    if (device === "iPhone" || device === "Android") {
        drawerPosition.value = "bottom";
    }
})

function showDrawerBtnOnClick() {
    visible.value = true;
}

function handleOk() {
    visible.value = false;
}

function handleCancel() {
    visible.value = false;
}

const emit = defineEmits(["searchEngine", "dynamicEffect", "imageQuality", "imageTopics"]);

function btnMouseOver() {
    this.style.backgroundColor = hoverColor.value;
    this.style.color = getFontColor(hoverColor.value);
}

function btnMouseOut() {
    this.style.backgroundColor = "transparent";
    this.style.color = fontColor.value;
}

// 搜索引擎
function searchEngineRadioOnChange(value) {
    emit("searchEngine", value);
    localStorage.setItem("searchEngine", value);
    Message.success("已更换搜索引擎");
}

// 动效样式
function dynamicEffectRadioOnChange(value) {
    emit("dynamicEffect", value);
    localStorage.setItem("dynamicEffect", value);
    Message.success("已更换显示效果");
}

// 图片质量
function imageQualityRadioOnChange(value) {
    emit("imageQuality", value);
    localStorage.setItem("imageQuality", value);
    Message.success("已更新图片质量");
    window.location.reload();
}

// 图片主题
function imageTopicsCheckboxOnChange(values) {
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

// 重置设置
function clearStorageBtnOnClick() {
    localStorage.clear();
    Message.success("已重置所有内容");
    window.location.reload();
}

</script>

<style scoped>

</style>