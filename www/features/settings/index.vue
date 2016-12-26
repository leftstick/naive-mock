<template>
    <div class="settings">
        <el-form ref="form" :model="settings" label-width="140px">
            <el-form-item label="Fallback Domain">
                <el-input v-model="settings.fallback"></el-input>
            </el-form-item>
            <el-form-item class="submit">
                <el-button type="primary" @click="onSubmit">Save</el-button>
                <el-button @click="onReset">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    data() {
        return {
            settings: {}
        };
    },
    methods: {
        ...mapActions([
            'fetchSettings'
        ]),
        onSubmit() {},

        onReset() {}
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