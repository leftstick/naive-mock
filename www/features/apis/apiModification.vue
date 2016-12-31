<template>
    <div v-loading="apisListOperating" class="container">
        <api-form @save="save" @back="back" type="Modify" :info="apiInfo" v-if="apiInfo"></api-form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

import apiForm from './base/apiForm';

export default {
    data() {
        return {
            apiInfo: null
        };
    },
    computed: {
        ...mapGetters([
            'apisListOperating'
        ])
    },
    methods: {
        ...mapActions([
            'getAPI',
            'updateAPI'
        ]),
        save(api) {
            (new Promise((resolve, reject) => {
                api.response = api.response.replace(/\n/g, '').replace(/\t/g, '');
                JSON.parse(api.response);
                resolve();
            }))
            .then(() => ({}), err => {
                return this.$confirm('Response is not a valid JSON, are you sure to continue?', 'Confirm', {
                    type: 'warning'
                });
            })
            .then(() => this.updateAPI(api))
            .then(() => {
                this.$router.push({
                    path: '/apimanager'
                });
            })
            .catch(this._onerror);
        },
        back() {
            this.$router.push({
                path: '/apimanager'
            });
        },
        _onerror(err) {
            if (err === 'cancel') {
                return;
            }
            this.$message.error(err.message);
        }
    },
    mounted() {
        this
            .getAPI(this.$route.params.id)
            .then((item) => {
                this.apiInfo = item;
                try {
                    this.apiInfo.response = JSON.stringify(JSON.parse(item.response), null, 4);
                } catch (e) {
                    this.apiInfo.response = item.response;
                }
            })
            .catch(this._onerror);
    },
    components: {
        apiForm
    }
};

</script>

<style scoped>
    .container {
        min-height: 70%;
    }
</style>