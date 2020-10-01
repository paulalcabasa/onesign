<template>
	<div>
		<div>
			<loading :active.sync="isLoading" 
			:is-full-page="fullPage"></loading>
			<b-row>
				<b-col md="3" lg="3" sm="3" v-for="(system, index) in systems" :key="index" v-show="system.display">
					<Statistics
						:title="system.count" 
						:desc="system.system_name" 
						:icon="system.icon" 
						:variant="system.variant"
						:text="system.text"
					/>
				</b-col>
			</b-row>
			<b-link class="mt-3" @click="toggleSystems" v-if="systems.length >= 5">{{ visibleCtr == systems.length ? 'Hide' : 'Show more'}}</b-link>
			<Approval></Approval>
		</div>
	</div>
</template>

<script>
import Statistics from '@/components/Statistics.vue';
import Approval from '@/components/Approval.vue';
import { mapGetters } from 'vuex';
import { GET_APPROVAL } from '@/store/approval.module';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
	components : {
		Statistics,
		Approval,
		Loading
	},
	data() { 
		return {
			systems : [],
			isLoading: false,
			fullPage: true
		}
	},
	mounted(){
		this.isLoading = true;
		this.$store.dispatch(GET_APPROVAL).then( () => {
			this.systems = this.getSystems;
			this.isLoading = false;
		});
		
	},
	updated(){
	
	},
	methods: {
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
}
</script>