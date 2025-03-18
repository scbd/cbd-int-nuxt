export const getDrupalToken = async () => { 
  const config = useRuntimeConfig();    
  
  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')
  params.append('client_id', config.public.DRUPAL_CLIENT_ID)
  params.append('client_secret', config.DRUPAL_CLIENT_SECRET)
  params.append('scope', config.public.DRUPAL_SCOPE)

  const response = await fetch(`${config.public.DRUPAL_URL}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  if (response.ok) {
    const data = await response.json()
    data.timeout = Date.now() + (data.expires_in * 1000)
    return data
  } else {
    throw new Error(`Error: ${response.status}`)
  }
}

export const checkDrupalToken = async (token: string | null) => {
  if(!token) return 'invalid'

  const config = useRuntimeConfig();
  
  const credentials = Buffer.from(`${config.public.DRUPAL_CLIENT_ID}:${config.DRUPAL_CLIENT_SECRET}`).toString('base64');
  const response = await fetch(`${config.public.DRUPAL_URL}/oauth/tokens/${token}`, {
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
