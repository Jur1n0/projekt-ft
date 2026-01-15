<script lang="ts">
export default {
  name: 'TripCard',
  props: {
    trip: {
      type: Object,
      required: true
    }
  },
  emits: ['delete'],
  methods: {
    handleDelete() {
      this.$emit('delete', this.trip.id)
    }
  }
}
</script>

<template>
  <div class="card">
    <img :src="trip.image" :alt="trip.title" class="card-img">
    <div class="card-content">
      <h3 class="card-title">{{ trip.title }}</h3>
      <p class="card-desc">{{ trip.description }}</p>
      <div class="card-meta">
        <span class="card-budget">{{ trip.budget }} €</span>
        <div class="card-actions">
          <router-link :to="'/trip/' + trip.id" class="btn-detail">
            Detail
          </router-link>

          <button class="btn-delete" @click="handleDelete">
            ✕
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.card-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  margin: 0 0 0.5rem 0;
}

.card-desc {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  height: 3rem;
  overflow: hidden;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-budget {
  font-weight: bold;
  color: #42b983;
}

.card-actions {
  display: flex;
  gap: 10px;
}

.btn-detail {
  background-color: #42b983;
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  display: inline-block;
}

.btn-delete {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
