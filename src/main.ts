import { createApp } from 'vue'
import './reset.css'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.directive('focus', {
	mounted: el => el.focus,
})
app.mount('#app')
