<template>
    <a-space>
        <a-tooltip :background-color="backgroundColor" :content-style="{color: fontColor}" content="菜单栏"
                   position="br">
            <a-button id="preferenceBtn" :shape="preferenceData.buttonShape" class="componentTheme zIndexHigh"
                      size="large" type="primary"
                      @click="showDrawerBtnOnClick">
                <template #icon>
                    <icon-menu/>
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
                :width="400"
                unmountOnClose
                @cancel="handleCancel"
                @ok="handleOk"
            >
                <template #title>
                    <menu-header-component
                        :font-color="fontColor"
                        :hover-color="hoverColor"
                        :preference-data="preferenceData"
                    />
                </template>
                <a-space id="drawerContent" direction="vertical" size="large">
                    <menu-preference-component
                        :background-color="backgroundColor"
                        :font-color="fontColor"
                        :hover-color="hoverColor"
                        @preference-data="getPreferenceData"
                    />
                    <menu-info-component
                        :background-color="backgroundColor"
                        :font-color="fontColor"
                        :hover-color="hoverColor"
                        :preference-data="preferenceData"
                    />
                    <menu-contact-component
                        :background-color="backgroundColor"
                        :font-color="fontColor"
                        :hover-color="hoverColor"
                        :preference-data="preferenceData"
                    />
                    <menu-to-top-component
                        :font-color="fontColor"
                        :hover-color="hoverColor"
                        :preference-data="preferenceData"
                    />
                </a-space>
                <template #footer>
                    <menu-footer-component
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
import {changeThemeColor} from "@/javascripts/publicFunctions";
import {defaultPreferenceData, device} from "@/javascripts/publicConstants";
import MenuHeaderComponent from "@/menuComponents/menuHeaderComponent.vue";
import MenuPreferenceComponent from "@/menuComponents/menuPreferenceComponent.vue";
import menuContactComponent from "@/menuComponents/menuContactComponent.vue";
import MenuInfoComponent from "@/menuComponents/menuInfoComponent.vue";
import MenuToTopComponent from "@/menuComponents/menuToTopComponent.vue";
import MenuFooterComponent from "@/menuComponents/menuFooterComponent.vue";

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
    console.log(newValue)
    console.log(oldValue)
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