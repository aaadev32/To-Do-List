import './style.css';
import home from './icons/menu.svg';
import plus from './icons/plus.png';


const arraysAndObjects = (() => {



    let testObj = {
        title: 'title test',
        description: 'description test',
        priority: 'priority test',
        notes: 'notes test',
        dueDate: 'due date test',
    }

    let projectTest = {
        title: 'title',
        notes: 'notes',
        due: 'due date',
    }

    let defaultProject = [testObj];

    let currentProject = defaultProject;

    let projectArray = [projectTest]

    class task {

        constructor(title, description, priority, notes, due) {

            this.title = title;
            this.description = description;
            this.priority = priority;
            this.notes = notes;
            this.due = due;


        }

    }

    class project {
        constructor(title, notes, due) {

            this.title = title;
            this.notes = notes;
            this.due = due;
        }
    }

    const newArray = (name) => {
        name = [];
        return name;
    }


    return { task, project, defaultProject, newArray, currentProject, projectArray };
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
        document.getElementById('project-form').style.display = 'none';
        while (contentDiv.childNodes.length > 4) {
            contentDiv.removeChild(contentDiv.lastChild);
        }
    }

    const createElementAppend = (element, ID, parent) => {
        let temp = document.createElement(element);
        temp.id = ID;
        document.getElementById(parent).appendChild(temp);
    }

    const createIdClassElementAppend = (element, ID, parent, classN) => {
        let temp = document.createElement(element);
        temp.className = classN;
        temp.id = ID;
        document.getElementById(parent).appendChild(temp);
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

const projectsTasks = (() => {

    const submitTask = () => {
        const formTitle = document.getElementById('title').value;
        const formDescription = document.getElementById('description').value;
        const formPriority = document.getElementById('priority').value;
        const formNotes = document.getElementById('notes').value;
        const formDue = document.getElementById('due-date').value;

        const temp = new arraysAndObjects.task(formTitle, formDescription, formPriority, formNotes, formDue);
        arraysAndObjects.currentProject.push(temp);
        console.log(arraysAndObjects.currentProject);
    }

    const submitProject = () => {
        const projectTitle = document.getElementById("project-title").value;
        const projectNotes = document.getElementById("project-notes").value;
        const projectDueDate = document.getElementById("project-due-date").value;

        let temp = new arraysAndObjects.project(projectTitle, projectNotes, projectDueDate)
        arraysAndObjects.projectArray.push(temp);
        console.log('submitted')
        console.log(arraysAndObjects.projectArray)

        document.getElementById('project-form').style.display = 'none';
    }

    const projects = () => {
        let projectListClass = document.getElementsByClassName('project-list');

        domMods.clearContent();
        console.log(document.getElementById('content'));
        domMods.createElementAppend('div', 'project-container', 'content');
        domMods.createElementAppend('div', 'project-button-container', 'project-container');
        document.getElementById('project-button-container').textContent = 'New Project';
        domMods.createElementAppend('button', 'add-project-button', 'project-button-container');
        domMods.ImgAppend('plus-symbol', plus, 'add-project-button');


        projectList();

        document.getElementById('add-project-button').onclick = function () {

            document.getElementById('project-form').style.display = 'flex';
            document.getElementById('project-button-container').style.display = 'none';
            Array.from(projectListClass).forEach(div => {
                div.style.display = 'none';
            });

        }

        document.getElementById('project-submit-button').onclick = function () {

            submitProject();
            projectList();

            document.getElementById('project-button-container').style.display = 'flex';
            Array.from(projectListClass).forEach(div => {
                div.style.display = 'flex';
            });

        }
    }

    const projectList = () => {
        for (let i = 0; i < arraysAndObjects.projectArray.length; i++) {
            domMods.createIdClassElementAppend('div', `project-list-${i}`, 'project-container', 'project-list');
            let newTitle = domMods.createIdClassElementAppend('div', `project-title-${i}`, `project-list-${i}`, 'project-list-items');
            let newNotes = domMods.createIdClassElementAppend('div', `project-notes-${i}`, `project-list-${i}`, 'project-list-items');
            let newDue = domMods.createIdClassElementAppend('div', `project-due-${i}`, `project-list-${i}`, 'project-list-items');

            document.getElementById(`project-title-${i}`).textContent = arraysAndObjects.projectArray[i].title;
            document.getElementById(`project-notes-${i}`).textContent = arraysAndObjects.projectArray[i].notes;
            document.getElementById(`project-due-${i}`).textContent = arraysAndObjects.projectArray[i].due;
        }
    }

    const taskList = () => {

        domMods.clearContent();
        console.log(document.getElementById('content'));

        domMods.createElementAppend('div', 'task-list', 'content');
        domMods.createElementAppend('button', 'new-task-button', 'task-list');

        //builds task list from taskArray
        for (let i = 0; i < arraysAndObjects.currentProject.length; i++) {
            domMods.createIdClassElementAppend('div', `task-${i}`, 'task-list', 'task-list-items');

            domMods.createIdClassElementAppend('div', `title-container-${i}`, `task-${i}`, 'title-list-div');
            document.getElementById(`title-container-${i}`).textContent = arraysAndObjects.currentProject[i].title;

            domMods.createIdClassElementAppend('div', `description-container-${i}`, `task-${i}`, 'description-list-div')
            document.getElementById(`description-container-${i}`).textContent = arraysAndObjects.currentProject[i].description;

            domMods.createIdClassElementAppend('div', `priority-container-${i}`, `task-${i}`, 'priority-list-div')
            document.getElementById(`priority-container-${i}`).textContent = arraysAndObjects.currentProject[i].priority;

            domMods.createIdClassElementAppend('div', `notes-container-${i}`, `task-${i}`, 'notes-list-div')
            document.getElementById(`notes-container-${i}`).textContent = arraysAndObjects.currentProject[i].notes;

            domMods.createIdClassElementAppend('div', `due-date-container-${i}`, `task-${i}`, 'due-date-list-div')
            document.getElementById(`due-date-container-${i}`).textContent = arraysAndObjects.currentProject[i].due;

        }


        //opens new task form
        document.getElementById('new-task-button').onclick = function () {
            domMods.clearContent();
            document.getElementById('task-form').style.display = 'flex';
        }

        //submits form data to class constructor and pushes object to taskArray
        document.getElementById('form-submit-button').onclick = function () {
            projectsTasks.submitTask();
            domMods.clearContent();
            projectsTasks.taskList();
        }

        document.getElementById('new-task-button').textContent = 'New task';

        return 1;

    }

    return { submitTask, taskList, projectList, projects, submitProject }
})();

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
    domMods.createElementAppend('div', 'home-tab', 'sidebar');
    domMods.createElementAppend('div', 'tasks-tab', 'sidebar');
    domMods.createElementAppend('div', 'project-tab', 'sidebar');

    const sidebarHome = document.getElementById('home-tab');
    const sidebarTasks = document.getElementById('tasks-tab');
    const sidebarProject = document.getElementById('project-tab');



    sidebarTasks.onclick = function () {
        domMods.clearContent();
        projectsTasks.taskList();
    }

    sidebarProject.onclick = function () {
        domMods.clearContent();
        projectsTasks.projects();
    }

    document.getElementById('home-tab').textContent = 'Home';
    document.getElementById('tasks-tab').textContent = 'Tasks';
    document.getElementById('project-tab').textContent = 'Projects';
}

const content = () => {
    //make this display the date and time on page open and home button click
}

const footer = () => {
    domMods.createElementAppend('div', 'footer-stuff', 'footer')
    document.getElementById('footer-stuff').textContent = 'footer stuff'
}

header(), sidebar(), content(), footer();

//finish making the project list populate line 155 or something 7/8/22

//forgot to add delete button to task list