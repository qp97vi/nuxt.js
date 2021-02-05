import Cookies from 'js-cookie'
import Config from '@/config'

const TokenKey = Config.TokenKey
const User = Config.User
const Location = Config.Location

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TokenKey, token, {
      expires: Config.tokenCookieExpires
    })
  } else return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUser() {
	if(Cookies.get(TokenKey)){
		return JSON.parse(Cookies.get(User))
	}
	return null
}

export function setUser(user) {
  return Cookies.set(User, user)
}

export function removeUser() {
  return Cookies.remove(User)
}

export function getLocation() {
	var location = Cookies.get(Location)
	if(location){
		return JSON.parse(location)
	}
	return null
}

export function setLocation(location) {
  return Cookies.set(Location, location)
}

export function removeLocation() {
  return Cookies.remove(Location)
}