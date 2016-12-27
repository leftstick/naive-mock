<template>
    <div>
        <el-table :data="apisList" height="650" border style="width: 100%" @cell-click="clickApi">
            <el-table-column prop="api" label="API" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="category" label="Category" sortable width="150"></el-table-column>
            <el-table-column prop="method" label="Method" sortable width="100"></el-table-column>
            <el-table-column prop="status" label="Status" sortable width="100"></el-table-column>
            <el-table-column :context="_self" inline-template label="Oper" width="90">
                <div>
                    <el-button size="small" type="text" icon="edit" :disabled="row.category === 'example'" @click="handleEdit($index, row)"></el-button>
                    <el-button size="small" type="text" icon="delete" :disabled="row.category === 'example'" @click="handleDelete($index, row)"></el-button>
                </div>
            </el-table-column>
        </el-table>
        <el-dialog ref="verify" title="Verify" size="tiny">
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
            'deleteAPI'
        ]),
        clickApi(row, column, cell, event) {
            if (column.property === 'api') {
                this.tryCmd = `curl -X ${row.method} -H "category:${row.category}" ${window.location.origin}${row.api}`;
                this.$refs.verify.open();
            }
        },
        handleEdit(index, row) {
            this.$router.push({
                path: `/apimanager/edit/${row.id}`
            });
        },
        handleDelete(index, row) {
            this.$confirm('Are you sure to delete this API?', 'Confirm', {
                type: 'warning'
            })
            .then(() => {
                return this.deleteAPI(row.id);
            })
            .catch(err => {
                if (err === 'cancel') {
                    return;
                }
                this.$message.error(err.message);
            });
        }
    }
};

</script>

<style scoped>
    code {
        padding: 5px;
        background-color: #f5f5f5;
    }
</style>