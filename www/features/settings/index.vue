<template>
    <div class="settings" v-loading="settingsOperating">
        <el-form ref="form" :model="info" label-width="155px" v-if="info">
            <el-form-item label="Fallback Domain">
                <el-input v-model="info.fallback">
                    <el-button slot="append" icon="information" @click="goHelp('what-is-fallback')"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="Save Fallback Result" class="savefallback">
                <save-fallback :pre="info.saveFallbackResult" @change="updateSaveFallback"></save-fallback>
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

import Help from 'common/mixins/help';
import switcher from 'common/switcher';
import saveFallback from './base/saveFallback';

export default {
    data() {
        return {
            info: null
        };
    },
    mixins: [Help],
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
        updateSaveFallback(vals) {
            Object
                .keys(this.info.saveFallbackResult)
                .forEach(k => {
                    this.info.saveFallbackResult[k] = false;
                });
                
            vals.forEach(k => {
                this.info.saveFallbackResult[k] = true;
            });
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
                this.info.saveFallbackResult = eraseGetter(item.saveFallbackResult) || {};
            })
            .catch(this._onerror);
    },
    components: {
        switcher,
        saveFallback
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
    .savefallback {
        height: 300px;
    }
</style>