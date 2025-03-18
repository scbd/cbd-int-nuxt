export default defineNuxtRouteMiddleware(async (to, from) => {
  const drupalToken = useState<drupalToken>('drupal_token', () => null)
  
  const tokenExpired = drupalToken && drupalToken.timeout && drupalToken.timeout <= Date.now()

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