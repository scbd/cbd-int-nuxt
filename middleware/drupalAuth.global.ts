import { type drupalToken } from "~/types/drupalAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const drupalToken = useState<drupalToken | null>("drupal_token", () => null);

  const tokenExpired =
    drupalToken.value !== null &&
    drupalToken.value.timeout &&
    drupalToken.value.timeout <= Date.now();

  if (!drupalToken.value) {
    try {
      const tokenData = await getDrupalToken();
      drupalToken.value = tokenData;
      console.log(
        "Token valid until:",
        new Date(tokenData.timeout).toLocaleString()
      );
    } catch (error) {
      console.error("Error:", error);
    }
  } else if (tokenExpired) {
    // Temporary Fix until Drupal Refresh Token issue is resolved.
    reloadNuxtApp({ force: true, persistState: true, path: to.path });
  }
});
