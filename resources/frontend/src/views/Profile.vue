<template>
    <div class="profile">
         <b-row>
            <b-col md="6">
                <b-card title="Profile">
                    <b-card-body>
                         <b-form>
                            <b-form-group
                                id="input-group-1"
                                label="Employee No."
                                label-for="input-1"
                            >
                                <b-form-input
                                    id="input-1"
                                    :value="getUser.employee_no"
                                    type="text"
                                    readonly="readonly"
                                    placeholder="Enter email"
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group
                                id="input-group-1"
                                label="Name"
                                label-for="input-1"
                            >
                                <b-form-input
                                    id="input-1"
                                    :value="getUser.first_name + ' ' + getUser.last_name"
                                    type="text"
                                    readonly="readonly"
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group
                                id="input-group-1"
                                label="Position"
                                label-for="input-1"
                            >
                                <b-form-input
                                    id="input-1"
                                    :value="getUser.position_title"
                                    type="text"
                                    readonly="readonly"
                                ></b-form-input>
                            </b-form-group>
                         </b-form>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
        
    </div>
</template>
<style scoped>
.profile {
    text-align: left;
}
</style>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'getUser',
        ])
    },
}
</script>