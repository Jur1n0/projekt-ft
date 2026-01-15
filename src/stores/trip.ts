import { defineStore } from 'pinia'

interface ItineraryItem {
  id: number
  place: string
  type: string
  price: number
}

interface Trip {
  id: number
  title: string
  description: string
  image: string
  budget: number
  itinerary: ItineraryItem[]
}

export const useTripStore = defineStore('tripStore', {
  state: () => {
    return {
      trips: localStorage.getItem('my_trips')
        ? JSON.parse(localStorage.getItem('my_trips') as string)
        : [
          {
            id: 1,
            title: 'Víkend v Prahe',
            description: 'Pamiatky a gastronómia v srdci Česka.',
            image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=500',
            budget: 300,
            itinerary: [
              { id: 101, place: 'Karlov most', type: 'Pamiatka', price: 0 },
              { id: 102, place: 'Tradičná večera', type: 'Jedlo', price: 45 }
            ]
          }
        ] as Trip[]
    }
  },

  getters: {
    allTrips: (state) => state.trips,
    getTripById: (state) => {
      return (tripId: string | number) => state.trips.find(trip => trip.id === parseInt(tripId as string))
    }
  },

  actions: {
    addTrip(newTrip: Trip) {
      this.trips.push(newTrip)
      localStorage.setItem('my_trips', JSON.stringify(this.trips))
    },

    deleteTrip(id: number) {
      this.trips = this.trips.filter(trip => trip.id !== id)
      localStorage.setItem('my_trips', JSON.stringify(this.trips))
    },

    addItineraryItem(tripId: number, item: ItineraryItem) {
      const trip = this.trips.find(t => t.id === tripId)
      if (trip) {
        trip.itinerary.push(item)
        localStorage.setItem('my_trips', JSON.stringify(this.trips))
      }
    }
  }
})
