import { createRouter, createWebHashHistory } from 'vue-router';
import RecipeList from './views/RecipeList.vue';
import RecipeDetail from './views/RecipeDetail.vue';

const routes = [
    { path: '/', redirect: '/list' },
    { path: '/list', component: RecipeList },
    { path: '/recipe/:id', component: RecipeDetail, props: true },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
