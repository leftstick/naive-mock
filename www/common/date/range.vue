<template>
    <el-date-picker class="date-range" v-model="preSelected" type="daterange" align="left" :placeholder="text" :picker-options="opts" @input="onpick">
</template>

<script>
import moment from 'moment';

export default {
    data() {
        return {
            text: this.placeholder || 'Pick a range',
            preSelected: this.pre || ['', ''],
            opts: {
                shortcuts: [{
                    text: 'Last week',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: 'Last month',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: 'Last 3 months',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }
        };
    },
    props: {
        pre: {
            type: Array,
            required: false
        },
        placeholder: {
            type: String,
            required: false
        }
    },
    watch: {
        pre(val) {
            this.preSelected = this.pre || ['', ''];
        }
    },
    methods: {
        onpick([from, to]) {
            const ff = from ? moment(from).format('L') : '';
            const tt = from ? moment(to).format('L') : '';
            this.$emit('selected', [ff, tt]);
        }
    }
};

</script>

<style scoped>
    .el-date-editor {
        width: 240px;
    }
</style>