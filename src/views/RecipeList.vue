<template>
    <div class="recipe-list-container">
        <h2>みんなのレシピ一覧</h2>
        <div v-if="loading" class="loading">読み込み中...</div>
        <div v-else>
            <div v-if="recipes.length === 0" class="empty">まだレシピがありません。</div>
            <ul class="recipe-list">
                <li v-for="recipe in recipes" :key="recipe.job_id" class="recipe-item" @click="goDetail(recipe.job_id)">
                    <div class="recipe-thumb">
                        <img :src="recipe.image_thumbnail" alt="recipe image" />
                    </div>
                    <div class="recipe-title">{{ recipe.title }}</div>
                    <div class="recipe-comment">{{ recipe.comment }}</div>
                    <div class="recipe-date">{{ formatDate(recipe.finished_at) }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
import { loadRecipes } from '../utils/loadRecipes';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'RecipeList',
    setup() {
        const recipes = ref([]);
        const loading = ref(true);
        const router = useRouter();
        function formatDate(dateStr) {
            if (!dateStr) return '';
            const d = new Date(dateStr);
            // JSTに変換して表示
            d.setHours(d.getHours() + 9);
            return d.toLocaleString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        }
        const goDetail = (id) => {
            router.push(`/recipe/${id}`);
        };
        const goCreate = () => {
            router.push('/create');
        };
        onMounted(async () => {
            recipes.value = await loadRecipes();
            loading.value = false;
            console.log('Loaded recipes:', recipes.value);
        });
        return { recipes, loading, formatDate, goDetail, goCreate };
    },
};
</script>


<style scoped>
.recipe-list-container {
    width: 98vw;
    margin: 0;
    padding: 32px 0 80px 0;
    display: flex;
    flex-direction: column;
}

h2 {
    margin-left: 0;
    text-align: center;
    width: 100%;
}


.recipe-list {
    display: grid;
    width: 90%;
    grid-template-columns: repeat(auto-fit, 260px);
    gap: 24px 18px;
    list-style: none;
    padding: 0 0;
    margin: 0 auto;
    justify-items: start;
    align-items: start;
    grid-auto-rows: 1fr;
}

.recipe-item {
    background: #fffefb;
    border: 1.5px solid #e6a96b;
    border-radius: 14px;
    padding: 18px 16px 12px 16px;
    cursor: pointer;
    transition: box-shadow 0.15s;
    box-shadow: 0 2px 8px rgba(230, 169, 107, 0.06);
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-start;
    min-width: 0;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    justify-content: flex-start;
    overflow: hidden;
    max-height: 400px;
}

.recipe-item:hover {
    box-shadow: 0 4px 16px rgba(230, 169, 107, 0.13);
}

.recipe-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #a34c00;
}

.recipe-comment {
    color: #555;
    font-size: 1rem;
    margin-bottom: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    position: relative;
    text-align: left;
    width: 100%;
    margin: 0 0 4px 0;
    max-height: 6.4em;
    -webkit-mask-image: linear-gradient(180deg, #000 80%, transparent 100%);
    mask-image: linear-gradient(180deg, #000 80%, transparent 100%);
}

.recipe-thumb {
    margin: 8px 0;
}

.recipe-thumb img {
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid #eee;
}

.recipe-date {
    color: #888;
    font-size: 0.9rem;
    margin-top: auto;
    align-self: flex-end;
}

.loading {
    color: #aaa;
    text-align: center;
    margin: 40px 0;
}

.empty {
    color: #bbb;
    text-align: center;
    margin: 40px 0;
}

.actions-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: #fff;
    padding: 16px 0 24px 0;
    display: flex;
    justify-content: center;
    gap: 12px;
    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.04);
}

.create-btn {
    background: #42b983;
    color: #fff;
    font-weight: bold;
    font-size: 1.2rem;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background 0.2s;
}
</style>