import axios, { AxiosInstance } from 'axios'
import cookie from 'js-cookie'
import { SteamPlayer } from '@interfaces'

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})

export async function loginSteam() {
  const { request } = await api.post('auth/steam/login')

  if (request.responseURL) {
    window.location = request.responseURL
  }
}

export async function getSteamUserInventory() {
  const steamProfile: SteamPlayer = JSON.parse(cookie.get("steamProfile") as string)
  const { data } = await api.get(`user/inventory/${steamProfile.steamid}`)

  return data.data
}
