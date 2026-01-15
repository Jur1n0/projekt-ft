<script lang="ts">
import { useTripStore } from '../stores/trip'

export default {
  name: 'GalleryView',
  computed: {
    trips() {
      return useTripStore().allTrips
    }
  }
}
</script>

<template>
  <div class="gallery-page">
    <h1>Moja Galéria</h1>
    <div class="trip-grid">
      <router-link
        v-for="trip in trips"
        :key="trip.id"
        :to="'/trip/' + trip.id + '/gallery'"
        class="trip-gallery-card"
      >
        <img :src="trip.image" :alt="trip.title" class="card-img">
        <div class="card-overlay">
          <h3>{{ trip.title }}</h3>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.trip-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 v riadku */
  gap: 25px;
  padding: 20px 0;
}

.trip-gallery-card {
  position: relative;
  height: 280px;
  border-radius: 15px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.trip-gallery-card:hover {
  transform: translateY(-5px);
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: background 0.3s;
}

.trip-gallery-card:hover .card-overlay {
  background: rgba(0, 0, 0, 0.2);
}

.card-overlay h3 {
  color: white;
  margin: 0;
  font-size: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  text-align: center;
}

@media (max-width: 900px) { .trip-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .trip-grid { grid-template-columns: 1fr; } }
</style>
