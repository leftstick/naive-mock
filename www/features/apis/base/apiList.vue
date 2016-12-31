<template>
    <div>
        <el-table :data="apisList" height="650" border style="width: 100%" @cell-click="clickApi">
            <el-table-column prop="api" label="API" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="test_category" label="Test Category" sortable width="150"></el-table-column>
            <el-table-column prop="method" label="Method" sortable width="100"></el-table-column>
            <el-table-column prop="status" label="Status" sortable width="100"></el-table-column>
            <el-table-column :context="_self" inline-template label="Enabled" width="125">
                <div>{{ row.enabled ? 'Enabled' : 'Disabled' }}</div>
            </el-table-column>
            <el-table-column :context="_self" inline-template label="Oper" width="130">
                <div>
                    <switcher :pre="row.enabled" @change="handleSwitch($index, row, arguments[0])"></switcher>
                    <el-button size="small" type="text" icon="edit" @click="handleEdit($index, row)" style="margin-left: 10px;"></el-button>
                    <el-button size="small" type="text" icon="delete" @click="handleDelete($index, row)"></el-button>
                </div>
            </el-table-column>
        </el-table>
        <el-dialog ref="verify" title="Verify">
            <strong>Try with :</strong>
            <br/><br/>
            <code>{{ tryCmd }}</code>
            <span slot="footer" class="dialog-footer">
                <el-button @click="$refs.verify.close()">OK</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
import {mapGetters, mapActions} from 'vuex';
import {eraseGetter} from 'fw/util/Object';
import switcher from 'common/switcher';

export default {
    data() {
        return {
            tryCmd: ''
        };
    },
    computed: {
        ...mapGetters([
            'apisList'
        ])
    },
    methods: {
        ...mapActions([
            'deleteAPI',
            'updateAPI'
        ]),
        clickApi(row, column, cell, event) {
            if (column.property === 'api') {
                if (!row.enabled) {
                    return this.$alert('This API is not accessable since it was disabled', 'Info');
                }
                this.tryCmd = `curl -X ${row.method} -H "test_category:${row.test_category}" ${window.location.origin}/m${row.api}`;
                this.$refs.verify.open();
            }
        },
        handleSwitch(index, row, val) {
            const info = eraseGetter(row);
            info.enabled = val;
            this
                .updateAPI(info)
                .catch(this._error);
        },
        handleEdit(index, row) {
            this.$router.push({
                path: `/apimanager/edit/${row._id}`
            });
        },
        handleDelete(index, row) {
            this.$confirm('Are you sure to delete this API?', 'Confirm', {
                type: 'warning'
            })
            .then(() => {
                return this.deleteAPI(row._id);
            })
            .catch(this._error);
        },
        _error(err) {
            if (err === 'cancel') {
                return;
            }
            this.$message.error(err.message);
        }
    },
    components: {
        switcher
    }
};

</script>

<style scoped>
    code {
        padding: 5px;
        background-color: #f5f5f5;
    }
</style>