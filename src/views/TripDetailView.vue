<script lang="ts">
import { useTripStore } from '../stores/trip'
import BudgetSummary from '../components/BudgetSummary.vue'
import BaseInput from '../components/BaseInput.vue'

export default {
  name: 'TripDetailView',
  components: { BudgetSummary, BaseInput },
  props: ['id'],
  data() {
    return {
      isEditingBudget: false,
      tempBudget: 0
    }
  },
  computed: {
    trip() {
      return useTripStore().getTripById(this.id)
    }
  },
  methods: {
    startEditBudget() {
      this.tempBudget = this.trip.budget
      this.isEditingBudget = true
    },
    saveBudget() {
      useTripStore().updateTripBudget(Number(this.id), this.tempBudget)
      this.isEditingBudget = false
    }
  }
}
</script>

<template>
  <div v-if="trip" class="detail-layout">
    <header class="detail-header">
      <router-link to="/" class="back-link">
          ← Späť na zoznam
      </router-link>
      <h1>{{ trip.title }}</h1>
    </header>

    <div class="detail-hero">
      <div class="hero-image-container">
        <img :src="trip.image" :alt="trip.title" class="hero-img">
      </div>

      <div class="hero-content">
        <div v-if="!isEditingBudget" class="budget-display">
          <BudgetSummary :totalBudget="trip.budget" :itinerary="trip.itinerary" />
          <button class="btn-edit-small" @click="startEditBudget">Upraviť rozpočet</button>
        </div>
        <div v-else class="budget-edit">
          <BaseInput v-model.number="tempBudget" type="number" label="Nový rozpočet" />
          <button class="btn-save" @click="saveBudget">Uložiť</button>
        </div>

        <nav class="sub-navigation">
          <router-link :to="'/trip/' + id + '/itinerary'" class="nav-btn">
            Zobraziť itinerár
          </router-link>
        </nav>
        <nav class="sub-navigation">
          <router-link :to="'/trip/' + id + '/gallery'" class="nav-btn secondary">
            Zobraziť galériu
          </router-link>
        </nav>
      </div>
    </div>

    <main class="detail-main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.hero-image-container {
  width: 100%;
  height: 300px; /* Fixná výška pre zachovanie konzistencie */
  overflow: hidden;
  border-radius: 12px;
  background-color: #eee; /* Pozadie, kým sa fotka načíta */
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Najdôležitejšia časť: oreže fotku bez deformácie */
  display: block;
  transition: opacity 0.3s ease-in-out;
}

.detail-hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Pružnejší grid */
  gap: 30px;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  margin-bottom: 40px;
  min-height: min-content; /* Zabráni pretekaniu */
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Zarovnanie na začiatok */
  gap: 15px;
}

.btn-edit-small {
  background: #42b983;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.btn-save {
  background: #42b983;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.nav-btn {
  display: block;
  padding: 12px;
  background: #2c3e50;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  text-align: center;
}

.nav-btn:hover{
  background: #42b983;
}

.back-link {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;

}
</style>
