<template>
    <b-card bg-variant="light" class="mt-3 mb-3" title="Pending approval">
        <b-card-body>
            <b-row>
                <!-- User Interface controls -->
                <b-col lg="6" class="my-1">
                    <b-form-group
                        label="Filter"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="sm"
                        label-for="filterInput"
                        class="mb-0"
                    >
                        <b-input-group size="sm">
                        <b-form-input
                            v-model="filter"
                            type="search"
                            id="filterInput"
                            placeholder="Type to Search"
                        ></b-form-input>
                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>

                <b-col lg="6" class="my-1">
                    <b-form-group
                        label="Filter On"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="sm"
                        description="Leave all unchecked to filter on all data"
                        class="mb-0">
                        <b-form-checkbox-group v-model="filterOn" class="mt-1">
                        <b-form-checkbox value="system">System</b-form-checkbox>
                        <b-form-checkbox value="reference_no">Ref No.</b-form-checkbox>
                        <b-form-checkbox value="description">Description</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>
                </b-col>
            </b-row>

        <!-- Main table element -->
            <b-table
                show-empty
                :small="true"
                class='approval-table'
                stacked="md"
                :head-variant="'dark'"
                :items="getApprovalList"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :filterIncludedFields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered"
            >
                <template v-slot:cell(actions)="row">
                    <b-link class="mr-1" :href="row.item.view_url" target="_blank">
                        View 
                    </b-link>                 
                </template>

            </b-table>

        
        </b-card-body>

        <b-card-footer>
            <b-row>
                <b-col sm="4" md="4" lg="4" class="my-1">
                    <b-form-group
                        label="Sort"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="sm"
                        label-for="sortBySelect"
                        class="mb-0"
                    >
                        <b-input-group size="sm">
                        <b-form-select v-model="sortBy" id="sortBySelect" :options="sortOptions" class="w-75">
                            <template v-slot:first>
                            <option value="">-- none --</option>
                            </template>
                        </b-form-select>
                        <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy" class="w-25">
                            <option :value="false">Asc</option>
                            <option :value="true">Desc</option>
                        </b-form-select>
                        </b-input-group>
                    </b-form-group>
                </b-col>

                <b-col sm="3" md="3" class="my-1">
                    <b-form-group
                        label="Per page"
                        label-cols-sm="6"
                        label-cols-md="4"
                        label-cols-lg="3"
                        label-align-sm="right"
                        label-size="sm"
                        label-for="perPageSelect"
                        class="mb-0"
                    >
                        <b-form-select
                        v-model="perPage"
                        id="perPageSelect"
                        size="sm"
                        :options="pageOptions"
                        ></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col sm="5" md="5" class="my-1">
                        <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        align="fill"
                        size="sm"
                        class="my-0"
                        ></b-pagination>
                    </b-col> 
            </b-row>
        </b-card-footer>
    </b-card>
</template>

<style>
.data-style {
    font-size:90%;
    text-align: left;
}

.header-style {
    white-space: nowrap;
    text-align:center !important;
    font-size:90%;
}
</style>
<script>

import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            items: [],
            fields: [
                {
                    key: 'actions', 
                    label: 'Actions' ,
                    thClass : 'header-style',
                    tdClass : 'data-style',
                },
                {
                    key: 'system',
                    label: 'System',
                    sortable: true,
                    thClass : 'header-style',
                    tdClass : 'data-style',
                },
                {
                    key: 'description',
                    label: 'Description',
                    sortable: true,
                    tdClass : 'data-style',
                    thClass : 'header-style',
                },
                {
                    key: 'reference_no',
                    label: 'Reference No.',
                    sortable: true,
                    thClass : 'header-style',
                    tdClass : 'data-style',
                },
                {
                    key: 'request_date',
                    label: 'Date requested',
                    sortable: true,
                    thClass : 'header-style',
                    tdClass : 'data-style',
                },
                {
                    key: 'status',
                    label: 'Status',
                    sortable: true,
                    thClass : 'header-style',
                    tdClass : 'data-style',
                },
                
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [5, 10, 25, 50, 100],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
        }
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                return { text: f.label, value: f.key }
            })
        },
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'getApprovalList',
            // ...
        ]),
    },
    updated() {
        this.totalRows = this.getApprovalList.length;
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        }
    }
}
</script>