import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

const isWeb = Platform.OS === 'web'

const KEY = {
  access: 'access_token',
  refresh: 'refresh_token',
}

export const tokenStorage = {
  async setAccessToken(token: string) {
    if (isWeb) {
      localStorage.setItem(KEY.access, token)
    } else {
      await SecureStore.setItemAsync(KEY.access, token)
    }
  },

  async setRefreshToken(token: string) {
    if (isWeb) {
      localStorage.setItem(KEY.refresh, token)
    } else {
      await SecureStore.setItemAsync(KEY.refresh, token)
    }
  },

  async getAccessToken() {
    if (isWeb) {
      return localStorage.getItem(KEY.access)
    }
    return await SecureStore.getItemAsync(KEY.access)
  },

  async getRefreshToken() {
    if (isWeb) {
      return localStorage.getItem(KEY.refresh)
    }
    return await SecureStore.getItemAsync(KEY.refresh)
  },

  async clearTokens() {
    if (isWeb) {
      localStorage.removeItem(KEY.access)
      localStorage.removeItem(KEY.refresh)
    } else {
      await SecureStore.deleteItemAsync(KEY.access)
      await SecureStore.deleteItemAsync(KEY.refresh)
    }
  },
}