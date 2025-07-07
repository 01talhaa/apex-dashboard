import { defineStore } from 'pinia'

export interface NotificationAction {
  label: string
  action: () => void
  style?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  icon?: string
}

export interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration: number
  timestamp: number
  persistent?: boolean
  actions?: NotificationAction[]
  priority?: 'low' | 'normal' | 'high' | 'urgent'
  category?: string
  metadata?: Record<string, any>
}

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as Notification[],
    maxNotifications: 6, // Increased limit for better UX
    soundEnabled: true,
    animationEnabled: true,
    position: 'top-right' as 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  }),

  actions: {
    addNotification(
      message: string, 
      type: Notification['type'] = 'info', 
      duration: number = 5000,
      options?: {
        persistent?: boolean
        actions?: NotificationAction[]
        playSound?: boolean
        priority?: Notification['priority']
        category?: string
        metadata?: Record<string, any>
      }
    ) {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      
      const notification: Notification = {
        id,
        message,
        type,
        duration: options?.persistent ? 0 : duration,
        timestamp: Date.now(),
        persistent: options?.persistent || false,
        actions: options?.actions,
        priority: options?.priority || 'normal',
        category: options?.category,
        metadata: options?.metadata
      }

      // Sort by priority (urgent > high > normal > low)
      const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 }
      const insertIndex = this.notifications.findIndex(n => 
        priorityOrder[n.priority || 'normal'] < priorityOrder[notification.priority || 'normal']
      )

      if (insertIndex === -1) {
        this.notifications.push(notification)
      } else {
        this.notifications.splice(insertIndex, 0, notification)
      }

      // Limit the number of notifications
      if (this.notifications.length > this.maxNotifications) {
        const removed = this.notifications.splice(this.maxNotifications)
        // Auto-remove excess notifications
        removed.forEach(n => {
          if (!n.persistent) {
            this.removeNotification(n.id)
          }
        })
      }

      // Play sound if requested and enabled
      if ((options?.playSound ?? true) && this.soundEnabled) {
        this.playNotificationSound(type)
      }

      // Auto remove after duration (if not persistent)
      if (duration > 0 && !options?.persistent) {
        setTimeout(() => {
          this.removeNotification(id)
        }, duration)
      }

      return id
    },

    removeNotification(id: string) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index > -1) {
        this.notifications.splice(index, 1)
      }
    },

    clearAll() {
      this.notifications = []
    },

    clearByType(type: Notification['type']) {
      this.notifications = this.notifications.filter(n => n.type !== type)
    },

    clearByCategory(category: string) {
      this.notifications = this.notifications.filter(n => n.category !== category)
    },

    clearByPriority(priority: Notification['priority']) {
      this.notifications = this.notifications.filter(n => n.priority !== priority)
    },

    updateNotification(id: string, updates: Partial<Notification>) {
      const notification = this.notifications.find(n => n.id === id)
      if (notification) {
        Object.assign(notification, updates)
      }
    },

    // Settings
    toggleSound() {
      this.soundEnabled = !this.soundEnabled
    },

    toggleAnimation() {
      this.animationEnabled = !this.animationEnabled
    },

    setPosition(position: typeof this.position) {
      this.position = position
    },

    setMaxNotifications(max: number) {
      this.maxNotifications = Math.max(1, Math.min(20, max))
    },

    // Quick methods for common notification types
    success(message: string, duration?: number, options?: any) {
      return this.addNotification(message, 'success', duration, {
        ...options,
        playSound: options?.playSound ?? true
      })
    },

    error(message: string, duration?: number, options?: any) {
      return this.addNotification(message, 'error', duration || 8000, {
        ...options,
        priority: options?.priority || 'high',
        playSound: options?.playSound ?? true
      })
    },

    warning(message: string, duration?: number, options?: any) {
      return this.addNotification(message, 'warning', duration || 6000, {
        ...options,
        priority: options?.priority || 'normal',
        playSound: options?.playSound ?? true
      })
    },

    info(message: string, duration?: number, options?: any) {
      return this.addNotification(message, 'info', duration, {
        ...options,
        playSound: options?.playSound ?? true
      })
    },

    // Specialized notification methods
    loading(message: string, options?: any) {
      return this.addNotification(message, 'info', 0, {
        ...options,
        persistent: true,
        playSound: false,
        category: 'loading'
      })
    },

    updateLoading(id: string, message: string, progress?: number) {
      this.updateNotification(id, { 
        message: progress ? `${message} (${progress}%)` : message,
        metadata: { progress }
      })
    },

    completeLoading(id: string, message: string = 'Complete!') {
      this.updateNotification(id, { 
        message,
        type: 'success',
        duration: 3000,
        persistent: false
      })
      setTimeout(() => this.removeNotification(id), 3000)
    },

    // Batch operations
    addBatch(notifications: Array<{ message: string; type: Notification['type']; options?: any }>) {
      const ids: string[] = []
      notifications.forEach(({ message, type, options }) => {
        ids.push(this.addNotification(message, type, undefined, options))
      })
      return ids
    },

    // Advanced sound system
    playNotificationSound(type: Notification['type']) {
      if (!this.soundEnabled || typeof window === 'undefined') return
      
      try {
        // Try to use Web Audio API for better sound quality
        if (window.AudioContext || (window as any).webkitAudioContext) {
          this.playWebAudioSound(type)
        } else {
          // Fallback to HTML5 Audio
          this.playHtmlAudioSound(type)
        }
      } catch (error) {
        console.debug('Unable to play notification sound:', error)
      }
    },

    playWebAudioSound(type: Notification['type']) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      // Create a more sophisticated sound based on type
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      const filter = audioContext.createBiquadFilter()
      
      oscillator.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      // Configure sound based on notification type
      const soundConfig = {
        success: { freq: 800, type: 'sine' as OscillatorType, duration: 0.3 },
        error: { freq: 300, type: 'sawtooth' as OscillatorType, duration: 0.5 },
        warning: { freq: 600, type: 'square' as OscillatorType, duration: 0.4 },
        info: { freq: 500, type: 'triangle' as OscillatorType, duration: 0.25 }
      }
      
      const config = soundConfig[type]
      oscillator.frequency.setValueAtTime(config.freq, audioContext.currentTime)
      oscillator.type = config.type
      
      // Add some filtering for better sound
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(2000, audioContext.currentTime)
      
      // Create envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.05)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + config.duration)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + config.duration)
    },

    playHtmlAudioSound(type: Notification['type']) {
      // Create a simple beep sound using data URL
      const frequencies = { success: 800, error: 300, warning: 600, info: 500 }
      const audio = new Audio()
      
      // Generate a simple sine wave
      const sampleRate = 44100
      const duration = 0.3
      const samples = sampleRate * duration
      const buffer = new ArrayBuffer(samples * 2)
      const view = new DataView(buffer)
      
      for (let i = 0; i < samples; i++) {
        const sample = Math.sin(2 * Math.PI * frequencies[type] * i / sampleRate) * 0.1
        view.setInt16(i * 2, sample * 32767, true)
      }
      
      // Convert to base64 and play
      const blob = new Blob([buffer], { type: 'audio/wav' })
      const url = URL.createObjectURL(blob)
      audio.src = url
      audio.play().catch(() => {
        // Ignore play errors (e.g., user hasn't interacted with page)
      })
      
      // Clean up
      audio.onended = () => URL.revokeObjectURL(url)
    }
  },

  getters: {
    hasNotifications: (state) => state.notifications.length > 0,
    notificationCount: (state) => state.notifications.length,
    
    getNotificationsByType: (state) => (type: Notification['type']) => 
      state.notifications.filter(n => n.type === type),
    
    getNotificationsByCategory: (state) => (category: string) => 
      state.notifications.filter(n => n.category === category),
    
    getNotificationsByPriority: (state) => (priority: Notification['priority']) => 
      state.notifications.filter(n => n.priority === priority),
    
    hasErrorNotifications: (state) => 
      state.notifications.some(n => n.type === 'error'),
    
    hasWarningNotifications: (state) => 
      state.notifications.some(n => n.type === 'warning'),
    
    hasUrgentNotifications: (state) => 
      state.notifications.some(n => n.priority === 'urgent'),
    
    urgentCount: (state) => 
      state.notifications.filter(n => n.priority === 'urgent').length,
    
    errorCount: (state) => 
      state.notifications.filter(n => n.type === 'error').length,
    
    // Get notifications sorted by priority and timestamp
    sortedNotifications: (state) => {
      const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 }
      return [...state.notifications].sort((a, b) => {
        const priorityDiff = priorityOrder[b.priority || 'normal'] - priorityOrder[a.priority || 'normal']
        if (priorityDiff !== 0) return priorityDiff
        return b.timestamp - a.timestamp
      })
    }
  }
})
