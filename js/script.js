
const getTasksFromLocalStorage = () => {
  const localTasks = JSON.parse(window.localStorage.getItem('tarefas'))
  return localTasks? localTasks : []
}

const setTasksInLocalStorage = (tarefas) => {
  window.localStorage.setItem('tarefas', JSON.stringify(tarefas))
}
const removeTask = (tarefaId) => {
  const tarefas = getTasksFromLocalStorage()
  const Uptasks = tarefas.filter(({id}) => parseInt(id) !== parseInt(tarefaId))
  setTasksInLocalStorage(Uptasks )

  document
    .getElementById("todo-list")
    .removeChild(document.getElementById(tarefaId))  
}

const removerTarefas = () => {
  const tarefas = getTasksFromLocalStorage()

  const tasksToRemove = tarefas.filter(({checked}) => checked)
   .map(({id}) => id)
  


   const Uptasks = tarefas.filter(({checked})=> !checked)
   setTasksInLocalStorage(Uptasks )

  tasksToRemove.forEach((taskToRemove)=> {
    document
    .getElementById("todo-list")
    .removeChild(document.getElementById(taskToRemove))
  })
}

const createTaskListItem = (tarefa, checkbox) => {
  const list = document.getElementById('todo-list')
  const todo = document.createElement('li')

  const removeTaskButton = document.createElement('button')
  removeTaskButton.textContent = 'X'
  removeTaskButton.ariaLabel = 'Remover tarefa'

  removeTaskButton.onclick = () => removeTask(tarefa.id)


  todo.id = tarefa.id
  todo.appendChild(checkbox)
  todo.appendChild(removeTaskButton)
  list.appendChild(todo)

  return todo
}
const onCheckboxClick = (evento) => {
  const [id] = evento.target.id.split('-')
  const tarefas = getTasksFromLocalStorage()


 const Uptasks = tarefas.map((tarefa) => {
    return (parseInt(tarefa.id) === parseInt(id))
      ? { ...tarefa, checked: evento.target.checked}
      : tarefa
})

setTasksInLocalStorage(Uptasks )


}


const getCheckboxInput = ({id, descricao,checked} )=>{
  const checkbox = document.createElement('input')
  const label = document.createElement('label')
  const wrapper = document.createElement('div')
  const checkboxid = `${id}-checkbox`

  checkbox.type = 'checkbox'
  checkbox.id = checkboxid 
  checkbox.checked = checked || false
  checkbox.addEventListener('change', onCheckboxClick)

  label.textContent = descricao
  label.htmlFor = checkboxid

  wrapper.className = 'checkbox-label-container'

  wrapper.appendChild(checkbox)
  wrapper.appendChild(label)

  return wrapper
}
const getNewTaskId = () =>{
  const tarefas = getTasksFromLocalStorage()
  
  const lastId = tarefas[tarefas.length -1]?.id
  return lastId? lastId + 1 : 1
}

const getNewTaskData = (evento) =>{
  const descricao = evento.target.elements.descricao.value;
  const id = getNewTaskId()
  return{ descricao, id}
}

const createTarefa = (evento)=>{
  evento.preventDefault()
  const newTaskData = getNewTaskData(evento)
  

  const checkbox = getCheckboxInput(newTaskData)
  createTaskListItem(newTaskData,checkbox)
  const tarefas = getTasksFromLocalStorage()

 const Uptasks = [
    ...tarefas,
    {id: newTaskData.id, descricao: newTaskData.descricao, checked: false}
  ]
  setTasksInLocalStorage(Uptasks)

  document.getElementById('descricao').value = ''
}

window.onload = function(){

  const form = document.getElementById('create-todo-form')
  form.addEventListener('submit', createTarefa)


  const tarefas = getTasksFromLocalStorage()

  tarefas.forEach((tarefa) => {
    const checkbox = getCheckboxInput(tarefa)
    createTaskListItem(tarefa,checkbox)
    
   

   
  })
}