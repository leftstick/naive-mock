<template>
    <div>
        <el-select filterable clearable v-model="preSelected" :loading="apisStatusesOperating" placeholder="Please select a status code" @change="selectStatus">
            <el-option v-for="st of apisStatusList" :label="st" :value="st"></el-option>
        </el-select>
        <el-button size="large" type="text" icon="document" @click="addStatus"></el-button>
    </div>       
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    data() {
        return {
            preSelected: this.pre || ''
        };
    },
    computed: {
        ...mapGetters([
            'apisStatusList',
            'apisStatusesOperating'
        ])
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
        ...mapActions([
            'fetchStatuses',
            'createStatus'
        ]),
        selectStatus(name) {
            this.$emit('change', name || '');
        },
        addStatus(type) {
            this.$prompt('Please type Status code', 'Create', {
                inputPattern: /^[1-9][0-9]{2,3}$/,
                inputErrorMessage: 'Status code should only be numbers'
            }).then(({value}) => {
                return this.createStatus(value);
            })
            .then(name => {
                return this.selectStatus(name);
            })
            .catch(err => {
                if (err === 'cancel') {
                    return;
                }
                this.$message({
                    type: 'error',
                    message: err.message
                });
            });
        }
    },
    mounted() {
        if (this.apisStatusList.length > 0) {
            return;
        }
        this.fetchStatuses();
    }
};

</script>

<style scoped>
    .el-select {
        display: inline-block;
        width: 300px;
    }
</style>