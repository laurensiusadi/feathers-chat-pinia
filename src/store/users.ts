import { defineStore, BaseModel } from './index'
import { api } from '../feathers'

export class User extends BaseModel {
  static modelName = 'User'
  static instanceDefaults() {
    return {
      email: '',
      password: ''
    }
  }
}

const servicePath = 'users'
export const useUsers = defineStore({
  servicePath,
  Model: User
})

api.service(servicePath).hooks({})
