<script lang="ts">
import { useTripStore } from '../stores/trip'

export default {
  name: 'StatsView',
  computed: {
    s() {
      const store = useTripStore()
      return {
        total: store.totalTripsCount,
        done: store.completedTripsCount,
        planned: store.activeTripsCount,
        budgetDone: store.totalBudgetCompleted,
        budgetPlanned: store.totalBudgetActive,
        avg: store.averageTripBudget,
        photos: store.totalPhotosCount,
        spent: store.totalGlobalSpent,
        expensive: store.mostExpensiveTrip,
      }
    },
  },
}
</script>

<template>
  <div class="stats-page">
    <header class="stats-header">
      <h1>Cestovateľský sumár</h1>
    </header>

    <div class="stats-container">
      <section class="stats-section">
        <h3>Prehľad aktivít</h3>
        <div class="stats-grid">
          <div class="stat-card total">
            <span class="label">Všetky cesty</span>
            <span class="value">{{ s.total }}</span>
          </div>
          <div class="stat-card finished">
            <span class="label">Ukončené</span>
            <span class="value">{{ s.done }}</span>
          </div>
          <div class="stat-card active">
            <span class="label">Naplánované</span>
            <span class="value">{{ s.planned }}</span>
          </div>
          <div class="stat-card photo">
            <span class="label">Foto spomienky</span>
            <span class="value">{{ s.photos }}</span>
          </div>
        </div>
      </section>

      <section class="stats-section">
        <h3>Finančný prehľad</h3>
        <div class="stats-grid">
          <div class="stat-card money">
            <span class="label">Minuté v histórii</span>
            <span class="value">{{ s.spent }} €</span>
          </div>
          <div class="stat-card money">
            <span class="label">Budúci rozpočet</span>
            <span class="value">{{ s.budgetPlanned }} €</span>
          </div>
          <div class="stat-card money">
            <span class="label">Priemer na výlet</span>
            <span class="value">{{ s.avg }} €</span>
          </div>
          <div class="stat-card money">
            <span class="label">Najdrahší plán</span>
            <div v-if="s.expensive">
              <span class="value">{{ s.expensive.budget }} €</span>
              <span class="sub-value">{{ s.expensive.title }}</span>
            </div>
            <span v-else class="value">0 €</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.stats-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.stats-section h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  padding-left: 10px;
  border-left: 4px solid #42b983;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.label {
  display: block;
  font-size: 0.85rem;
  color: #888;
  text-transform: uppercase;
  margin-bottom: 8px;
  font-weight: 600;
}

.value {
  font-size: 1.8rem;
  font-weight: 800;
  color: #2c3e50;
}

.sub-value {
  display: block;
  font-size: 0.85rem;
  color: #2c3e50;
  margin-top: 5px;
  font-weight: 500;
  opacity: 0.9;
}

.finished {
  border-top: 5px solid #42b983;
}
.active {
  border-top: 5px solid #3498db;
}
.photo {
  border-top: 5px solid #9b59b6;
}
.total {
  border-top: 5px solid #ff772e;
}
.money {
  border-top: 5px solid #f1c40f;
}
.highlight .label {
  color: #aaa;
}
.highlight .value {
  color: #42b983;
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
