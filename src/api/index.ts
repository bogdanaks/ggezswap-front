import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})

export async function loginSteam() {
  const { request } = await api.post('auth/steam/login')

  if (request.responseURL) {
    window.location = request.responseURL
  }
}

export async function getSteamUserInventory(steamId: string, appId?: string) {
  const { data } = await api.get(`user/inventory/${steamId}`)

  return data.data
}

export async function getGamesList(appId?: string) {
  const url = appId ? `steam/games/${appId}` : 'steam/games'
  const { data } = await api.get(url)

  return data.data
}
