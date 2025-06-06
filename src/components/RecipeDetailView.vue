<template>
    <ResultView v-if="recipe" :title="recipe.title" :comment="recipe.comment" :image_url="recipe.image"
        :recipe="recipe.recipe" />
    <div v-else>
        <p>読み込み中...</p>
    </div>
</template>

<script>
import { loadRecipeById } from '../utils/loadRecipes';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ResultView from './ResultView.vue';

export default {
    name: 'RecipeDetailView',
    components: { ResultView },
    setup() {
        const route = useRoute();
        const recipe = ref(null);
        onMounted(async () => {
            recipe.value = await loadRecipeById(route.params.id);
        });
        return { recipe };
    },
};
</script>

<style scoped>
/* スタイルはResultView.vueに依存 */
</style>
