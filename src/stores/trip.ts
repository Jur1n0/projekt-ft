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
  completed: boolean
  memories?: string
}

export const useTripStore = defineStore('tripStore', {
  state: () => ({
    trips: JSON.parse(localStorage.getItem('my_trips') || '[]') as Trip[],
  }),

  getters: {
    allTrips: (state) => state.trips,
    getTripById: (state) => {
      return (tripId: number | string) => state.trips.find((t) => t.id === Number(tripId))
    },

    totalTripsCount: (state) => state.trips.length,
    completedTripsCount: (state) => state.trips.filter((t) => t.completed).length,
    activeTripsCount: (state) => state.trips.filter((t) => !t.completed).length,

    totalGlobalBudget: (state) => state.trips.reduce((sum, trip) => sum + (trip.budget || 0), 0),

    totalGlobalSpent: (state) =>
      state.trips.reduce((sum, trip) => {
        const tripSpent = trip.itinerary?.reduce((iSum, item) => iSum + item.price, 0) || 0
        return sum + tripSpent
      }, 0),

    totalBudgetCompleted: (state) =>
      state.trips.filter((t) => t.completed).reduce((sum, t) => sum + (t.budget || 0), 0),

    totalBudgetActive: (state) =>
      state.trips.filter((t) => !t.completed).reduce((sum, t) => sum + (t.budget || 0), 0),

    totalPhotosCount: (state) =>
      state.trips.reduce((sum, trip) => sum + (trip.photos?.length || 0), 0),

    averageTripBudget: (state) => {
      if (state.trips.length === 0) return 0
      const total = state.trips.reduce((sum, t) => sum + (t.budget || 0), 0)
      return Math.round(total / state.trips.length)
    },

    mostExpensiveTrip: (state) => {
      if (state.trips.length === 0) return null
      return [...state.trips].sort((a, b) => b.budget - a.budget)[0]
    },
  },

  actions: {
    saveToLocalStorage() {
      localStorage.setItem('my_trips', JSON.stringify(this.trips))
    },

    addTrip(trip: Trip) {
      this.trips.push({
        ...trip,
        completed: false,
        memories: '',
      })
      this.saveToLocalStorage()
    },

    deleteTrip(id: number) {
      this.trips = this.trips.filter((t) => t.id !== id)
      this.saveToLocalStorage()
    },

    updateTripBudget(tripId: number, newBudget: number) {
      const trip = this.trips.find((t) => t.id === tripId)
      if (trip) {
        trip.budget = newBudget
        this.saveToLocalStorage()
      }
    },

    addItineraryItem(tripId: number, item: ItineraryItem) {
      const trip = this.trips.find((t) => t.id === tripId)
      if (trip) {
        trip.itinerary.push(item)
        this.saveToLocalStorage()
      }
    },

    deleteItineraryItem(tripId: number, itemId: number) {
      const trip = this.trips.find((t) => t.id === tripId)
      if (trip) {
        trip.itinerary = trip.itinerary.filter((i) => i.id !== itemId)
        this.saveToLocalStorage()
      }
    },

    addPhoto(tripId: number, photo: TripPhoto) {
      const trip = this.trips.find((t) => t.id === tripId)
      if (trip) {
        if (!trip.photos) trip.photos = []
        trip.photos.push(photo)
        this.saveToLocalStorage()
      }
    },

    deletePhoto(tripId: number, photoId: number) {
      const trip = this.trips.find((t) => t.id === tripId)
      if (trip && trip.photos) {
        trip.photos = trip.photos.filter((p) => p.id !== photoId)
        this.saveToLocalStorage()
      }
    },

    setCoverPhoto(tripId: number, photoUrl: string) {
      const trip = this.trips.find((t) => t.id === tripId)
      if (trip) {
        const defaultIllustration =
          'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500'
        trip.image = trip.image === photoUrl ? defaultIllustration : photoUrl
        this.saveToLocalStorage()
      }
    },

    updateTripStatus(tripId: number, status: boolean, memories: string = '') {
      const trip = this.trips.find((t) => t.id === tripId)
      if (trip) {
        trip.completed = status
        trip.memories = memories
        this.saveToLocalStorage()
      }
    },
  },
})
