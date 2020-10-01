<template>
    <div class="login-wrapper">
        
    <div class="outer">
        <div class="middle">
            <div class="inner">

                <loading :active.sync="isLoading" 
                :is-full-page="fullPage"></loading>

                <h1 class="text-center">OneSign</h1>
                <b-card variant="primary">
                    <b-form>
                       <b-alert variant="danger" show v-if="message != ''">{{ message }}</b-alert>
                        <b-input-group
                            class="mb-3"
                        > 
                            <b-input-group-prepend>
                                <span class="input-group-text"><b-icon icon="person-fill"></b-icon></span>
                            </b-input-group-prepend>
                            <b-form-input placeholder="Username" v-model="username"></b-form-input>
                        </b-input-group>
                  
                        <b-input-group
                          
                            class="mb-3"
                        >
                            <b-input-group-prepend>
                                <span class="input-group-text"><b-icon icon="key-fill"></b-icon></span>
                            </b-input-group-prepend>
                            <b-form-input placeholder="Password" type="password" v-model="password"></b-form-input>
                        </b-input-group>


                        <b-btn variant="primary" @click="submit">Sign in</b-btn>
                       <!--  <b-link href="#" @click.prevent="test" class="float-right">Forgot your password?</b-link> -->
                      </b-form>
                </b-card>
            </div>
        </div>
    </div>
    </div>
</template>
<style scoped>
    .outer {
        display: table;
        position: absolute;
        top: 0;
        left: 0;
        height: 90%;
        width: 100%;
    }

    .middle {
        display: table-cell;
        vertical-align: middle;
    }

    .inner {
        margin-left: auto;
        margin-right: auto;
        width: 400px;
        text-align:left;
        /*whatever width you want*/
    }

    .login-wrapper {
        background:#c3c3c3;
    }
</style>
<script>

import { LOGIN } from "@/store/auth.module";
import Loading from 'vue-loading-overlay';
import { mapGetters, mapState } from 'vuex'; 
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    components : {
        Loading
    },
    computed: {
        ...mapGetters([
            'getMessage'
        ]),
        ...mapState({
            message: state => state.auth.message,
            isAuthenticated: state => state.auth.isAuthenticated
        })
    },
	data() {
		return {
			name: '',
			username: '',
            password: '',
            isLoading: false,
            fullPage: true
		}
    },
    mounted() {
     
    },
    updated(){
      /*   if(this.getMessage != ""){
            this.isLoading = false;
        } */
    },
 
	methods : {
       
		submit(){
         //   alert("submit");
            const username = this.username;
            const password = this.password;
            this.isLoading = true;
            this.$store.dispatch(LOGIN, { username, password }).then( () => {
                if(this.isAuthenticated){
                    this.$router.push('dashboard');
                }
                this.isLoading = false;
            });
        },
    
	},
	
  }
</script>