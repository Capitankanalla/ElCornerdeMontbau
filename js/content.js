const contentPath = window.location.pathname.includes("/html/")
  ? "../js/json/homeEs.json"
  : "js/json/homeEs.json";

window.contentReady = fetch(contentPath)
  .then((response) => {
    if (!response.ok) throw new Error(`Error carregant el contingut: ${response.status}`);
    return response.json();
  })
  .then((content) => {
    window.HOME_CONTENT = content;
    return content;
  });
