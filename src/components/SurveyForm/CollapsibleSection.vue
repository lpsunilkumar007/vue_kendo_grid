<!-- CollapsibleSection.vue -->
<template>
    <div>
      <div class="collapsible-header" @click="toggleCollapse">
        {{ title }}
        <span v-if="collapsed" class="icon">+</span>
        <span v-else class="icon">-</span>
      </div>
      <div v-show="!collapsed" class="collapsible-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String, // Title of the section
    },
    data() {
      return {
        collapsed: true, // Initial collapse state
      };
    },
    methods: {
      toggleCollapse() {
        this.collapsed = !this.collapsed;
      },
    },
  };
  </script>
  
  <style scoped>
  .collapsible-header {
    cursor: pointer;
    background-color: #f0f0f0;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .collapsible-header .icon {
    float: right;
  }
  
  .collapsible-content {
    padding: 10px;
  }
  </style>
  