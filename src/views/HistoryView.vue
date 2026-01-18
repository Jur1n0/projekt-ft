<script lang="ts">
import { useTripStore } from '../stores/trip'
import TripCard from '../components/TripCard.vue'

export default {
  name: 'HistoryView',
  components: { TripCard },
  computed: {
    completedTrips() {
      return useTripStore().allTrips.filter((t) => t.completed)
    },
  },
}
</script>

<template>
  <div class="history-view">
    <header class="view-header">
      <h1>História ciest</h1>
      <p>Tvoje prežité dobrodružstvá a spomienky.</p>
    </header>

    <div class="trip-grid">
      <TripCard v-for="trip in completedTrips" :key="trip.id" :trip="trip" />
    </div>

    <div v-if="completedTrips.length === 0" class="empty-state">
      <p>Zatiaľ nemáš žiadne ukončené výlety. Cestuj a ukladaj si spomienky!</p>
    </div>
  </div>
</template>

<style scoped>
.history-view {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}
.view-header {
  margin-bottom: 2rem;
  text-align: center;
}
.trip-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}
.empty-state {
  text-align: center;
  margin-top: 4rem;
  color: #888;
}
</style>
