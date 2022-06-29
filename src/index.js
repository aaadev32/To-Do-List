import './style.css';
import home from './icons/menu.svg';

let taskArray = [];

const domMods = (() => {
    const contentDiv = document.getElementById('content');

    function removeChildren(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function clearContent(){
        while(contentDiv.childNodes.length > 2){
            contentDiv.removeChild(contentDiv.lastChild);
        }
    }

    const createElementAppend = (element, ID, parent) => {
        let temp = document.createElement(element);
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

    /*
    const taskForm = () => {
        const contentDiv = document.getElementById('content');

        removeChildren(contentDiv);

        //add labels for these inputs 6/28/22
        createElementAppend('form', 'task-form', 'content');
        createElementAppend('input', 'title', 'task-form');
        createElementAppend('input', 'description', 'task-form');
        createElementAppend('input', 'due-date', 'task-form');
        createElementAppend('input', 'priority', 'task-form');
        createElementAppend('input', 'notes', 'task-form');

        const title = document.getElementById('title');
        const description = document.getElementById('description');
        const dueDate = document.getElementById('due-date');
        const priority = document.getElementById('priority');
        const notes = document.getElementById('notes');

        title.textContent = 'test';
        description.textContent = 'test';
        dueDate.textContent = 'test';
        priority.textContent = 'test';
        notes.textContent = 'test';

        //get this to display before doing anymore work

    }

    */

    //this is what should display when the tasks tab is selected
    const taskList = () => {

        clearContent();

        createElementAppend('div', 'task-list', 'content');
        createElementAppend('div', 'task-list', 'task-list');



    }
    return { createElementAppend, ImgAppend, removeChildren, taskList };
})();



class task {
    constructor(title, description, targetDate, priority, notes) {
        taskTitle = this.title;
        taskDescription = this.description;
        taskTargetDate = this.targetDate;
        taskPriority = this.priority;
        taskNotes = this.notes
    }


    //have the submitted task form send its inputs here to populate the new task object

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
        domMods.taskList();
    }

    /*if (document.getElementById('task-form').style.display === 'flex') {
        document.getElementById('task-form').style.display = 'none';
    } else {
        document.getElementById('task-form').style.display = 'flex';
    }*/

    document.getElementById('home').textContent = 'Home'
    document.getElementById('tasks').textContent = 'Tasks';
    document.getElementById('project').textContent = 'Projects';
}

const content = () => {

}

const footer = () => {
    domMods.createElementAppend('div', 'footer-stuff', 'footer')
    document.getElementById('footer-stuff').textContent = 'footer stuff'
}
header(), sidebar(), content(), footer();

//TODO 6/29/22 work on task list so that when it is selected show tasks and button to create new task