<script lang="ts">
export default {
  name: 'TipsView',
  data() {
    return {
      tips: [
        {
          id: 1,
          title: 'Ako ušetriť na letenkách',
          content: 'Používajte inkognito režim v prehliadači a hľadajte lety v utorok poobede.',
          category: 'Peniaze',
        },
        {
          id: 2,
          title: 'Balenie na ľahko',
          content: 'Oblečenie nerolujte, ale ukladajte na plocho. Využite vákuové vrecia.',
          category: 'Balenie',
        },
        {
          id: 3,
          title: 'Lokálna gastronómia',
          content: 'Vyhýbajte sa reštauráciám s obrázkovým menu pri hlavných pamiatkach.',
          category: 'Jedlo',
        },
      ],
    }
  },
}
</script>

<template>
  <div class="tips-page">
    <header class="tips-header">
      <h1>Top tipy na cestovanie</h1>
      <p>Overené rady od skúsených cestovateľov.</p>
    </header>

    <div class="tips-grid">
      <div v-for="tip in tips" :key="tip.id" class="tip-card">
        <span class="tip-category">{{ tip.category }}</span>
        <h3>{{ tip.title }}</h3>
        <p>{{ tip.content }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tips-page {
  max-width: 900px;
  margin: 0 auto;
}

.tips-header {
  text-align: center;
  margin-bottom: 40px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.tip-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-top: 4px solid #42b983;
}

.tip-category {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: #42b983;
  font-weight: bold;
  letter-spacing: 1px;
}

.tip-card h3 {
  margin: 10px 0;
  color: #2c3e50;
}

.tip-card p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
}
</style>
