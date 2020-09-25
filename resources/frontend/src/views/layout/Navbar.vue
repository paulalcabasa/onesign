<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">Isuzu OneSign</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
               <!--  <b-nav-item href="#">History</b-nav-item> -->
          
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                     {{ getUser.first_name }}
                </template>
                <b-dropdown-item href="#" @click.prevent="profile">Profile</b-dropdown-item>
                <b-dropdown-item href="#" @click.prevent="logout">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script>

import { mapGetters } from 'vuex';
import { LOGOUT } from "@/store/auth.module";
export default {
    // ...
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'getUser',
            // ...
            ])
    },
    methods : {
        logout(){
            this.$store.dispatch(LOGOUT).then( () => {
                this.$router.push('login');
            })
        }
    }
}
</script>