import { defineStore } from 'pinia'

export interface ItineraryItem {
  id: number
  place: string
  type: string
  price: number
}

export interface TripPhoto {
  id: number
  url: string
  date: string
}

export interface Trip {
  id: number
  title: string
  description: string
  image: string
  budget: number
  itinerary: ItineraryItem[]
  photos: TripPhoto[]
}


export const useTripStore = defineStore('tripStore', {
  state: () => ({
    // Načítanie dát z localStorage pri štarte, ak neexistujú, použije sa prázdne pole
    trips: JSON.parse(localStorage.getItem('my_trips') || '[]') as Trip[]
  }),

  getters: {
    allTrips: (state) => state.trips,
    getTripById: (state) => {
      return (tripId: number | string) => state.trips.find(t => t.id === Number(tripId))
    }
  },

  actions: {
    saveToLocalStorage() {
      localStorage.setItem('my_trips', JSON.stringify(this.trips))
    },

    addTrip(trip: Trip) {
      this.trips.push(trip)
      this.saveToLocalStorage()
    },

    deleteTrip(id: number) {
      this.trips = this.trips.filter(t => t.id !== id)
      this.saveToLocalStorage()
    },

    updateTripBudget(tripId: number, newBudget: number) {
      const trip = this.trips.find(t => t.id === tripId)
      if (trip) {
        trip.budget = newBudget
        this.saveToLocalStorage()
      }
    },

    addItineraryItem(tripId: number, item: ItineraryItem) {
      const trip = this.trips.find(t => t.id === tripId)
      if (trip) {
        trip.itinerary.push(item)
        this.saveToLocalStorage()
      }
    },

    deleteItineraryItem(tripId: number, itemId: number) {
      const trip = this.trips.find(t => t.id === tripId)
      if (trip) {
        trip.itinerary = trip.itinerary.filter(i => i.id !== itemId)
        this.saveToLocalStorage()
      }
    },

    addPhoto(tripId: number, photo: TripPhoto) {
      const trip = this.trips.find(t => t.id === tripId)
      if (trip) {
        // Inicializácia poľa photos, ak by náhodou v starších dátach chýbalo
        if (!trip.photos) trip.photos = []
        trip.photos.push(photo)
        this.saveToLocalStorage()
      }
    },

    deletePhoto(tripId: number, photoId: number) {
      const trip = this.trips.find(t => t.id === tripId)
      if (trip && trip.photos) {
        trip.photos = trip.photos.filter(p => p.id !== photoId)
        this.saveToLocalStorage()
      }
    },

    setCoverPhoto(tripId: number, photoUrl: string) {
      const trip = this.trips.find(t => t.id === tripId);
      if (trip) {
        const defaultIllustration = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500';
        trip.image = (trip.image === photoUrl) ? defaultIllustration : photoUrl;
        this.saveToLocalStorage();
      }
    }
  }
})
