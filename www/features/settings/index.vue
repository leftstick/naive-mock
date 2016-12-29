<template>
    <div class="settings" v-loading="settingsOperating">
        <el-form ref="form" :model="info" label-width="155px" v-if="info">
            <el-form-item label="Fallback Domain">
                <el-input v-model="info.fallback"></el-input>
            </el-form-item>
            <el-form-item label="Save Fallback Result">
                <switcher :pre="info.saveFallbackResult" @change="set('saveFallbackResult', arguments[0])"></switcher>
            </el-form-item>
            <el-form-item class="submit">
                <el-button type="primary" @click="onSubmit">Save</el-button>
                <el-button @click="onReset">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

import {eraseGetter} from 'fw/util/Object';
import switcher from 'common/switcher';

export default {
    data() {
        return {
            info: null
        };
    },
    computed: {
        ...mapGetters([
            'settings',
            'settingsOperating'
        ])
    },
    methods: {
        ...mapActions([
            'fetchSettings',
            'updateSettings'
        ]),
        set(field, val) {
            this.info[field] = val;
        },
        onSubmit() {
            this
                .updateSettings(eraseGetter(this.info))
                .then(item => {
                    this.info = eraseGetter(item);
                    this.$message({
                        message: 'Settings updated',
                        type: 'success'
                    });
                })
                .catch(this._onerror);
        },
        onReset() {
            this.info = eraseGetter(this.settings);
        },
        _onerror(err) {
            this.$message.error(err.message);
        }
    },
    mounted() {
        this
            .fetchSettings()
            .then(item => {
                this.info = {};
                this.info.fallback = item.fallback || '';
                this.info.saveFallbackResult = !!item.saveFallbackResult;
            })
            .catch(this._onerror);
    },
    components: {
        switcher
    }
};

</script>

<style scoped>
    .settings {
        width: 100%;
        display: flex;
        justify-content: center;
        .el-form {
            width: 700px;
        }

        .submit {
            margin-top: 50px;
        }
    }
</style>