<template>
    <div class="recipe-area">
        <h2>レシピ</h2>
        <transition-group name="recipe-fade" tag="ul" class="recipe-list">
            <li v-for="(item, idx) in recipe" :key="idx" class="recipe-item">
                <span class="step-index">手順{{ idx + 1 }}:</span>
                <span class="ingredient">{{ item.ingredient }}</span>
                <span class="wo-text">を</span>
                <span class="operation">{{ item.operation || '（操作未選択）' }}</span>
            </li>
        </transition-group>
    </div>
</template>

<script setup>
defineProps({ recipe: Array });
</script>

<style scoped>
.step-index {
    min-width: 5.5em;
    color: #b85c16;
    font-size: 1.05em;
    font-family: "Noto Sans JP", sans-serif;
    margin-right: 4px;
    text-align: right;
    user-select: none;
}

.recipe-list {
    flex: 1 1 auto;
    min-height: 0;
    max-height: none;
    overflow-y: auto;
    display: block;
    position: relative;
    padding: 0;
    margin: 0;
    list-style: none;
}

.recipe-area {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
