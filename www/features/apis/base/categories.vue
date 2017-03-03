<template>
    <div>
        <el-select filterable clearable v-model="preSelected" :loading="apisCategoriesOperating" placeholder="Please select a category" @change="selectCategory">
            <el-option v-for="cate of apisCategoryList" :key="cate" :label="cate" :value="cate" :disabled="disableItem && disableItem === cate"></el-option>
        </el-select>
        <el-button size="large" type="text" icon="document" @click="addCategory"></el-button>
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
            'apisCategoryList',
            'apisCategoriesOperating'
        ])
    },
    props: {
        pre: {
            type: String,
            required: false
        },
        disableItem: {
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
            'fetchCategories',
            'createCategory'
        ]),
        selectCategory(name) {
            this.$emit('change', name || '');
        },
        addCategory(type) {
            this.$prompt('Please type Category', 'Create', {
                inputPattern: /^[a-zA-Z]{3,15}$/,
                inputErrorMessage: 'Category should only be english characters'
            }).then(({value}) => {
                return this.createCategory(value);
            })
            .then(name => {
                return this.selectCategory(name);
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
        if (this.apisCategoryList.length > 0) {
            return;
        }
        this.fetchCategories();
    }
};

</script>

<style scoped>
    .el-select {
        display: inline-block;
        width: 300px;
    }
</style>