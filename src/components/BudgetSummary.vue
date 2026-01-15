<script lang="ts">
export interface ItineraryItem {
  id: number;
  place: string;
  type: string;
  price: number;
}

export default {
  name: 'BudgetSummary',
  props: {
    totalBudget: {
      type: Number,
      required: true
    },
    itinerary: {
      type: Array as () => ItineraryItem[],
      required: true
    }
  },
  computed: {
    totalSpent(): number {
      return this.itinerary.reduce((sum, item) => sum + item.price, 0);
    },
    remainingBudget(): number {
      return this.totalBudget - this.totalSpent;
    },
    isOverBudget(): boolean {
      return this.remainingBudget < 0;
    }
  }
}
</script>

<template>
  <div class="budget-summary" :class="{ 'over-budget': isOverBudget }">
    <div class="summary-item">
      <span>Minuté:</span>
      <strong>{{ totalSpent }} €</strong>
    </div>
    <div class="summary-item">
      <span>Zostáva:</span>
      <strong :class="isOverBudget ? 'text-danger' : 'text-success'">
        {{ remainingBudget }} €
      </strong>
    </div>
    <div v-if="isOverBudget" class="warning-msg">
      Pozor! Prekročili ste rozpočet!
    </div>
  </div>
</template>

<style scoped>
.budget-summary {
  background: #fdfdfd;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
}

.over-budget {
  border-color: #ff4d4d;
  background-color: #fff5f5;
}

.text-success {
  color: #42b983;
}

.text-danger {
  color: #ff4d4d;
}

.warning-msg {
  font-size: 0.8rem;
  font-weight: bold;
  color: #ff4d4d;
  text-align: center;
  margin-top: 5px;
}
</style>
