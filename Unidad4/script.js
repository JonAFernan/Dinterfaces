class Task {
    #task;
    #completed;
    constructor(task) {
        this.#task = task;
        this.#completed = false;   
    }

    getTask(){
        return this.#task;
    }
    
    getCompleted(){
        return this.#completed;
    }

    setCompleted(){
        this.#completed = !this.#completed;
    }
}

class TaskList {
    constructor() {
        this.taskList = [];
        // Añadimos dos tareas al Array para que no este vacío al crearse
        this.taskList.push(new Task("Llamar al dentista"));
        this.taskList.push(new Task("Terminar unidad 4 Diseño"));
        this.printTaskInfo();
    }

    addTask(task) {
        this.taskList.push(task);
        this.printTaskInfo();
    }

    removeTask(index) { 
        this.taskList.splice(index, 1); 
        this.printTaskInfo();
    }

    checkTask(index){
        this.taskList[index].setCompleted();
        this.printTaskInfo();
    }
    printTaskInfo() {
        const table = document.querySelector('#taskTable tbody');
        //limpiamos la tabla de datos
        table.innerHTML = '';

        this.taskList.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox" id="check${index}" data-index="${index}" ${task.getCompleted() ? 'checked' : ''}/></td>
                <td class= "${task.getCompleted() ? 'completed' : ''}">${task.getTask()}</td>
                <td><button id="btn${index}" class="removeBtn" data-index="${index}">Eliminar</button></td>
            `;
            table.appendChild(row);
            document.getElementById(`btn${index}`).addEventListener('click',(event) =>{
                const index = event.target.getAttribute('data-index');
                taskList.removeTask(index);
            });

            document.getElementById(`check${index}`).addEventListener('change',(event) =>{
                const index = event.target.getAttribute('data-index');
                taskList.checkTask(index);
            });
        });
        
    }
}

const taskList = new TaskList();

document.getElementById('addTask').addEventListener('click', () => {
    const task = prompt('Añade la tarea').trim(); // trim elimina los espacios en blanco
    //Nos aseguramos que task no está vacío
    if (task) {
        taskList.addTask(new Task(task)); 
    }else{
        alert("Por favor rellene el campos");
    }
});
