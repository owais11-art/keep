<script setup>
  import Header from './components/Header.vue'
  import Sidebar from './components/Sidebar.vue'
  import LabelModal from './components/LabelModal.vue'
  import { ref } from 'vue'
  import { db } from './database'

  db.setNavItems()
  const isLabelModalOpen = ref(false)
  const navCollapsed = ref(false)
  const toggleLabelModal = () => {
    isLabelModalOpen.value = !isLabelModalOpen.value
  }
  const toggleNavVisibility = () => {
    navCollapsed.value = !navCollapsed.value
  }
</script>

<template>
  <Header @on-slide="toggleNavVisibility" />
  <div class="main">
    <div :class="['navigation', {collapsed: navCollapsed}]">
      <Sidebar @open-label-modal="toggleLabelModal" :navCollapsed="navCollapsed" />
    </div>
    <div :class="['page', {collapsed: navCollapsed}]">
      <RouterView/>
    </div>
  </div>
  <LabelModal v-if="isLabelModalOpen" @close-label-modal="toggleLabelModal" />
</template>


<style scoped lang="less">
  .main{
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 35px;
    height: 100vh - 10.99px;
    padding-top: 5px;
    .navigation{
      grid-column: span 3;
      &.collapsed{
        grid-column: span 2;
      }
      @media(max-width: 900px){
        grid-column: span 2;
      }
    }
    .page{
      grid-column: span 9;
    }
  }
</style>