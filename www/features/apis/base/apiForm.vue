<template>
    <div class="api-form">
        <h1>{{ type }} API</h1>
        <el-form ref="query" :model="api" label-width="80px">
            <el-form-item label="API name" class="api">
                <el-input :value="api.api" @change="set('api', arguments[0])">
                    <el-button slot="append" icon="information" @click="goHelp('how-to-create-mock-api')"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="Category" class="category">
                <categories @change="set('category', arguments[0])" :pre="api.category" disable-item="example"></categories>
            </el-form-item>
            <el-form-item label="Method" class="method">
                <methods @change="set('method', arguments[0])" :pre="api.method"></methods>
            </el-form-item>
            <el-form-item label="Status" class="status">
                <statuses @change="set('status', arguments[0])" :pre="api.status"></statuses>
            </el-form-item>
            <el-form-item label="Enabled" class="enabled">
                <el-switch v-model="api.enabled" on-text="" off-text="" @change="set('enabled', arguments[0])"></el-switch>
            </el-form-item>
            <codemirror :code="api.response" :options="editorOpts" @changed="set('response', arguments[0])"></codemirror>
            <el-form-item style="margin-top: 35px;">
                <el-button type="primary" @click="save" :loading="apisListOperating">{{ type }}</el-button>
                <el-button @click="back">Back</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {eraseGetter} from 'fw/util/Object';

import Help from 'common/mixins/help';
import categories from './categories';
import statuses from './statuses';
import methods from './methods';

export default {
    data() {
        return {
            api: this.type === 'Create' ? {api: '', method: 'GET', category: '', status: '200', response: '', enabled: true} : eraseGetter(this.info),
            editorOpts: {
                tabSize: 4,
                indentWithTabs: true,
                indentUnit: 4,
                mode: {
                    name: 'javascript',
                    json: true
                },
                theme: 'base16-light',
                lineNumbers: true,
                line: true,
                keyMap: 'sublime',
                foldGutter: true,
                styleSelectedText: true
            }
        };
    },
    mixins: [Help],
    props: {
        type: {
            type: String,
            required: true
        },
        info: {
            type: Object,
            required: false
        }
    },
    computed: {
        ...mapGetters([
            'apisListOperating'
        ])
    },
    methods: {
        set(field, val) {
            this.api[field] = val;
        },
        save() {
            this.$emit('save', eraseGetter(this.api));
        },
        back() {
            this.$emit('back');
        }
    },
    components: {
        categories,
        statuses,
        methods
    }
};

</script>

<style scoped>
    .api-form {
        width: 100%;
        height: 100%;
        text-align: center;

        .el-form {
            width: 800px;
            margin: 20px auto 10px auto;
            text-align: left;

            .api {
                width: 400px;
            }
        }
    }
</style>