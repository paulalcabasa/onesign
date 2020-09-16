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
                small
                stacked="md"
                :items="items"
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
                    <b-link class="mr-1" :href="row.item.approve_url" target="_blank">
                        Approve
                    </b-link>
                    <b-link class="mr-1" :href="row.item.reject_url" target="_blank">
                        Reject
                    </b-link>
                    <b-link class="mr-1" @click="info()">
                        Info
                    </b-link>
                </template>

            </b-table>

            <!-- Info modal -->
            <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
                <pre>{{ infoModal.content }}</pre>
            </b-modal>
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

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        system: 'PPS',
                        description: 'New pps request',
                        reference_no: 'PPS-2020-001',
                        status: 'pending',
                        request_date: '08/21/2020',
                        approve_url: 'http://pps/approve/1',
                        reject_url: 'http://pps/reject/1',
                        details_url: 'http://pps/details/1'
                    },
                    {
                        system: 'Courier Request',
                        description: 'New courier request',
                        reference_no: '0001',
                        status: 'pending',
                        request_date: '08/21/2020',
                        approve_url: 'http://pps/approve/1',
                        reject_url: 'http://pps/reject/1',
                        details_url: 'http://pps/details/1'
                    },
                    {
                        system: 'MIS Support',
                        description: 'Mouse repair',
                        reference_no: '0001',
                        status: 'MIS Acknowledged',
                        request_date: '08/21/2020',
                        approve_url: 'http://pps/approve/1',
                        reject_url: 'http://pps/reject/1',
                        details_url: 'http://pps/details/1'
                    },
                  
                  
                   
                ],
                fields: [
                    {
                        key: 'system',
                        label: 'System',
                        sortable: true,
                    },
                    {
                        key: 'description',
                        label: 'Description',
                        sortable: true,
                    },
                    {
                        key: 'reference_no',
                        label: 'Reference No.',
                        sortable: true,
                    },
                    {
                        key: 'status',
                        label: 'Status',
                        sortable: true,
                    },
                    {
                        key: 'actions', 
                        label: 'Actions' 
                    }
                ],
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
                pageOptions: [5, 10, 15],
                sortBy: '',
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                filterOn: [],
                infoModal: {
                id: 'info-modal',
                title: '',
                content: ''
                }
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
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>