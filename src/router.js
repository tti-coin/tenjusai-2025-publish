import { createRouter, createWebHashHistory } from 'vue-router';
import RecipeListView from './components/RecipeListView.vue';
import RecipeDetailView from './components/RecipeDetailView.vue';

const routes = [
    { path: '/', component: RecipeListView },
    { path: '/recipe/:id', component: RecipeDetailView, props: true },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
