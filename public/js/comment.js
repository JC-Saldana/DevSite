const commentButton = document.querySelector(".comment-button")
const projectId = document.querySelector("#like-button-container").getAttribute('data-id')

const updateListeners = () => {
    const deleteButton = document.querySelectorAll(".delete-button")
    deleteButton.forEach(button => {
        button.addEventListener("click", () => deleteButtonListener(button))
    });
    commentButton.addEventListener("click", commentClickListener)
}

function deleteButtonListener(button) {
    const commentId = button.getAttribute('data-id')
    const deleteComment = () => httpClient.post(`/comment/delete/params`, null, { params: { commentId, projectId } })
        .then(newComments => {
            console.log("newComments", newComments)
            renderComments(newComments)
        })
        .catch(err => console.error(err))
    deleteComment()
}

function commentClickListener() {
    const commentContent = document.querySelector("#comment-input").value
    console.log("clicked", commentContent, projectId)
    const postComment = () => httpClient.post(`/comment/create/params`, null, { params: { projectId, commentContent } })
        .then(newComments => {
            console.log("newComments", newComments)
            renderComments(newComments)
        })
        .catch(err => console.error(err))
    postComment()
}

const renderComments = newComments => {
    const commentsContainer = document.querySelector('.comments-container')
    const singleComments = document.querySelectorAll('.single-comment')

    // Delete comments
    singleComments.forEach(comment => comment.remove())

    // Actualiza número de comments
    const commentsLength = newComments.data.length
    const commentsLengthNode = document.querySelector('.comments-length')
    commentsLengthNode.innerHTML = `Comments: ${commentsLength}`

    // Añade comments encontrados
    newComments.data.forEach(comment => {
        console.log(comment)
        const commentHTML = document.createElement("div");
        const deleteButton = document.createElement("div")
        const currentUser = document.querySelector('.profile').getAttribute("data-id")
        if (comment.user._id === currentUser) {
            deleteButton.innerHTML = (`<div
            class="d-flex justify-content-center align-items-center position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"
            style="height: 30px; width: 30px; top:115px;">
            <input type="text" name="id" class="d-none" value={{../ project._id }}>
            <button data-id="${comment._id}" class="btn delete-button" style="font-size: 1rem; color: rgb(255, 255, 255);"
                    type="submit"><i class="fa fa-close"></i></button>
            </div>`)
        }

        commentHTML.innerHTML =
            `<div class="card mb-4 single-comment">
                <div class="card-body position-relative">
                    
                    
                    ${deleteButton.innerHTML}

                    <p>${comment.comment}</p>
                    <div class="d-flex flex-row align-items-center mb-2">
                        <img class="rounded-circle" src="${comment.user.avatar}" alt="avatar" width="25"
                            height="25" />
                        <sub class="small mb-0 ms-2 d-flex flex-row align-items-center">${comment.user.name}
                        </sub>
                    </div>
                </div>
            </div>`
        commentsContainer.appendChild(commentHTML)
    })
    updateListeners()
}

updateListeners()



