
const httpClient = axios.create({
    baseURL: 'https://devsite-ironhack.herokuapp.com/'
    //baseURL: `http://localhost:3000`
  })
  
  const likeProject = (id, icon) => httpClient.post(`/like/${id}`)
    .then(() => {
      icon.classList.toggle('icon-liked');
    })
    .catch(err => console.error(err))
    .finally(() => icon.classList.remove('icon-events-none'))
  
  document.querySelectorAll('.like-action').forEach(btn => {
    btn.onclick = (event) => {
      btn.classList.add('icon-events-none')
      likeProject(event.target.dataset.id, event.target)
    }
  })