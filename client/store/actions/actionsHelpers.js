export function handleResponse(response){
  if (response.ok) {
    return response.json()
  } else {
    response.json().then((error)=>{ throw `Error ${error.error.code} ${error.error.message}`})
  }
}
