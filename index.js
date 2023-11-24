const inputText = document.getElementById("todo-input")
const button = document.getElementsByTagName("button")[0]
const list = document.getElementById("list")

button.addEventListener("click", ()=>{
  const text = inputText.value

  const li = document.createElement("li")
  li.innerText = text 
  list.appendChild(li)
  
  
})

