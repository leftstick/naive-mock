<template>
    <el-checkbox-group v-model="preSelected" @change="change">
        <el-checkbox v-for="item of list" :key="item" :label="item"></el-checkbox>
    </el-checkbox-group>
</template>

<script>
import {eraseGetter} from 'fw/util/Object';

export default {
    data() {
        return {
            list: Object.keys(this.pre),
            preSelected: Object.keys(this.pre).filter(p => this.pre[p])
        };
    },
    props: {
        pre: {
            type: Object,
            required: true
        }
    },
    watch: {
        pre() {
            this.list = Object.keys(this.pre);
            this.preSelected = Object.keys(this.pre).filter(p => this.pre[p]);
        }
    },
    methods: {
        change(vals) {
            this.$emit('change', eraseGetter(vals));
        }
    }
};

</script>

<style scoped>
    .el-checkbox-group {
        min-height: 36px;
        max-height: 290px;
        overflow-y: auto;
        padding: 0 5px 0 5px;
        border: 1px solid #c0ccda;
        border-radius: 4px;
    }

    .el-checkbox-group .el-checkbox {
        display: block;
        margin-left: 0;
    }
</style>