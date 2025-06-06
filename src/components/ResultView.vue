<template>
    <div class="result-pdf-wrapper">
        <div class="result-layout">
            <div class="left">
                <div class="image-area">
                    <img v-if="image_url" :src="image_url" alt="料理イメージ" />
                </div>
                <div class="title-area">
                    <h1>{{ title }}</h1>
                </div>
            </div>
            <div class="right">
                <div class="recipe-area">
                    <RecipeView :recipe="recipe" />
                </div>
                <div class="comment-area">
                    <p>{{ comment }}</p>
                </div>
            </div>
        </div>
        <div class="result-footer">
            <button class="list-btn" @click="$router.push('/')">みんなの料理を見る</button>
        </div>
    </div>
</template>

<script setup>
import RecipeView from './RecipeView.vue';
const props = defineProps({
    title: String,
    comment: String,
    image_url: String,
    recipe: Array
});
</script>

<style scoped>
.result-pdf-wrapper {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.result-layout {
    display: flex;
    aspect-ratio: 1.414/1;
    width: 90vw;
    max-width: 1200px;
    min-width: 900px;
    background: #fff7f0;
    border: 2px solid #e6a96b;
    border-radius: 16px;
    box-shadow: 0 4px 24px #0002;
    margin-top: 32px;
    margin-bottom: 0;
    overflow: hidden;
    position: relative;
}

.left,
.right {
    width: 50%;
    display: flex;
    flex-direction: column;
}

.image-area {
    flex: 0 0 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80%;
    background: #ffe3c0;
}

.image-area img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 2px 8px #ccc;
}

.title-area {
    flex: 0 0 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1em;
    font-weight: bold;
    background: #d2691e;
    color: #fff;
    border-top: 1px solid #b85c16;
}

.right {
    justify-content: flex-start;
    background: #fff2e0;
}

.recipe-area {
    flex: 0 0 70%;
    overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
}

.comment-area {
    flex: 0 0 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    padding: 12px;
    box-sizing: border-box;
    color: #333;
    background: #ffe3c0;
    border-top: 1px solid #e6a96b;
}

.result-footer {
    display: flex;
    justify-content: center;
    margin-top: 24px;
    gap: 24px;
}

.list-btn {
    font-size: 1.2em;
    padding: 12px 32px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: #ffe3c0;
    color: #a34c00;
    box-shadow: 0 2px 6px #0001;
    transition: background 0.2s;
}

.list-btn:hover {
    background: #ffd699;
}
</style>
