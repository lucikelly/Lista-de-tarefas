let tarefas = [
  { id: 1, descricao: 'Estudar', feito: false},
  { id: 2, descricao: 'Almoçar', feito: false},
  { id: 3, descricao: 'Correr', feito: false}
]

window.onload = function(){
  tarefas.forEach((tarefa) => {
    const list = document.getElementById('todo-list')
    const todo = document.createElement('li')

    todo.textContent = tarefa.descricao

    list.appendChild(todo)
  })
}