export const getDrupalToken = async () => { 
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')
    params.append('client_id', process.env.DRUPAL_CLIENT_ID as string)
    params.append('client_secret', process.env.DRUPAL_CLIENT_SECRET as string)
    params.append('scope', process.env.DRUPAL_SCOPE as string)

    const response = await fetch(`${process.env.DRUPAL_URL}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
    });

    if (response.ok) {
        const data = await response.json()
        return data
    } else {
        throw new Error(`Error: ${response.status}`)
    }
}

export const checkDrupalToken = async (token: string | null) => {
    if(!token) return 'invalid'

    const credentials = Buffer.from(`${process.env.DRUPAL_CLIENT_ID}:${process.env.DRUPAL_CLIENT_SECRET}`).toString('base64');
    const response = await fetch(`${process.env.DRUPAL_URL}/oauth2/tokens/${token}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      });

      if (response.ok) {
        
        const data = await response.json()
        console.log(data)

        return data
      } else {
        throw new Error(`Error: ${response.status}`)
      }
}

export const useDrupalToken = () => {
    const token = useState<{
      access_token: string;
      expires_in: number;
      token_type: string;
      scope: string;
      expires_at?: number;
    } | null>('drupal_token', () => null)
  
    const isTokenValid = computed(() => {
      if (!token.value || !token.value.expires_at) return false
       const bufferTime = 1 * 60 * 1000
      return Date.now() < token.value.expires_at - bufferTime
    })
  
    const fetchAndStoreToken = async () => {
      try {
        const newToken = await getDrupalToken()
        
         const expiresAt = Date.now() + (newToken.expires_in * 1000)
        
         token.value = {
          ...newToken,
          expires_at: expiresAt
        }
        
        return token.value
      } catch (error) {
        console.error('Failed to fetch Drupal token:', error)
        token.value = null
        throw error
      }
    }
  
    const getValidToken = async () => {
      if (isTokenValid.value && token.value) {
        try {
           await checkDrupalToken(token.value.access_token)
          return token.value
        } catch (error) {
          console.error('Token validation failed:', error)
           return fetchAndStoreToken()
        }
      } else {
         return fetchAndStoreToken()
      }
    }
  
    return {
      token,
      isTokenValid,
      getValidToken
    }
}