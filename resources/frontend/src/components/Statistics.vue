<template>
	<b-card :bg-variant="variant" :text-variant="text" class="mb-2">
		<div class="media">
			<div class="media-body">
				<h3 class="statistics__number">{{ title }}</h3>
				<span class="statistics__desc">{{ desc }}</span>
			</div>
			
		</div>
	</b-card>
</template>

<script>

export default {
  name: "Statistics",
  components: {
  },
  data() {
    return {
    
    };
  },
  props: {
    title: Number,
    desc: String,
    icon: String,
    variant: String,
    text: String
  },
  mounted() {
  
  },
  computed: {
  }
};
</script>

<style scoped>

.media {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: start;
    align-items: flex-start;
    padding-top:10px;
}

.media-body {
    -ms-flex: 1;
    flex: 1;
   
}

.media-icon {
 
  align-self: center !important;
	font-size:5em;
}

h3 {
  font-size:2.75rem;
}
.statistics__desc {
    color: #fff;
    text-transform: uppercase !important;
    font-size: 1.2rem;
    font-weight:500;
}
</style>