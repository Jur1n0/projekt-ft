<script lang="ts">
import { useTripStore } from '../stores/trip'
import BudgetSummary from '../components/BudgetSummary.vue'

export default {
  name: 'TripDetailView',
  components: {
    BudgetSummary
  },
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
      <router-link to="/" class="back-link">← Späť na zoznam výletov</router-link>
      <h1>{{ trip.title }}</h1>
    </header>

    <div class="detail-hero">
      <div class="hero-image-container">
        <img :src="trip.image" :alt="trip.title" class="hero-img">
      </div>

      <div class="hero-content">
        <p class="trip-desc">{{ trip.description }}</p>

        <BudgetSummary
          :totalBudget="trip.budget"
          :itinerary="trip.itinerary"
        />

        <nav class="sub-navigation">
          <router-link :to="'/trip/' + id + '/itinerary'" class="nav-btn">
            Zobraziť itinerár
          </router-link>
        </nav>
      </div>
    </div>

    <main class="detail-main-content">
      <router-view />
    </main>
  </div>

  <div v-else class="not-found">
    <h2>Výlet sa nenašiel</h2>
    <router-link to="/">Vrátiť sa na hlavnú stránku</router-link>
  </div>
</template>

<style scoped>
.detail-layout {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.detail-header {
  margin-bottom: 30px;
}

.back-link {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
}

.detail-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  margin-bottom: 40px;
}

.hero-img {
  width: 100%;
  height: 100%;
  min-height: 250px;
  object-fit: cover;
  border-radius: 10px;
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.trip-desc {
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
}

.sub-navigation {
  margin-top: 25px;
}

.nav-btn {
  display: inline-block;
  padding: 12px 20px;
  background: #2c3e50;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  width: 100%;
}

.router-link-active.nav-btn {
  background: #42b983;
}

.detail-main-content {
  background: #fdfdfd;
  border-radius: 15px;
}

.not-found {
  text-align: center;
  padding: 100px 20px;
}

@media (max-width: 768px) {
  .detail-hero {
    grid-template-columns: 1fr;
  }
}
</style>
