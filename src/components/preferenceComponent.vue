<template>
    <a-space>
        <a-tooltip :background-color="backgroundColor" :content-style="{color: fontColor}" content="菜单栏"
                   position="br">
            <a-button id="preferenceBtn" class="componentTheme zIndexHigh" :shape="preferenceData.buttonShape" size="large" type="primary"
                      @click="showDrawerBtnOnClick">
                <template #icon>
                    <icon-menu />
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
                :width="380"
                unmountOnClose
                @cancel="handleCancel"
                @ok="handleOk"
            >
                <template #title>
                    <preference-header-component
                        :font-color="fontColor"
                        :hover-color="hoverColor"
                        :preference-data="preferenceData"
                    />
                </template>
                <a-space direction="vertical" size="large" id="drawerContent">
                    <preference-image-component
                        :background-color="backgroundColor"
                        :font-color="fontColor"
                        :hover-color="hoverColor"
                        @preference-data="getPreferenceData"
                    />
                    <preference-function-component
                        :background-color="backgroundColor"
                        :font-color="fontColor"
                        :hover-color="hoverColor"
                        @preference-data="getPreferenceData"
                    />
                    <preference-info-component
                        :background-color="backgroundColor"
                        :font-color="fontColor"
                        :hover-color="hoverColor"
                        :preference-data="preferenceData"
                    />
                    <preference-email-component
                        :background-color="backgroundColor"
                        :font-color="fontColor"
                        :hover-color="hoverColor"
                        :preference-data="preferenceData"
                    />
                    <preference-product-component
                        :background-color="backgroundColor"
                        :font-color="fontColor"
                        :hover-color="hoverColor"
                        :preference-data="preferenceData"
                    />
<!--                    <preference-link-component-->
<!--                        :background-color="backgroundColor"-->
<!--                        :font-color="fontColor"-->
<!--                        :hover-color="hoverColor"-->
<!--                        :preference-data="preferenceData"-->
<!--                    />-->
                    <preference-to-top-component
                        :font-color="fontColor"
                        :hover-color="hoverColor"
                        :preference-data="preferenceData"
                    />
                </a-space>
                <template #footer>
                    <preference-footer-component
                        :font-color="fontColor"
                        :hover-color="hoverColor"
                        :preference-data="preferenceData"
                    />
                </template>
            </a-drawer>
        </a-tooltip>
    </a-space>
</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {IconMenu} from "@arco-design/web-vue/es/icon";
import {changeThemeColor} from "../javascripts/publicFunctions";
import {defaultPreferenceData, device} from "../javascripts/publicConstants";
import PreferenceEmailComponent from "../preferenceComponents/preferenceEmailComponent.vue";
import PreferenceFooterComponent from "../preferenceComponents/preferenceFooterComponent.vue";
import PreferenceInfoComponent from "../preferenceComponents/preferenceInfoComponent.vue";
import PreferenceImageComponent from "../preferenceComponents/preferenceImageComponent.vue";
import PreferenceFunctionComponent from "../preferenceComponents/preferenceFunctionComponent.vue";
import PreferenceHeaderComponent from "../preferenceComponents/preferenceHeaderComponent.vue";
import PreferenceProductComponent from "../preferenceComponents/preferenceProductComponent.vue";
import PreferenceToTopComponent from "../preferenceComponents/preferenceToTopComponent.vue";
// import PreferenceLinkComponent from "../preferenceComponents/preferenceLinkComponent.vue";

let visible = ref(false);
let drawerPosition = ref("right");
let hoverColor = ref("");
let backgroundColor = ref("");
let fontColor = ref("");

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
    },
    preferenceData: {
        type: Object,
        required: true,
        default: () => {
            return defaultPreferenceData
        }
    }
});

const emit = defineEmits(["preferenceData"]);
const getPreferenceData = (value) => {
    emit("preferenceData", value);
}

watch(() => props.themeColor, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        hoverColor.value = props.themeColor.themeColor;
        backgroundColor.value = props.themeColor.componentBackgroundColor;
        fontColor.value = props.themeColor.componentFontColor;
        changeThemeColor("#preferenceBtn", backgroundColor.value, fontColor.value);
    }
})

onMounted(() => {
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
</script>

<style scoped>

</style>