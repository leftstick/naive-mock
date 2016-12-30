<template>
    <el-checkbox-group v-model="preSelected" @change="change">
        <el-checkbox v-for="item of list" :label="item"></el-checkbox>
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
    methods: {
        change(vals) {
            this.$emit('change', eraseGetter(vals));
        }
    }
};

</script>

<style scoped>
    .el-checkbox-group {
        max-height: 290px;
        overflow-y: auto;
    }

    .el-checkbox-group .el-checkbox {
        display: block;
        margin-left: 0;
    }
</style>