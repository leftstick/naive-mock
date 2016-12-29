<template>
    <el-switch :disabled="disabled" :width="40" v-model="preSelected" on-text="" off-text="" @change="selectMethod"></el-switch>
</template>

<script>
import {isNull} from 'fw/util/Object';
export default {
    data() {
        return {
            preSelected: isNull(this.pre) ? true : this.pre
        };
    },
    props: {
        pre: {
            type: Boolean,
            required: false
        },
        disabled: {
            type: Boolean,
            required: false
        }
    },
    watch: {
        pre(val) {
            this.preSelected = isNull(this.pre) ? true : this.pre;
        }
    },
    methods: {
        selectMethod(val) {
            this.$emit('change', val);
        }
    }
};

</script>

<style scoped>

</style>