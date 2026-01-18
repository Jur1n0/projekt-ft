<script lang="ts">
import { useTripStore } from '../stores/trip'
import TripCard from '../components/TripCard.vue'
import BaseInput from '../components/BaseInput.vue'

export default {
  name: 'HomeView',
  components: {
    TripCard,
    BaseInput,
  },
  data() {
    return {
      isFormVisible: false,
      newTrip: {
        title: '',
        description: '',
        budget: 0,
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500',
      },
    }
  },
  computed: {
    trips() {
      const tripStore = useTripStore()
      return tripStore.allTrips.filter((t) => !t.completed)
    },
  },
  methods: {
    toggleForm() {
      this.isFormVisible = !this.isFormVisible
    },
    handleDelete(id: number) {
      const tripStore = useTripStore()
      if (confirm('Naozaj chcete vymazať tento výlet?')) {
        tripStore.deleteTrip(id)
      }
    },
    submitForm() {
      if (this.newTrip.title.trim() === '') {
        alert('Prosím, zadajte názov výletu.')
        return
      }

      const tripStore = useTripStore()
      tripStore.addTrip({
        ...this.newTrip,
        id: Date.now(),
        itinerary: [],
        photos: [],
        completed: false,
        memories: '',
      })

      this.resetForm()
    },
    resetForm() {
      this.newTrip = {
        title: '',
        description: '',
        budget: 0,
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500',
      }
      this.isFormVisible = false
    },
  },
}
</script>

<template>
  <div class="home-view">
    <header class="view-header">
      <h1>Moje výlety</h1>
      <button class="btn-primary" @click="toggleForm">
        {{ isFormVisible ? 'Zrušiť' : '+ Pridať výlet' }}
      </button>
    </header>

    <div v-if="isFormVisible" class="form-container">
      <h2>Kam sa chystáte?</h2>
      <BaseInput v-model="newTrip.title" label="Cieľová destinácia" placeholder="napr. Paríž" />
      <BaseInput
        v-model="newTrip.description"
        label="Popis výletu"
        placeholder="Krátky popis plánu..."
      />
      <BaseInput v-model.number="newTrip.budget" type="number" step="100" label="Rozpočet (€)" />
      <button class="btn-submit" @click="submitForm">Uložiť plán</button>
    </div>

    <div class="trip-grid">
      <TripCard v-for="trip in trips" :key="trip.id" :trip="trip" @delete="handleDelete" />
    </div>

    <div v-if="trips.length === 0" class="empty-state">
      <p>
        Zatiaľ nemáte žiadne naplánované výlety. Kliknite na tlačidlo vyššie a začnite plánovať!
      </p>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.btn-primary {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(34, 34, 34, 0.1);
}

.form-container {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 3rem;
  border: 1px solid #eee;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.btn-submit {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 10px;
  transition: all 0.2s ease-in-out;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(34, 34, 34, 0.1);
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
  font-style: italic;
}
</style>
