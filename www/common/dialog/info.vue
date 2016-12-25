<template>
    <el-dialog title="Information" v-model="visible" size="tiny">
        <h3>{{ message }}</h3>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="onClose()">{{ btnText || 'Close' }}</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        btnText: {
            type: String,
            required: false
        }
    },
    methods: {
        onClose() {
            this.$emit('close');
        }
    }
};

</script>

<style scoped>

</style>