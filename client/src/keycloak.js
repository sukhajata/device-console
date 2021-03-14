import Keycloak from "keycloak-js";
import { getKeycloakRealm, getAuthServerUrl } from "./scripts/urlHelper";

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
  realm: getKeycloakRealm(),
  url: getAuthServerUrl(),
  sslRequired: "external",
  clientId: "react-admin",
  publicClient: true
});

export default keycloak;
