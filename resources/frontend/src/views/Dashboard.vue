<template>
	<div>
		<div>
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
			<b-link class="mt-3" @click="toggleSystems">{{ visibleCtr == systems.length ? 'Hide' : 'Show more'}}</b-link>
			<Approval></Approval>
		</div>
	</div>
</template>

<script>
import Statistics from '@/components/Statistics.vue';
import Approval from '@/components/Approval.vue';
export default {
	components : {
		Statistics,
		Approval
	},
	data() { 
		return {
			systems : [
				{
					system_name: 'System 1',
					count: 10,
					variant: 'dark',
					icon: 'arrow-clockwise',
					text:'white',
					display: true
				},
				{
					system_name: 'System 2',
					count: 10,
					variant: 'dark',
					icon: 'arrow-clockwise',
					text:'white',
					display: true
				},
				{
					system_name: 'System 3',
					count: 10,
					variant: 'dark',
					icon: 'arrow-clockwise',
					text:'white',
					display: true
				},
				{
					system_name: 'System 4',
					count: 10,
					variant: 'dark',
					icon: 'arrow-clockwise',
					text:'white',
					display: true
				},
				{
					system_name: 'System 5',
					count: 10,
					variant: 'primary',
					icon: 'arrow-clockwise',
					text:'white',
					display: false
				},
				{
					system_name: 'System 6',
					count: 10,
					variant: 'primary',
					icon: 'arrow-clockwise',
					text:'white',
					display: false
				},
				{
					system_name: 'System 6',
					count: 10,
					variant: 'primary',
					icon: 'arrow-clockwise',
					text:'white',
					display: false
				},
				{
					system_name: 'System 7',
					count: 10,
					variant: 'primary',
					icon: 'arrow-clockwise',
					text:'white',
					display: false
				},
				{
					system_name: 'System 8',
					count: 10,
					variant: 'primary',
					icon: 'arrow-clockwise',
					text:'white',
					display: false
				},
				{
					system_name: 'System 9',
					count: 10,
					variant: 'primary',
					icon: 'arrow-clockwise',
					text:'white',
					display: false
				},
				{
					system_name: 'System 10',
					count: 10,
					variant: 'primary',
					icon: 'arrow-clockwise',
					text:'white',
					display: false
				},

			]
		}
	},
	mounted(){
		
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
		}
	}
}
</script>