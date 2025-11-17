import { io, Socket } from 'socket.io-client'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

class SocketService {
  private socket: Socket | null = null

  connect(token?: string) {
    if (this.socket?.connected) {
      return this.socket
    }

    this.socket = io(API_URL, {
      auth: token ? { token } : undefined,
      transports: ['websocket', 'polling']
    })

    this.socket.on('connect', () => {
      console.log('Connected to server')
    })

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  // Recipe events
  onRecipeCreated(callback: (recipe: any) => void) {
    this.socket?.on('recipe:created', callback)
  }

  onRecipeUpdated(callback: (recipe: any) => void) {
    this.socket?.on('recipe:updated', callback)
  }

  onRecipeDeleted(callback: (recipeId: string) => void) {
    this.socket?.on('recipe:deleted', callback)
  }

  // Donation events
  onDonationCreated(callback: (donation: any) => void) {
    this.socket?.on('donation:created', callback)
  }

  onDonationUpdated(callback: (donation: any) => void) {
    this.socket?.on('donation:updated', callback)
  }

  onDonationDeleted(callback: (donationId: string) => void) {
    this.socket?.on('donation:deleted', callback)
  }

  // Notification events
  onNotification(callback: (notification: any) => void) {
    this.socket?.on('notification', callback)
  }

  // Remove listeners
  offRecipeCreated() {
    this.socket?.off('recipe:created')
  }

  offRecipeUpdated() {
    this.socket?.off('recipe:updated')
  }

  offRecipeDeleted() {
    this.socket?.off('recipe:deleted')
  }

  offDonationCreated() {
    this.socket?.off('donation:created')
  }

  offDonationUpdated() {
    this.socket?.off('donation:updated')
  }

  offDonationDeleted() {
    this.socket?.off('donation:deleted')
  }

  offNotification() {
    this.socket?.off('notification')
  }
}

export const socketService = new SocketService()
