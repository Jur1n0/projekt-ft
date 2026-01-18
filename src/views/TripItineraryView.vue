<script lang="ts">
import { useTripStore } from '../stores/trip'
import ItineraryItem from '../components/ItineraryItem.vue'
import BaseInput from '../components/BaseInput.vue'

export default {
  name: 'TripItineraryView',
  components: {
    ItineraryItem,
    BaseInput,
  },
  props: ['id'],
  data() {
    return {
      newItem: {
        place: '',
        type: 'Pamiatka',
        price: 0,
      },
    }
  },
  computed: {
    trip() {
      const tripStore = useTripStore()
      return tripStore.getTripById(this.id)
    },
  },
  methods: {
    removeItem(itemId: number) {
      const tripStore = useTripStore()
      tripStore.deleteItineraryItem(Number(this.id), itemId)
    },
    addItem() {
      if (this.newItem.place.trim() === '') {
        alert('Prosím, zadajte názov miesta.')
        return
      }

      const tripStore = useTripStore()
      tripStore.addItineraryItem(Number(this.id), {
        ...this.newItem,
        id: Date.now(),
      })

      this.newItem = {
        place: '',
        type: 'Pamiatka',
        price: 0,
      }
    },
  },
}
</script>

<template>
  <div v-if="trip" class="itinerary-box">
    <h3>Itinerár</h3>

    <div class="add-item-form">
      <h3>Pridať nový záznam</h3>
      <BaseInput v-model="newItem.place" label="Názov záznamu *" placeholder="Čo pridávame?" />
      <div class="form-row">
        <div class="input-group">
          <label>Typ</label>
          <select v-model="newItem.type" class="custom-select">
            <option>Pamiatka</option>
            <option>Jedlo</option>
            <option>Doprava</option>
            <option>Ubytovanie</option>
          </select>
        </div>
        <BaseInput v-model.number="newItem.price" type="number" label="Cena (€)" step="10" />
      </div>

      <button @click="addItem" class="btn-add">Pridať do plánu</button>
    </div>

    <div class="items-list">
      <ItineraryItem
        v-for="item in trip.itinerary"
        :key="item.id"
        :item="item"
        @delete="removeItem"
      />
    </div>
  </div>
</template>

<style scoped>
h3 {
  color: #42b983;
  font-size: 1.7rem;
  margin: 0;
  margin-bottom: 1rem;
}

.itinerary-box {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.add-item-form {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #eee;
}

.add-item-form h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
  font-size: 1.3rem;
}

.form-row {
  display: flex;
  gap: 15px;
  align-items: flex-end;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  flex: 1;
}

.input-group label {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
}

.custom-select {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: white;
}

.btn-add {
  width: 100%;
  padding: 10px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(34, 34, 34, 0.1);
}

.items-list {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}
</style>
