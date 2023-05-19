async function request(endpoint: string, query: string) {

  const rootUrl = "https://music.musicaudience.info";
  const response = await fetch(`${rootUrl}${endpoint}?q=${query}`,{headers: {
    "Authorization": "apikey 5db48e1f3a0a4580bad47849f1317bd0"
  }});
  const jsonData = await response.json();
  return jsonData;
}

export default request;
