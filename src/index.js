import './style.css';
import plus from './icons/plus.svg';
import showTasks from './icons/show_tasks.png';
import addTasks from './icons/menu.svg';
import trash from './icons/delete.svg';


const arraysAndObjects = (() => {
    class task {

        constructor(title, description, priority, notes, due, projectIndex) {

            this.title = title;
            this.description = description;
            this.priority = priority;
            this.notes = notes;
            this.due = due;
            this.projectIndex = projectIndex;
        }
    }

    class project {
        constructor(title, notes, due, projectIndex) {

            this.title = title;
            this.notes = notes;
            this.due = due;
            this.projectIndex = projectIndex;
        }
    }

    //this function is used to create an array based off of the projectIndex property of task objects which is assigned based off of the selectedProject variable
    const fetchProjectTasks = (index) => {
        let fetchedTasks = [];
        for (let i = 0; i < arraysAndObjects.taskArray.length; i++) {
            if (arraysAndObjects.taskArray[i].projectIndex == index) {
                fetchedTasks.push(arraysAndObjects.taskArray[i]);
            }
        }
        return fetchedTasks;
    }

    const setData = () => {
        localStorage.setItem('taskArray', JSON.stringify(arraysAndObjects.taskArray));
        localStorage.setItem('projectArray', JSON.stringify(arraysAndObjects.projectArray));
        console.log(localStorage);
    }

    const getData = () => {

        arraysAndObjects.taskArray = JSON.parse(localStorage.getItem('taskArray'));
        arraysAndObjects.projectArray = JSON.parse(localStorage.getItem('projectArray'));

        if (arraysAndObjects.taskArray == null) {
            arraysAndObjects.taskArray = [];
        }
        if (arraysAndObjects.projectArray == null) {
            arraysAndObjects.projectArray = [];
        }


        //write a statement checking for values with onclick functions and setting them as such through the DOM
    }

    let defaultProject = new project('My Project', 'My Notes', 'Due this sunday', 0);
    let taskArray = [];
    let projectArray = [defaultProject];
    let selectedProject = 0;

    return { task, project, projectArray, taskArray, fetchProjectTasks, selectedProject, setData, getData };
})();



