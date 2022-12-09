function handleUpdate() {

    const edit_nickname = document.getElementById("edit_nickname")
    const updateInput = document.createElement("input")
    edit_nickname.style.visibility = "hidden"
    updateInput.setAttribute("id","update-input")
    updateInput.value = edit_nickname.innerHTML

    edit_nickname.parentNode.insertBefore(updateInput, edit_nickname)

    const updateButton = document.getElementById("edit_nick_button")
    updateButton.setAttribute("onclick", "handleUpdateConfirm()")

}

function handleUpdateConfirm(){
    const updateInput =document.getElementById('update-input')

    const edit_nickname = document.getElementById("edit_nickname")
    edit_nickname.innerHTML = updateInput.value
    edit_nickname.style.visibility = "visible"

    const updateButton =document.getElementById("edit_nick_button")
    updateButton.setAttribute("onclick", "handleUpdate()")
    updateInput.remove()
}