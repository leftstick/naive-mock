<template>
    <div class="apis">
        <div class="query">
            <el-form ref="query" label-width="110px">
                <el-form-item label="API name" class="api">
                    <el-input :value="apisQuery.api" @change="set('api', arguments[0])"></el-input>
                </el-form-item>
                <el-form-item label="Test Category" class="category">
                    <categories @change="set('test_category', arguments[0])" :pre="apisQuery.test_category"></categories>
                </el-form-item>
                 <el-form-item label="Method" class="method">
                    <methods @change="set('method', arguments[0])" :pre="apisQuery.method"></methods>
                </el-form-item>
                <el-form-item label="Status" class="status">
                    <statuses @change="set('status', arguments[0])" :pre="apisQuery.status"></statuses>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="fetchAPIs">Search</el-button>
                    <el-button @click="resetAPIsQuery">Reset</el-button>
                </el-form-item>
            </el-form>
            <div class="action">
                <el-dropdown @command="takeAction">
                    <el-button>
                        Actions<i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="create">Create API</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="api-list" v-loading="apisListOperating">
            <api-list></api-list>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import categories from './base/categories';
import statuses from './base/statuses';
import methods from './base/methods';
import apiList from './base/apiList';

export default {
    computed: {
        ...mapGetters([
            'apisQuery',
            'apisListOperating'
        ])
    },
    methods: {
        ...mapActions([
            'updateAPIsQuery',
            'resetAPIsQuery',
            'fetchAPIs'
        ]),
        set(field, val) {
            this.updateAPIsQuery({[field]: val});
        },
        takeAction(command) {
            this.$router.push({
                path: '/apimanager/new'
            });
        }
    },
    components: {
        categories,
        statuses,
        methods,
        apiList
    }
};

</script>

<style scoped>
    .apis {
        width: 1200px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .query {
        width: 100%;
        height: 100%;
        position: relative;

        .el-form {
            width: 430px;
        }

        .api .el-input {
            width: 300px;
        }

        .el-form-item:not(:last-child) {
            margin-bottom: 10px;
        }
        .action {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
    .api-list {
        width: 100%;
    }


    @media screen and (max-width: 1200px) {
        .apis {
            width: 1000px;
        }
    }

    @media screen and (max-width: 992px) {
        .apis {
            width: 800px;
        }
    }

    @media screen and (max-width: 768px) {
        .apis {
            width: 100%;
        }
    }
</style>