const domMods = (() => {
    const contentDiv = document.getElementById('content');

    function removeChildren(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    //the point of this function is to clear the content div without deleting the hidden forms
    function clearContent() {
        document.getElementById('task-form').style.display = 'none';
        document.getElementById('project-form').style.display = 'none';
        while (contentDiv.childNodes.length > 4) {
            contentDiv.removeChild(contentDiv.lastChild);
        }
    }
    const createElementIdClassDataAppend = (element, ID, classN, data, parent) => {
        let temp = document.createElement(element);
        temp.id = ID;
        temp.className = classN;
        temp.data = data;
        document.getElementById(parent).appendChild(temp);
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

    const ImgIdClassAppend = (id, Class, importedImage, parent) => {
        let imgElement = document.createElement('img');
        imgElement.className = Class;
        imgElement.id = id;
        imgElement.src = importedImage;
        document.getElementById(parent).appendChild(imgElement);
    }
    return { createElementIdClassDataAppend, createElementAppend, createIdClassElementAppend, ImgAppend, ImgIdClassAppend, removeChildren, clearContent };
})();

const projectsTasks = (() => {

    const taskList = () => {
        //associatedTasks will create an array of task objects that have the corresponding index of their respective projects
        let associatedTasks = arraysAndObjects.fetchProjectTasks(arraysAndObjects.selectedProject);
        console.log(arraysAndObjects.selectedProject)
        console.log(associatedTasks)
        console.log(arraysAndObjects.taskArray)
        domMods.createElementAppend('div', 'task-list-container', 'content');

        for (let i = 0; i < associatedTasks.length; i++) {
            domMods.createIdClassElementAppend('div', `project-task-expansion-${i}`, `task-list-container`, 'expanded-task-list');

            domMods.createIdClassElementAppend('div', `title-description-div-${i}`, `project-task-expansion-${i}`, 'task-list-divs')
            domMods.createIdClassElementAppend('div', `notes-priority-div-${i}`, `project-task-expansion-${i}`, 'task-list-divs')
            domMods.createIdClassElementAppend('div', `due-div-${i}`, `project-task-expansion-${i}`, 'task-list-divs')


            domMods.createIdClassElementAppend('div', `project-expansion-title-${i}`, `title-description-div-${i}`, 'task-list-items');
            domMods.createIdClassElementAppend('div', `project-expansion-description-${i}`, `title-description-div-${i}`, 'task-list-items');
            domMods.createIdClassElementAppend('div', `project-expansion-notes-${i}`, `notes-priority-div-${i}`, 'task-list-items');
            domMods.createIdClassElementAppend('div', `project-expansion-priority-${i}`, `notes-priority-div-${i}`, 'task-list-items');
            domMods.createIdClassElementAppend('div', `project-expansion-due-${i}`, `due-div-${i}`, 'task-list-items');

            domMods.ImgIdClassAppend(`delete-tasks-${i}`, `delete-task`, trash, `project-task-expansion-${i}`);
            document.getElementById(`delete-tasks-${i}`).onclick = function () {
                //this loop finds the associatedTasks in the taskArray and deletes them when the corresponding delete-tasks function is triggered
                for (let j = 0; j < arraysAndObjects.taskArray.length; j++) {
                    //the below line should delete the taskArray object when the associatedTask[i]'s delete-task function is clicked
                    if (arraysAndObjects.taskArray[j] == associatedTasks[i]) {
                        arraysAndObjects.taskArray.splice(j, 1);
                    }
                }
                projects();
                projectList();
                taskList();

                arraysAndObjects.setData();
            }

            document.getElementById(`project-list-${arraysAndObjects.selectedProject}`).style.backgroundColor = 'white';

            document.getElementById(`project-expansion-title-${i}`).textContent = associatedTasks[i].title;
            document.getElementById(`project-expansion-description-${i}`).textContent = associatedTasks[i].description;
            document.getElementById(`project-expansion-notes-${i}`).textContent = associatedTasks[i].notes;
            document.getElementById(`project-expansion-priority-${i}`).textContent = associatedTasks[i].priority;
            document.getElementById(`project-expansion-due-${i}`).textContent = associatedTasks[i].due;
        }

    }

    const submitTask = () => {
        const formTitle = document.getElementById('title').value;
        const formDescription = document.getElementById('description').value;
        const formPriority = document.getElementById('priority').value;
        const formNotes = document.getElementById('notes').value;
        const formDue = document.getElementById('due-date').value;
        const selectedProject = arraysAndObjects.selectedProject;

        const temp = new arraysAndObjects.task(formTitle, formDescription, formPriority, formNotes, formDue, selectedProject);
        arraysAndObjects.taskArray.push(temp);
        console.log(`new task`, temp);

        arraysAndObjects.setData();

    }

    const projectList = () => {
        domMods.removeChildren(document.getElementById('project-list-container'));
        domMods.createElementAppend('div', 'selected-project-container', 'project-list-container');

        //closes form and repopulates project list
        document.getElementById('form-submit-button').onclick = function () {
            submitTask();
            document.getElementById('task-form').style.display = 'none';

            projects();
            projectList();
            taskList();
        }
        //creates all saved projects and their associated tasks
        for (let i = 0; i < arraysAndObjects.projectArray.length; i++) {
            domMods.createIdClassElementAppend('div', `project-list-${i}`, 'project-list-container', 'project-lists');
            domMods.ImgIdClassAppend(`add-tasks-${i}`, 'project-list-icons', showTasks, `project-list-${i}`);
            domMods.ImgIdClassAppend(`expand-tasks-${i}`, `project-list-icons`, addTasks, `project-list-${i}`);


            domMods.createIdClassElementAppend('div', `project-title-${i}`, `project-list-${i}`, 'project-list-items');
            domMods.createIdClassElementAppend('div', `project-notes-${i}`, `project-list-${i}`, 'project-list-items');
            domMods.createIdClassElementAppend('div', `project-due-${i}`, `project-list-${i}`, 'project-list-items');

            domMods.ImgIdClassAppend(`delete-project-${i}`, `project-list-icons`, trash, `project-list-${i}`);


            document.getElementById(`project-title-${i}`).textContent = arraysAndObjects.projectArray[i].title;
            document.getElementById(`project-notes-${i}`).textContent = arraysAndObjects.projectArray[i].notes;
            document.getElementById(`project-due-${i}`).textContent = arraysAndObjects.projectArray[i].due;

            //opens new task form
            document.getElementById(`add-tasks-${i}`).onclick = function () {
                arraysAndObjects.selectedProject = i;
                console.log(`selected project = ${i}`);
                domMods.clearContent();
                document.getElementById('task-form').style.display = 'flex';
            }

            //shows current projects tasks
            document.getElementById(`expand-tasks-${i}`).onclick = function () {
                //cleans the previous list when selecting another projects task list
                domMods.removeChildren(document.getElementById('selected-project-container'));
                arraysAndObjects.selectedProject = i;
                projects();
                projectList();
                taskList();

            }

            document.getElementById(`delete-project-${i}`).onclick = function () {
                arraysAndObjects.selectedProject = i;
                console.log(arraysAndObjects.selectedProject);
                console.log(arraysAndObjects.projectArray);
                console.log(arraysAndObjects.taskArray);

                let associatedTasks = arraysAndObjects.fetchProjectTasks(arraysAndObjects.selectedProject);

                //deletes project =)
                console.log(`project deleted `, arraysAndObjects.projectArray[i]);
                arraysAndObjects.projectArray.splice(i, 1);

                //this loop refactors each projectIndex in the project array
                for (let j = 0; j < arraysAndObjects.projectArray.length; j++) {
                    arraysAndObjects.projectArray[j].projectIndex = j;
                    console.log(`refactored project array`, arraysAndObjects.projectArray)

                    //this loop refactors each projectIndex in the task array subtracting the projectIndex of every projects task after the deleted project by 1
                    for (let k = 0; k < arraysAndObjects.taskArray.length; k++) {
                        if (arraysAndObjects.taskArray[k].projectIndex > arraysAndObjects.selectedProject) {
                            let projectIndexInt = arraysAndObjects.taskArray[k].projectIndex;
                            //every index after the deleted index has their index value reduced by 1 effectively keeping the proper task association between projects
                            arraysAndObjects.taskArray[k].projectIndex = projectIndexInt - 1
                        }
                    }

                }



                //this loop should delete all of the projects tasks
                for (let j = 0; j < associatedTasks.length; j++) {
                    for (let k = 0; k < arraysAndObjects.taskArray.length; k++) {
                        console.log(arraysAndObjects.taskArray[k]);

                        if (associatedTasks[j].projectIndex == arraysAndObjects.taskArray[k].projectIndex) {

                            arraysAndObjects.taskArray.splice(k, 1);
                        }
                    }
                }
                projects();
                projectList();
                taskList();
                arraysAndObjects.setData();
            }
        }
    }

    const submitProject = () => {
        let projectArrayLength = arraysAndObjects.projectArray;

        const projectTitle = document.getElementById(`project-title`).value;
        const projectNotes = document.getElementById(`project-notes`).value;
        const projectDueDate = document.getElementById(`project-due-date`).value;
        const projectIndex = arraysAndObjects.projectArray.length;
        let newProject = new arraysAndObjects.project(projectTitle, projectNotes, projectDueDate, projectIndex);

        for (let j = 0; j < arraysAndObjects.projectArray.length; j++) {
            arraysAndObjects.projectArray[j].projectIndex = j;
        }

        arraysAndObjects.projectArray.push(newProject);

        document.getElementById('project-form').style.display = 'none';
        projects();
        projectList();
        taskList();
        arraysAndObjects.setData();
    }

    const projects = () => {
        let projectListItems = document.getElementsByClassName('project-list-items');
        let projectListIcons = document.getElementsByClassName('project-list-icons')

        domMods.clearContent();
        domMods.createElementAppend('div', 'project-list-container', 'content');

        document.getElementById('project-button-tab').textContent = 'New Project';
        domMods.createElementAppend('button', 'add-project-button', 'project-button-tab');
        domMods.ImgAppend('plus-symbol', plus, 'add-project-button');

        document.getElementById('project-tab').onclick = function () {
            projects();
            projectList();
            taskList();
        }

        document.getElementById('add-project-button').onclick = function () {

            //refreshes the associated nodes and keeps expanded lists from being persistent through the project form after expanding a list
            projects();
            projectList();
            taskList();
            if (document.getElementById('task-list-container') != null) {
                domMods.removeChildren(document.getElementById('task-list-container'));
            }
            document.getElementById('project-form').style.display = 'flex';

            Array.from(projectListItems).forEach(div => {
                div.style.display = 'none';
            });
            Array.from(projectListIcons).forEach(div => {
                div.style.display = 'none';
            });

        }

        document.getElementById('project-submit-button').onclick = function () {

            submitProject();

            Array.from(projectListItems).forEach(div => {
                div.style.display = 'flex';
            });

            Array.from(projectListIcons).forEach(div => {
                div.style.display = 'flex';
            });

        }
    }

    return { submitTask, taskList, projectList, projects, submitProject }
})();
arraysAndObjects.getData();

//below if statements stops localStorage fetch in above line from throwing type errors on the following arrays
if (arraysAndObjects.projectArray == null) {
    arraysAndObjects.projectArray = [arraysAndObjects.defaultProject];
}
if (arraysAndObjects.taskArray == null) {
    arraysAndObjects.taskArray = [];
}



const header = () => {
    document.getElementById('header').style.gridArea = 'hd';

    domMods.createElementAppend('div', 'menu-icon', 'header');
    domMods.createElementAppend('div', 'project-logo', 'header');

    document.getElementById('project-logo').textContent = 'My ToDo App';
}

const sidebar = () => {
    const contentDiv = document.getElementById('content');

    document.getElementById('sidebar').style.gridArea = 'sb';
    domMods.createIdClassElementAppend('div', 'home-tab', 'sidebar', 'sidebar-tabs');
    domMods.createIdClassElementAppend('div', 'project-tab', 'sidebar', 'sidebar-tabs');
    domMods.createIdClassElementAppend('div', 'project-button-tab', 'sidebar', 'sidebar-tabs');

    document.getElementById('home-tab').textContent = 'Home';
    document.getElementById('project-tab').textContent = 'Projects';
}

const home = () => {

    domMods.clearContent();
    //TODO write displays live time and date with the current amount of projects and tasks left to complete in the content div

    domMods.createElementAppend('div', 'date-info-container', 'content');
    domMods.createElementAppend('div', 'date-time-container', 'date-info-container')
    domMods.createElementAppend('div', 'home-time', 'date-time-container');
    domMods.createElementAppend('div', 'home-date', 'date-time-container');
    domMods.createElementAppend('div', 'home-counter', 'date-info-container');

    function getTime() {
        let time = new Date().toLocaleTimeString();
        let date = new Date().toLocaleDateString();
        let totalTasks = arraysAndObjects.taskArray.length;
        let totalProjects = arraysAndObjects.projectArray.length;

        if (document.getElementById('home-time') == null) {
            clearInterval(timerInterval);
            //silences null elementId error
            return 1;
        }

        document.getElementById('home-time').textContent = time;
        document.getElementById('home-date').textContent = date;
        document.getElementById('home-counter').textContent = `you have ${totalTasks} tasks within ${totalProjects} different projects to do`;


    }

    let timerInterval = setInterval(getTime, 1000)

    document.getElementById('home-tab').onclick = function () {
        home();
    }
}

const footer = () => {
    domMods.createElementAppend('a', 'footer-content', 'footer')
    document.getElementById('footer-content').textContent = 'https://github.com/aaadev32';
    document.getElementById('footer-content').title = 'https://github.com/aaadev32';
    document.getElementById('footer-content').href = 'https://github.com/aaadev32';
    console.log(document.getElementById('footer-content'))

}


header(), sidebar(), footer(), projectsTasks.projects(), projectsTasks.projectList(), projectsTasks.taskList, home();

// ctrl+f all projectArray and taskArray pushes or splices and make sure to use localStorage.getItem or setItem appropriatley
// in order to create a locally stored To Do list for a user