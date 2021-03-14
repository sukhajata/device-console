import localForage from "localforage";

const USER_TOKEN = "userToken";
const USER_JSON = "userJSON";
const SITE = "site";

export async function getToken() {
  const userToken = await localForage.getItem(USER_TOKEN);
  return userToken;
}

export async function setToken(token) {
  await localForage.setItem(USER_TOKEN, token);
}

export async function removeToken() {
  await localForage.removeItem(USER_TOKEN);
}

export async function getUser() {
  const userJSON = await localForage.getItem(USER_JSON);
  return userJSON;
}

//local forage handles objects
export async function setUser(user) {
  await localForage.setItem(USER_JSON, user);
}

export async function removeUserJSON() {
  await localForage.removeItem(USER_JSON);
}

export async function setSite(site) {
  await localForage.setItem(SITE, site);
}

export async function getSite() {
  const site = await localForage.getItem(SITE);
  return site;
}

export async function removeSite() {
  await localForage.removeItem(SITE);
}
