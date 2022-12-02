<template>
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
</template>

<script setup>
import {defineProps, ref, watch} from "vue"
import {IconApps} from "@arco-design/web-vue/es/icon";

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