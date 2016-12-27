<template>
    <div class="settings" v-loading="settingsOperating">
        <el-form ref="form" :model="info" label-width="140px" v-if="info">
            <el-form-item label="Fallback Domain">
                <el-input v-model="info.fallback"></el-input>
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
                this.info = eraseGetter(item);
            })
            .catch(this._onerror);
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