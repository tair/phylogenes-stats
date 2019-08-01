import home from './components/home'
import page1 from './components/page1'
import page2 from './components/page2'
import page3 from './components/page3'

export const routes = [
    { path: '/', redirect: '/home'},
    { path: '/home', component: home },
    { path: '/page1', component: page1 },
    { path: '/page2', component: page2 },
    { path: '/page3', component: page3 }
]