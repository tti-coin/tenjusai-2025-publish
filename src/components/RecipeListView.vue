<template>
    <div class="recipe-list-view">
        <h2>みんなの料理</h2>
        <div class="recipe-list">
            <div v-for="recipe in recipes" :key="recipe.id" class="recipe-item" @click="goToDetail(recipe.id)">
                <img v-if="recipe.image" :src="recipe.image" alt="サムネイル" class="thumbnail" />
                <div class="title">{{ recipe.title || 'タイトル未設定' }}</div>
            </div>
        </div>
        <!-- フッター削除 -->
    </div>
</template>

<script>
import { loadRecipes } from '../utils/loadRecipes';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'RecipeListView',
    setup() {
        const recipes = ref([]);
        const router = useRouter();
        onMounted(async () => {
            recipes.value = await loadRecipes();
        });
        const goToDetail = (id) => {
            router.push(`/recipe/${id}`);
        };
        const goToTop = () => {
            router.push('/');
        };
        return { recipes, goToDetail, goToTop };
    },
};
</script>

<style scoped>
/* tenjusai-2025 RecipeListView.vue のスタイルを流用 */
.recipe-list-view {
    width: 100vw;
    min-height: 100vh;
    background: #fff7f0;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
}

.recipe-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, 240px);
    gap: 1.5rem;
    padding: 1.5rem 2vw 90px 2vw;
    /* 90px: フッター分の余白 */
    overflow-y: auto;
    box-sizing: border-box;
    height: auto;
    margin: 0;
    justify-content: start;
}

.recipe-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 1rem 0.5rem 0.8rem 0.5rem;
    background: #fff;
    transition: background 0.2s;
    box-shadow: 0 2px 8px #0001;
    height: 220px;
    width: 220px;
    align-self: start;
}

.recipe-item:hover {
    background: #f0f0f0;
}

.thumbnail {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 0.7rem;
}

.title {
    font-size: 1.1rem;
    font-weight: bold;
    text-align: center;
    word-break: break-all;
    width: 100%;
}

.footer-fixed {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    min-height: 56px;
    background: #fff2e0ee;
    box-shadow: 0 -2px 12px #0001;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    padding: 12px 0 8px 0;
    border-top: 1px solid #ddd;
    z-index: 100;
}

.list-btn {
    padding: 8px 20px;
    border-radius: 8px;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 2px 6px #0001;
    background: #ffe3c0;
    color: #a34c00;
    transition: background 0.2s;
}

.list-btn:hover {
    background: #ffd699;
}
</style>
