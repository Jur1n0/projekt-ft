<script lang="ts">
import { useTripStore } from '../stores/trip'

export default {
  name: 'TripDetailView',
  props: ['id'],
  computed: {
    trip() {
      const tripStore = useTripStore()
      return tripStore.getTripById(this.id)
    }
  }
}
</script>

<template>
  <div v-if="trip" class="detail-layout">
    <header class="detail-header">
      <router-link to="/" class="back-link">← Zoznam výletov</router-link>
      <h1>{{ trip.title }}</h1>
    </header>

    <div class="detail-hero">
      <img :src="trip.image" :alt="trip.title" class="hero-img">
      <div class="hero-info">
        <div class="budget-info">
          <span>Celkový rozpočet:</span>
          <strong>{{ trip.budget }} €</strong>
        </div>
        <nav class="detail-nav">
          <router-link :to="'/trip/' + id + '/itinerary'" class="nav-item">
            Plán cesty
          </router-link>
        </nav>
      </div>
    </div>

    <main class="detail-content">
      <router-view />
    </main>
  </div>

  <div v-else class="not-found">
    <p>Výlet sa nenašiel.</p>
    <router-link to="/">Späť domov</router-link>
  </div>
</template>

<style scoped>
.detail-layout {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.detail-header {
  margin-bottom: 20px;
}

.back-link {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.detail-hero {
  display: flex;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.hero-img {
  width: 250px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.hero-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.budget-info {
  font-size: 1.1rem;
}

.budget-info strong {
  color: #42b983;
  font-size: 1.3rem;
  margin-left: 5px;
}

.detail-nav {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.nav-item {
  padding: 8px 16px;
  background: #eee;
  color: #333;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
}

/* Štýl pre aktívny odkaz v menu */
.router-link-active.nav-item {
  background: #42b983;
  color: white;
}

.detail-content {
  margin-top: 20px;
}

.not-found {
  text-align: center;
  margin-top: 50px;
}

@media (max-width: 600px) {
  .detail-hero {
    flex-direction: column;
  }
  .hero-img {
    width: 100%;
  }
}
</style>
