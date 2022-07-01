import './style.css';
import home from './icons/menu.svg';


const arraysAndObjects = (() => {
    let testObj = {
        title: 'title test',
        description: 'description test',
        priority: 'priority test',
        notes: 'notes test',
        dueDate: 'due date test',
    }
    let taskArray = [testObj];

    class task {

        constructor(title, description, priority, notes, due) {

            let taskTitle = this.title;
            let taskDescription = this.description;
            let taskPriority = this.priority;
            let taskNotes = this.notes;
            let taskDue = this.due;


        }

    }


    return { taskArray, task };
})();


const domMods = (() => {
    const contentDiv = document.getElementById('content');

    function removeChildren(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function clearContent() {

        document.getElementById('task-form').style.display = 'none';
        while (contentDiv.childNodes.length > 2) {
            contentDiv.removeChild(contentDiv.lastChild);
        }
    }

    const createElementAppend = (element, ID, parent) => {
        let temp = document.createElement(element);
        temp.id = ID;
        document.getElementById(parent).appendChild(temp);
        console.log(temp);
    }

    const createIdClassElementAppend = (element, ID, parent, classN) => {
        let temp = document.createElement(element);
        temp.className = classN;
        temp.id = ID;
        document.getElementById(parent).appendChild(temp);
        console.log(temp);
    }

    const ImgAppend = (ID, importedImage, parent) => {
        let imgElement = document.createElement('img');
        imgElement.id = ID;
        imgElement.src = importedImage;
        document.getElementById(parent).appendChild(imgElement);
    }

    //this is what should display when the tasks tab is selected


    return { createElementAppend, createIdClassElementAppend, ImgAppend, removeChildren, clearContent };
})();

const taskList = () => {

    domMods.clearContent();

    domMods.createElementAppend('div', 'task-list', 'content');
    domMods.createElementAppend('div', 'task-list', 'content');
    domMods.createElementAppend('button', 'new-task-button', 'task-list');

    for (let i = 0; i < arraysAndObjects.taskArray.length; i++) {
        //append the array objects and the associated values to these newly created elements

        domMods.createIdClassElementAppend('div', `task-${i}`, 'task-list', 'task-list-items');

        domMods.createIdClassElementAppend('div', `title-container-${i}`, `task-${i}`, 'title-list-div');
        document.getElementById(`title-container-${i}`).textContent = arraysAndObjects.taskArray[i].title;

        domMods.createIdClassElementAppend('div', `description-container-${i}`, `task-${i}`, 'description-list-div')
        document.getElementById(`description-container-${i}`).textContent = arraysAndObjects.taskArray[i].description;

        domMods.createIdClassElementAppend('div', `priority-container-${i}`, `task-${i}`, 'priority-list-div')
        document.getElementById(`priority-container-${i}`).textContent = arraysAndObjects.taskArray[i].title;

        domMods.createIdClassElementAppend('div', `due-date-container-${i}`, `task-${i}`, 'due-date-list-div')
        document.getElementById(`due-date-container-${i}`).textContent = arraysAndObjects.taskArray[i].title;

        domMods.createIdClassElementAppend('div', `notes-container-${i}`, `task-${i}`, 'notes-list-div')
        document.getElementById(`notes-container-${i}`).textContent = arraysAndObjects.taskArray[i].title;

    }



    document.getElementById('new-task-button').onclick = function () {
        domMods.clearContent();

        document.getElementById('task-form').style.display = 'flex';
    }

    document.getElementById('form-submit-button').onclick = function () {
        let temp = new arraysAndObjects.task(formTitle, formDescription, formPriority, formNotes, formDue);
        arraysAndObjects.taskArray.push(temp);
    }



    document.getElementById('new-task-button').textContent = 'New task';

}



const header = () => {
    document.getElementById('header').style.gridArea = 'hd';

    domMods.createElementAppend('div', 'menu-icon', 'header');
    domMods.createElementAppend('div', 'project-logo', 'header');

    document.getElementById('project-logo').textContent = 'My ToDo App';

    domMods.ImgAppend('test-img', home, 'menu-icon');
}

const sidebar = () => {
    const contentDiv = document.getElementById('content');

    document.getElementById('sidebar').style.gridArea = 'sb';
    domMods.createElementAppend('div', 'home', 'sidebar');
    domMods.createElementAppend('div', 'tasks', 'sidebar');
    domMods.createElementAppend('div', 'project', 'sidebar');

    const sidebarHome = document.getElementById('home');
    const sidebarTasks = document.getElementById('tasks');
    const sidebarProject = document.getElementById('project');



    sidebarTasks.onclick = function () {
        domMods.clearContent();
        taskList();
    }

    document.getElementById('home').textContent = 'Home';
    document.getElementById('tasks').textContent = 'Tasks';
    document.getElementById('project').textContent = 'Projects';
}

const content = () => {
    //make this display the date and time on page open and home button click
}

const footer = () => {
    domMods.createElementAppend('div', 'footer-stuff', 'footer')
    document.getElementById('footer-stuff').textContent = 'footer stuff'
}
header(), sidebar(), content(), footer();

//TODO 6/30/22 line 69