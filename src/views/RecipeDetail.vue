<template>
    <div class="recipe-detail">
        <p v-if="isLoading">読み込み中...</p>
        <p v-else-if="error" style="color: red;">{{ error }}</p>
        <div v-else class="recipe_tile">
            <div class="recipe_left">
                <img v-if="imageUrl" :src="imageUrl" alt="料理画像" class="recipe_image" />
                <div class="recipe_title">{{ title }}</div>
            </div>
            <div class="recipe_right">
                <div class="steps_section">
                    <h3 class="section_title">作り方</h3>
                    <ul class="recipe_steps">
                        <li v-for="(step, idx) in recipe" :key="idx">
                            <span>{{ idx + 1 }}.</span>
                            <span>{{(Array.isArray(step) ? step : step.step)?.map(item => item.value).join(' ')
                                }}</span>
                        </li>
                    </ul>
                </div>
                <div class="comment_section" v-if="comment">
                    <h3 class="section_title">AIからのコメント</h3>
                    <p class="recipe_comment">{{ comment }}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="actions actions-bottom">
        <button class="list-btn" @click="goList">みんなの料理を見る</button>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { loadRecipeById } from '../utils/loadRecipes';

export default {
    name: 'RecipeDetail',
    setup() {
        const title = ref('');
        const comment = ref('');
        const imageUrl = ref('');
        const recipe = ref([]);
        const isLoading = ref(true);
        const error = ref(null);
        const router = useRouter();
        const route = useRoute();

        async function fetchRecipe() {
            try {
                const recipeData = await loadRecipeById(route.params.id);
                if (!recipeData) throw new Error('レシピが見つかりません');
                title.value = recipeData.title || '';
                comment.value = recipeData.comment || '';
                imageUrl.value = recipeData.image;
                recipe.value = recipeData.recipe || [];
            } catch (e) {
                error.value = e.message;
            } finally {
                isLoading.value = false;
            }
        }

        onMounted(fetchRecipe);

        function goList() {
            router.push('/list');
        }

        return { title, comment, imageUrl, recipe, isLoading, error, goList };
    }
};


</script>

<style scoped>
.recipe-detail {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    border-radius: 16px;
    background: #fff2e0;
    padding-bottom: 150px;
}

.recipe_tile {
    display: flex;
    flex-direction: row;
    background: #fff;
    box-shadow: 0 2px 12px #0001;
    overflow: hidden;
    width: 95dvw;
}


.recipe_left {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    background: #fcbb83;
    width: 40%;
    min-height: 100%;
}

.recipe_image {
    width: 100%;
    flex: 1 1 0;
    object-fit: contain;
    align-self: stretch;
    margin-bottom: 0;
}

.recipe_title {
    width: 100%;
    height: auto;
    font-size: 1.6rem;
    margin: 0;
    color: #fff7f0;
    word-break: break-all;
    background: #a34c00;
    text-align: center;
    flex: 0 0 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 56px;
    /* max-height: 20%; */
}

.recipe_right {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 32px 24px;
    min-width: 0;
}

.recipe_steps {
    list-style: none;
    padding: 0;
    margin: 0 0 24px 0;
    text-align: left;
}

.recipe_steps li {
    padding: 8px 0;
    border-bottom: 1px solid #ebba90;
    font-size: 1.2rem;
}

.recipe_steps li:last-child {
    border-bottom: none;
}

.section_title {
    margin: 0 0 8px 0;
    font-size: 1.2rem;
    color: #a34c00;
    font-weight: bold;
}

.steps_section {
    margin-bottom: 24px;
}

.comment_section {
    margin-top: 16px;
}

.recipe_comment {
    margin-top: 16px;
    color: #a34c00;
    font-size: 1.4rem;
    word-break: break-all;
}

.actions-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: #fff;
    padding: 8px 0 8px 0;
    display: flex;
    justify-content: center;
    gap: 12px;
    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.04);
}

.create-btn,
.list-btn {
    background: #42b983;
    color: #fff;
    font-weight: bold;
    font-size: 1.1rem;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background 0.2s;
}

.create-btn {
    background: #369870;
}

.list-btn {
    background: #1565c0;
}


/* for mobile */
@media (max-width: 1000px) {
    .recipe_tile {
        flex-direction: column;
        width: 98vw;
        min-width: 0;
        max-width: 600px;
        margin: 0 auto;
    }

    .recipe_left {
        min-width: 0;
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: stretch;
        flex: none;
    }

    .recipe_right {
        min-width: 0;
        width: 100%;
        padding: 24px 12px;
    }

    .recipe_image {
        width: 100%;
        height: auto;
        margin-bottom: 0;
        object-fit: contain;
        background: #fff;
        align-self: stretch;
        display: block;
        flex: 1 1 auto;
    }

    .recipe_title {
        margin-top: 0;
    }

    .steps_section,
    .comment_section {
        padding: 0 8px;
    }
}
</style>
