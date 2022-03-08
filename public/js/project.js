const httpClient = axios.create({
  baseURL: 'http://localhost:3000'
})

// Search projects form
const projectsContainer = document.querySelector('.projects')
document.addEventListener("input", () => {
  const title = document.querySelector('#title').value
  const skill = document.querySelector('#skill').value
  const params = {
    title,
    skill
  }
  const searchProjects = () => httpClient.get(`/project/form/params`, { params })
    .then(projectsFound => {
      renderProjects(projectsFound)
    })
    .catch(err => console.error(err))

  const renderProjects = projectsFound => {
    const projects = document.querySelectorAll('.project')
    // Delete projects
    projects.forEach(project => {
      project.remove()
    });
    // Añade projects encontrados
    projectsFound.data.forEach(project => {
      const projectHTML = document.createElement("div");
      const skillsContainer = document.createElement("div")
      const skills = document.createElement("ul")
      skills.setAttribute("class", "list-horizontal")
      project.skills.forEach(skill => {
        const li = document.createElement("li")
        const small = document.createElement("small")
        small.innerText = skill
        li.appendChild(small)
        skills.appendChild(li)
      })
      skillsContainer.appendChild(skills)
      projectHTML.innerHTML = 
      `<a href="/project/${project._id}" class="project-container">
        <div class="project scale-up-center">
        <img src="${project.images}" alt="img" class="project-pic">
        <p class="project-title"><strong>${project.title}</strong></p>
        <p><sub>by${project.user.name}</sub></p>
        ${skillsContainer.innerHTML}
        </div>
      </a>`

      projectsContainer.appendChild(projectHTML)
    })
  }
  searchProjects()
})



