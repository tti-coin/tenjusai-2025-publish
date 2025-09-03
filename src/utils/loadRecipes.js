// 静的ビルド用のレシピデータ取得ロジック
// 本番運用時はViteのimport.meta.globでrecipes配下をまとめてimportするのが推奨


// data.jsonのsteps(string[])やingredients(string[])をrecipe([{ingredient, operation}])形式に変換
function convertToRecipeFormat(data) {
    // 旧データ形式: ingredients, steps, comment, title
    // 新データ形式: recipe([{ingredient, operation}]), comment, title
    if (Array.isArray(data.recipe)) {
        return data;
    }
    // 仮: steps = ["たまごを割る", "フライパンで焼く"] のような場合
    const recipe = (data.steps || []).map(step => {
        // 「を」で分割し ingredient/operation を推定
        const m = step.match(/(.+?)を(.+)/);
        if (m) {
            return { ingredient: m[1].trim(), operation: m[2].trim() };
        } else {
            return { ingredient: step, operation: '' };
        }
    });
    return {
        ...data,
        recipe,
    };
}

export async function loadRecipes() {
    const modules = import.meta.glob('../../recipes/*/data.json', { eager: true });
    const imageModules = import.meta.glob('../../recipes/*/image.png', { eager: true, as: 'url' });
    const imageThumbnailModules = import.meta.glob('../../recipes/*/image_thumbnail.png', { eager: true, as: 'url' });
    const recipes = Object.entries(modules).map(([path, mod]) => {
        const id = path.split('/').slice(-2, -1)[0];
        const imagePath = `../../recipes/${id}/image.png`;
        const imageThumbnailPath = `../../recipes/${id}/image_thumbnail.png`;
        const data = mod.default || mod;
        const converted = convertToRecipeFormat(data);
        return {
            id,
            ...converted,
            image: imageModules[imagePath],
            image_thumbnail: imageThumbnailModules[imageThumbnailPath],
        };
    })
    // statusが'done'のもののみ抽出
    .filter(recipe => recipe.status === 'done');
    // finished_at（ISO8601文字列やタイムスタンプ）で降順ソート（新しい順）
    recipes.sort((a, b) => {
        if (!a.finished_at && !b.finished_at) return 0;
        if (!a.finished_at) return 1;
        if (!b.finished_at) return -1;
        return new Date(b.finished_at) - new Date(a.finished_at);
    });
    return recipes;
}



// import.meta.globで全件取得し、idでフィルタする方式に統一
const modules = import.meta.glob('../../recipes/*/data.json', { eager: true });
const imageModules = import.meta.glob('../../recipes/*/image.png', { eager: true, as: 'url' });

export async function loadRecipeById(id) {
    // パスの一部にidが含まれるものを探す
    const key = Object.keys(modules).find(path => path.includes(`/${id}/data.json`));
    const imageKey = Object.keys(imageModules).find(path => path.includes(`/${id}/image.png`));
    if (!key) return null;
    const data = modules[key].default || modules[key];
    const converted = convertToRecipeFormat(data);
    return {
        id,
        ...converted,
        image: imageModules[imageKey],
    };
}
