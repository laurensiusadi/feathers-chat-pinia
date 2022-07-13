import { defineAuthStore } from 'feathers-pinia'
import { api as feathersClient } from '../feathers'

export const useAuth = defineAuthStore({
  feathersClient,
})