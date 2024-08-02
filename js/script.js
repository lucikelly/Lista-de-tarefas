let tarefas = [
  { id: 1, descricao: 'Estudar', feito: false},
  { id: 2, descricao: 'Almoçar', feito: false},
  { id: 3, descricao: 'Correr', feito: false}
]
const removeTask = (tarefaId) => {
  tarefas = tarefas.filter(({id}) => parseInt(id) !== parseInt(tarefaId))


  document
    .getElementById("todo-list")
    .removeChild(document.getElementById(tarefaId))  
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

const getCheckboxInput = ({id, descricao,feito} )=>{
  const checkbox = document.createElement('input')
  const label = document.createElement('label')
  const wrapper = document.createElement('div')
  const checkboxid = `${id}-checkbox`

  checkbox.type = 'checkbox'
  checkbox.id = checkboxid 
  checkbox.checked = feito || false

  label.textContent = descricao
  label.htmlFor = checkboxid

  wrapper.className = 'checkbox-label-container'

  wrapper.appendChild(checkbox)
  wrapper.appendChild(label)

  return wrapper
}
const getNewTaskId = () =>{
  
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

  tarefas = [
    ...tarefas,
    {id: newTaskData.id, descricao: newTaskData.descricao, feito: false}
  ]

}

window.onload = function(){

  const form = document.getElementById('create-todo-form')
  form.addEventListener('submit', createTarefa)

  tarefas.forEach((tarefa) => {
    const checkbox = getCheckboxInput(tarefa)
    createTaskListItem(tarefa,checkbox)
    
   

   
  })
}