export interface SteamPlayer {
  steamid: string
  communityvisibilitystate: number
  profilestate: number
  personaname: string
  commentpermission: number
  profileurl: string
  avatar: string
  avatarmedium: string
  avatarfull: string
  avatarhash: string
  lastlogoff: number
  personastate: number
  primaryclanid: string
  timecreated: number
  personastateflags: number
  loccountrycode: string
}

export interface ItemInventory {
  appId: string
  assetId: string
  botPrice: string
  collection: string
  defaultPrice: string
  float: number
  fullName: string
  hasHighDemand: string
  id: string
  img: string
  inspect: string
  nameId: string
  overstockDiff: string
  pattern: string
  price: number
  quality: string
  rarity: string
  steamImg: string
  steamImgLarge: string
  type: number
}

export enum InventoryBlockType { // TODO maybe delete
  USER_TRADE = 'user_trade',
  GGEZ_TRADE = 'ggez_trade',
}

export interface Game {
  title: string
  app_id: number
}
