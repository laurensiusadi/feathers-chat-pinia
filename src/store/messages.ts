import { defineStore, BaseModel } from './index'
import { api } from '../feathers'

export class Message extends BaseModel {
  static modelName = 'Message'
  static instanceDefaults() {
    return {
      text: ''
    }
  }
  static setupInstance(data: any) {
    if (data.createdAt) {
      data.createdAt = new Date(data.createdAt)
    }
    return data
  }
}

const servicePath = 'messages'
export const useMessages = defineStore({
  servicePath,
  Model: Message
})

api.service(servicePath).hooks({})
