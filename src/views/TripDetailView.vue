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
      tempBudget: 0,
      showMemoryForm: false,
      memoriesText: '',
      isExpanded: false,
    }
  },
  computed: {
    trip() {
      return useTripStore().getTripById(this.id)
    },
    truncatedMemories() {
      if (!this.trip || !this.trip.memories) return ''
      if (this.isExpanded || this.trip.memories.length <= 85) {
        return this.trip.memories
      }
      return this.trip.memories.substring(0, 85) + '...'
    },
  },
  methods: {
    startEditBudget() {
      if (this.trip) {
        this.tempBudget = this.trip.budget
        this.isEditingBudget = true
      }
    },
    saveBudget() {
      useTripStore().updateTripBudget(Number(this.id), this.tempBudget)
      this.isEditingBudget = false
    },
    openCompleteModal() {
      if (this.trip) {
        this.memoriesText = this.trip.memories || ''
        this.showMemoryForm = true
      }
    },
    saveCompletion() {
      if (this.memoriesText.trim() === '') {
        alert('Prosím, napíšte aspoň krátku spomienku alebo mená ľudí.')
        return
      }
      useTripStore().updateTripStatus(Number(this.id), true, this.memoriesText)
      this.showMemoryForm = false
      this.$router.push('/history')
    },
    revertTrip() {
      const confirmMsg =
        'Naozaj chcete vrátiť tento výlet medzi plánované? Všetky zapísané spomienky a označenie o ukončení sa nenávratne zmažú.'
      if (confirm(confirmMsg)) {
        useTripStore().updateTripStatus(Number(this.id), false, '')
      }
    },
  },
}
</script>

<template>
  <div v-if="trip" class="detail-layout">
    <header class="detail-header">
      <h1>{{ trip.title }}</h1>
      <router-link to="/" class="back-link"> ← Späť na zoznam </router-link>
    </header>

    <div v-if="trip.completed" class="completion-banner">
      <div class="banner-text">
        <span class="icon">🎉</span>
        <div>
          <strong>Tento výlet je už v tvojej histórii</strong>
          <p>Uložené spomienky nájdeš v detaile nižšie.</p>
        </div>
      </div>
      <button @click="revertTrip" class="btn-revert">Vrátiť medzi plánované</button>
    </div>

    <div class="detail-hero">
      <div class="hero-image-container">
        <img :src="trip.image" :alt="trip.title" class="hero-img" />
      </div>

      <div class="hero-content">
        <div v-if="!isEditingBudget" class="budget-display">
          <BudgetSummary :totalBudget="trip.budget" :itinerary="trip.itinerary" />
          <button class="btn-edit-small" @click="startEditBudget">Upraviť rozpočet</button>
        </div>
        <div v-else class="budget-edit">
          <BaseInput v-model.number="tempBudget" type="number" label="Nový rozpočet" step="100" />
          <button class="btn-save" @click="saveBudget">Uložiť</button>
        </div>

        <div class="trip-actions">
          <button v-if="!trip.completed" @click="openCompleteModal" class="btn-complete">
            ✅ Ukončiť výlet a zapísať spomienky
          </button>

          <div v-if="trip.completed && trip.memories" class="memories-journal">
            <div class="journal-header">
              <span class="journal-icon">✍️</span>
              <h4>Moje spomienky</h4>
            </div>
            <div class="journal-content">
              <p>{{ truncatedMemories }}</p>
              <button
                v-if="trip.memories.length > 85"
                @click="isExpanded = !isExpanded"
                class="btn-read-more"
              >
                {{ isExpanded ? 'Zobraziť menej' : 'Čítať viac' }}
              </button>
            </div>
          </div>
        </div>

        <nav class="sub-navigation-links">
          <router-link :to="'/trip/' + id + '/itinerary'" class="nav-btn">
            Zobraziť itinerár
          </router-link>
          <router-link :to="'/trip/' + id + '/gallery'" class="nav-btn secondary">
            Zobraziť galériu
          </router-link>
        </nav>
      </div>
    </div>

    <div v-if="showMemoryForm" class="modal-overlay">
      <div class="modal-window">
        <h3>Uzatvorenie výletu: {{ trip.title }}</h3>
        <p>Napíš krátku spomienku, na čo nechceš zabudnúť alebo s kým si tam bol/a:</p>
        <textarea
          v-model="memoriesText"
          placeholder="Napr.: Úžasný výlet so spolužiakmi. Najviac sa nám páčil výhľad z veže a miestne trhy..."
          class="memory-textarea"
        ></textarea>
        <div class="modal-buttons">
          <button @click="saveCompletion" class="btn-submit-modal">Uložiť do histórie</button>
          <button @click="showMemoryForm = false" class="btn-cancel-modal">Zrušiť</button>
        </div>
      </div>
    </div>

    <main class="detail-main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
