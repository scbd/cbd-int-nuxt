import { type drupalToken } from "~/types/drupalAuth"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const drupalToken = useState<drupalToken | null>('drupal_token', () => null)

  const tokenExpired = drupalToken.value !== null && 
    drupalToken.value.timeout && 
    drupalToken.value.timeout <= Date.now()

  if (!drupalToken.value || tokenExpired) {
    try {
      const tokenData = await getDrupalToken()
      drupalToken.value = tokenData;
      console.log('Token valid until:', new Date(tokenData.timeout).toLocaleString())
    } catch (error) {
      console.error('Error:', error)
    }
  }
})