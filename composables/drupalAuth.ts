export const getDrupalToken = async () => { 
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')
    params.append('client_id', process.env.DRUPAL_CLIENT_ID as string)
    params.append('client_secret', process.env.DRUPAL_CLIENT_SECRET as string)
    params.append('scope', process.env.DRUPAL_SCOPE as string)

    const response = await fetch(`${process.env.DRUPAL_URL}/oauth/token`, {
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

    const credentials = Buffer.from(`${process.env.DRUPAL_CLIENT_ID}:${process.env.DRUPAL_CLIENT_SECRET}`).toString('base64');
    const response = await fetch(`${process.env.DRUPAL_URL}/oauth/tokens/${token}`, {
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
