export default defineNuxtRouteMiddleware(async (to, from) => {
    const { isTokenValid, getValidToken } = useDrupalToken()
  
    try {
      if (!isTokenValid.value) {
        await getValidToken()
      }
    } catch (error) {
        throw new Error(`Error: ${error}`)
    }
})