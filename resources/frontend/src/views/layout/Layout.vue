<template>
    <div>
        <Navbar />
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>
<script>

import Navbar from "@/views/layout/Navbar.vue";

export default {
    name: 'Layout',
    components: {
        Navbar
    }
}
</script>