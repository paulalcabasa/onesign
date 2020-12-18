<template>
  <div>
    <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
    <!--begin::Dashboard-->
    <div class="row">
        <div class="col-xl-3" v-for="(system, index) in systems" :key="index" v-show="system.display">
            <Statistics 
                :title="system.system_name" 
                :approvalCount="system.count"
            ></Statistics>
         </div>
    </div>
    <div class="row">
        <div class="col-xl-3">
            <b-link class="mt-3" @click="toggleSystems" v-if="systems.length >= 5">{{ visibleCtr == systems.length ? 'Hide' : 'Show more'}}</b-link>
        </div>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <ApprovalList></ApprovalList>
      </div>    
    </div>
    <!--end::Dashboard-->
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import Statistics from '@/view/pages/Statistics';
import ApprovalList from '@/view/pages/ApprovalList';
import { GET_APPROVAL } from '@/core/services/store/approval.module';
import { mapGetters } from 'vuex';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    name: "dashboard",
    components: {
        Statistics,
        ApprovalList,
        Loading
    },
    data() { 
        return {
            systems : [],
            isLoading: false,
            fullPage: true,
            cardVariants : [
                'bg-light-success',
                'bg-light-danger',
                'bg-light-info',
                'bg-light-warning'
            ]
        }
    },
    beforeMount(){
        this.isLoading = true;
    },
    mounted() {
        
        this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
        this.$store.dispatch(GET_APPROVAL).then( () => {
            this.systems = this.getSystems;
            this.isLoading = false;
        });
    },
    methods: {
        getVariant(){
            return this.cardVariants[Math.floor((Math.random() * 3))];
        },
        toggleSystems(){
			var ctr = 0;
			if(this.visibleCtr != this.systems.length){
				this.systems.map( (data,index) => {
					if(!data.display && ctr < 4){
						this.systems[index].display = true;
						ctr++;
					}
				});
			}
			else {
				this.systems.map( (data,index) => {
					ctr++;
					if(data.display && ctr > 4){
						this.systems[index].display = false;
					}
				});
			}
		},
        setActiveTab1(event) {
        this.tabIndex = this.setActiveTab(event);
        },
        setActiveTab2(event) {
        this.tabIndex2 = this.setActiveTab(event);
        },
        /**
         * Set current active on click
         * @param event
         */
        setActiveTab(event) {
        // get all tab links
        const tab = event.target.closest('[role="tablist"]');
        const links = tab.querySelectorAll(".nav-link");
        // remove active tab links
        for (let i = 0; i < links.length; i++) {
            links[i].classList.remove("active");
        }

        // set current active tab
        event.target.classList.add("active");

        // set clicked tab index to bootstrap tab
        return parseInt(event.target.getAttribute("data-tab"));
        }
    },
    computed: {
		visibleCtr() {
			var ctr = 0;
			this.systems.map( (data) => {
				if(data.display){
					ctr++;
				}
			});
			return ctr;
		},
		...mapGetters([
			'getSystems'
		])
	
	}
};
</script>
