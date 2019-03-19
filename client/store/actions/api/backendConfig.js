export const backendConfig = (method, body) => {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type':'application/json',
    },
    method: method,
    body: body ? JSON.stringify(body) : undefined
  }
}

export const BACKENDHOST = 'http://10.0.0.52:3000';
