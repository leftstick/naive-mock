<template>
    <el-dialog title="Confirm" size="tiny" ref="confirm">
        <div v-html="message"></div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="_onClickClose(false)" :loading="running">Cancel</el-button>
            <el-button type="primary" @click="_onClickClose(true)" :loading="running">Confirm</el-button>
        </span>
    </el-dialog>
</template>

<script>
import {promisify} from 'fw/util/Method';
import {isFunction} from 'fw/util/Object';

export default {
    data() {
        return {
            message: '',
            running: false,
            onConfirmed: () => Promise.resolve(),
            onCanceled: () => Promise.resolve()
        };
    },
    methods: {
        open(opts) {
            this.message = opts.message;
            if (isFunction(opts.onConfirmed)) {
                this.onConfirmed = promisify(opts.onConfirmed);
            }
            if (isFunction(opts.onCanceled)) {
                this.onCanceled = promisify(opts.onCanceled);
            }
            this.$refs.confirm.open();
        },
        _onClickClose(confirmed) {
            this.running = true;
            this.message = '';
            if (!confirmed) {
                return this.onCanceled()
                            .then(() => {
                                this.running = false;
                                this.$refs.confirm.close();
                            });
            }

            this.onConfirmed()
                .then(() => {
                    this.running = false;
                    this.$refs.confirm.close();
                })
                .catch(() => {
                    this.running = false;
                });
        }
    }
};

</script>

<style scoped>

</style>