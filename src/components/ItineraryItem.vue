<script lang="ts">
export default {
  name: 'ItineraryItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="itinerary-item">
    <div class="item-info">
      <span class="item-type">{{ item.type }}</span>
      <span class="item-place">{{ item.place }}</span>
    </div>
    <span class="item-price">{{ item.price }} €</span>
  </div>
</template>

<style scoped>
.itinerary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: white;
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
}

.itinerary-item:last-child {
  border-bottom: none;
}

.item-type {
  font-size: 0.75rem;
  text-transform: uppercase;
  background: #e0f2f1;
  color: #00796b;
  padding: 2px 8px;
  border-radius: 10px;
  margin-right: 12px;
  font-weight: bold;
}

.item-place {
  font-weight: 500;
}

.item-price {
  font-weight: bold;
  color: #2c3e50;
}
</style>
