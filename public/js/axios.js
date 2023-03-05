
const httpClient = axios.create({
    baseURL: 'https://devsite-ironhack.vercel.app/'
    //baseURL: `http://localhost:3000`
  })
  
  const likeProject = (id, icon) => httpClient.post(`/like/${id}`)
    .then(res => {
      icon.classList.toggle('icon-liked');
      let count = parseInt(document.querySelector('.like-count').innerHTML)
      if(res.status === 200) {
        document.querySelector('.like-count').innerHTML = count - 1
      } else if (res.status === 201) {
        document.querySelector('.like-count').innerHTML = count + 1
      }

    })
    .catch(err => console.error(err))
    .finally(() => icon.classList.remove('icon-events-none'))
  
  document.querySelectorAll('.like-action').forEach(btn => {
    btn.onclick = (event) => {
      btn.classList.add('icon-events-none')
      likeProject(event.target.dataset.id, event.target)
    }
  })