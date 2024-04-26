import { createApp } from 'vue'
// Import our custom CSS
import './scss/styles.scss'

import router from "./index.js";

import App from './App.vue'
import '@progress/kendo-ui'

import '@progress/kendo-theme-default/dist/all.css'

import { Spreadsheet,
		 SpreadsheetSheet,
		 SpreadsheetInstaller } from '@progress/kendo-spreadsheet-vue-wrapper'
createApp(App).use(router).mount('#app')
