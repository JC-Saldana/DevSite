const httpClient = axios.create({
  baseURL: 'http://localhost:3000'
})

// Search users form
const devsForm = document.querySelector('.developers-form')
const developersContainer = document.querySelector('.developers')
document.addEventListener("input", () => {
  const inputName = document.querySelector('#name').value
  const currentJob = document.querySelector('#currentJob').value
  const params = {
    name: inputName,
    currentJob
  }
  const searchUsers = () => httpClient.get(`/user/form/${inputName}`, { params })
    .then(devsFound => {
      renderUsers(devsFound)
    })
    .catch(err => console.error(err))

  const getAllUsers = () => httpClient.get(`/allUsers`)
    .then(devsFound => {
      renderUsers(devsFound)
    })
    .catch(err => console.error(err))

  const renderUsers = devsFound => {
    const developers = document.querySelectorAll('.developer')
    // Elimina developers
    developers.forEach(developer => {
      developer.remove()
    });
    // Añade developers encontrados
    devsFound.data.forEach(dev => {
      const developerHTML = document.createElement("div");
      const skillsContainer = document.createElement("div")
      const skills = document.createElement("ul")
      skills.setAttribute("class", "list-horizontal")
      dev.skills.forEach(skill => {
        const li = document.createElement("li")
        const small = document.createElement("small")
        small.innerText = skill
        li.appendChild(small)
        skills.appendChild(li)
      })
      skillsContainer.appendChild(skills)
      developerHTML.innerHTML = `<a href="/user/${dev._id}" class="developer-container">
      <div class="developer">
        <img src=${dev.avatar} alt="img" class="developer-pic">
          <p><strong>${dev.name}</strong></p>
          <p>${dev.currentJob}</p>
          ${skillsContainer.innerHTML}
      </div>
    </a>`

      developersContainer.appendChild(developerHTML)
    })
  }


  if (inputName) {
    searchUsers()
  } else {
    getAllUsers()
  }
})



