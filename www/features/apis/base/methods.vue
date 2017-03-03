<template>
    <div>
        <el-select filterable clearable v-model="preSelected" placeholder="Please select a method" @change="selectMethod">
            <el-option v-for="st of methods" :key="st" :label="st" :value="st"></el-option>
        </el-select>
    </div>       
</template>

<script>
export default {
    data() {
        return {
            preSelected: this.pre || '',
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
        };
    },
    props: {
        pre: {
            type: String,
            required: false
        }
    },
    watch: {
        pre(val) {
            this.preSelected = this.pre || '';
        }
    },
    methods: {
        selectMethod(name) {
            this.$emit('change', name || '');
        }
    }
};

</script>

<style scoped>
    .el-select {
        display: inline-block;
        width: 300px;
    }
</style>