h1 {
  font-size: 4rem;
  margin: 0;
}

.detail-layout {
  max-width: 1000px;
  margin: 0 auto;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.back-link,
.btn-revert,
.btn-edit-small,
.btn-save,
.btn-complete,
.nav-btn,
.btn-submit-modal,
.btn-cancel-modal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease-in-out;
}

.back-link:hover,
.btn-revert:hover,
.btn-edit-small:hover,
.btn-save:hover,
.btn-complete:hover,
.nav-btn:hover,
.btn-submit-modal:hover,
.btn-cancel-modal:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.btn-save,
.btn-submit-modal,
.btn-complete {
  background-color: #42b983;
  color: white;
}

.btn-complete {
  background: linear-gradient(135deg, #42b983 0%, #3aa876 100%);
  padding: 18px;
  font-size: 1.05rem;
  width: 100%;
}

.btn-save,
.btn-submit-modal {
  padding: 12px 24px;
}

.back-link {
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  font-size: 0.9rem;
}

.nav-btn,
.btn-cancel-modal,
.btn-edit-small {
  background-color: #f1f3f5;
  color: #2c3e50;
  padding: 12px 20px;
  border: 1px solid #e9ecef;
}

.btn-edit-small {
  font-size: 0.85rem;
  width: 100%;
  margin-top: 10px;
}

.btn-revert {
  background: #ff4d4d;
  color: white;
  padding: 8px 15px;
  font-size: 0.8rem;
}

.completion-banner {
  background: #e8f5e9;
  border-left: 5px solid #42b983;
  padding: 15px 25px;
  border-radius: 12px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.banner-text {
  display: flex;
  align-items: center;
  gap: 15px;
}

.banner-text .icon {
  font-size: 1.5rem;
}
.banner-text strong {
  color: #1b5e20;
  display: block;
}
.banner-text p {
  margin: 0;
  font-size: 0.85rem;
  color: #4caf50;
}

.detail-hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
}

.hero-image-container {
  width: 100%;
  height: 350px;
  overflow: hidden;
  border-radius: 15px;
  background-color: #f0f0f0;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.budget-display,
.budget-edit {
  background: #fcfcfc;
  padding: 10px;
  border-radius: 12px;
}

.trip-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
}

.sub-navigation-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.memories-journal {
  background: #fffce3;
  padding: 25px;
  border-radius: 4px;
  border-left: 4px solid #42b983;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  margin-top: 15px;
  margin-bottom: 15px;
  overflow: hidden;
}

.journal-content {
  background-image: linear-gradient(#e1e1e1 1px, transparent 1px);
  background-size: 100% 2.2rem;
  line-height: 2.2rem;
  margin-top: 10px;
}

.journal-header {
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.journal-icon {
  font-size: 1.2rem;
}

.memories-journal h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.memories-journal p {
  margin: 0;
  color: #4a5568;
  font-style: italic;
  font-family: 'Georgia', serif;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-wrap: break-word;
}

.btn-read-more {
  background: none;
  border: none;
  color: #42b983;
  font-weight: bold;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 5px 0;
  text-decoration: underline;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
  padding: 20px;
}

.modal-window {
  background: white;
  padding: 40px;
  border-radius: 28px;
  width: 100%;
  max-width: 550px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: modalAppear 0.3s ease-out;
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-window h3 {
  color: #1e293b;
  font-size: 1.6rem;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 12px;
}

.modal-window p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 24px;
}

.memory-textarea {
  width: 100%;
  height: 150px;
  margin: 0 0 24px 0;
  padding: 16px;
  border: 2px solid #f1f5f9;
  border-radius: 16px;
  background-color: #f8fafc;
  font-family: inherit;
  font-size: 1rem;
  color: #334155;
  resize: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.memory-textarea:focus {
  outline: none;
  border-color: #42b983;
  background-color: #ffffff;
  box-shadow: 0 0 0 4px rgba(66, 185, 131, 0.1);
}

.modal-buttons {
  display: flex;
  flex-direction: row-reverse;
  gap: 12px;
}

.btn-submit-modal {
  flex: 2;
  background: linear-gradient(135deg, #42b983 0%, #3aa876 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.2);
}

.btn-submit-modal:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(66, 185, 131, 0.3);
  background: linear-gradient(135deg, #48c78e 0%, #3fb680 100%);
}

.btn-cancel-modal {
  flex: 1;
  background: #f1f5f9;
  color: #64748b;
  border: none;
  padding: 16px;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-cancel-modal:hover {
  background: #e2e8f0;
  color: #1e293b;
}

@media (max-width: 600px) {
  .sub-navigation-links {
    grid-template-columns: 1fr;
  }
  .hero-image-container {
    height: 250px;
  }
  .detail-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
