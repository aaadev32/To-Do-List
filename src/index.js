import './style.css';
import plus from './icons/plus.svg';
import showTasks from './icons/show_tasks.png';
import addTasks from './icons/menu.svg';
import trash from './icons/delete.svg';


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
    //contains all project object
    let taskArray = [];
    let projectArray = [];
    let selectedProject = 0;

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
            this.projectIndex = projectIndex
        }
    }

    //this function is used to create an array based off of the project index of tasks which is automatically assigned when a user adds a task in a project
    const fetchProjectTasks = (index) => {
        let fetchedTasks = [];
        for (let i = 0; i < taskArray.length; i++) {
            if (arraysAndObjects.taskArray[i].projectIndex == index) {
                fetchedTasks.push(arraysAndObjects.taskArray[i]);
            }
            //fetch tasks
        }
        return fetchedTasks;
    }

    const newArray = (name) => {
        name = [];
        return name;
    }

    const deleteindex = (array, index) => {
        array.splice(index, 1);
        return 1;
    }


    return { task, project, newArray, projectArray, taskArray, deleteindex, fetchProjectTasks };
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
        //builds task list from taskArray
        let associatedTasks = arraysAndObjects.fetchProjectTasks(arraysAndObjects.selectedProject);
        //associatedTasks will create an array of task objects that have the corresponding index of their respective projects
        console.log(`associated task array${associatedTasks}`);

        for (let i = 0; i < associatedTasks.length; i++) {
            domMods.createIdClassElementAppend('div', `project-task-expansion-${i}`, `selected-project-container`, 'expanded-task-list');
            domMods.createElementAppend('div', `task-${i}`, `project-task-expansion-${i}`);
            domMods.createElementAppend('div', `project-expansion-title-${i}`, `project-task-expansion-${i}`);
            domMods.createElementAppend('div', `project-expansion-description-${i}`, `project-task-expansion-${i}`);
            domMods.createElementAppend('div', `project-expansion-notes-${i}`, `project-task-expansion-${i}`);
            domMods.createElementAppend('div', `project-expansion-priority-${i}`, `project-task-expansion-${i}`);
            domMods.createElementAppend('div', `project-expansion-due-${i}`, `project-task-expansion-${i}`);

            document.getElementById(`project-list-${arraysAndObjects.selectedProject}`).style.backgroundColor = 'white';

            document.getElementById(`task-${i}`).textContent = `${i + 1}.`
            document.getElementById(`project-expansion-title-${i}`).textContent = arraysAndObjects.taskArray[i].title;
            document.getElementById(`project-expansion-description-${i}`).textContent = arraysAndObjects.taskArray[i].description;
            document.getElementById(`project-expansion-notes-${i}`).textContent = arraysAndObjects.taskArray[i].notes;
            document.getElementById(`project-expansion-priority-${i}`).textContent = arraysAndObjects.taskArray[i].priority;
            document.getElementById(`project-expansion-due-${i}`).textContent = arraysAndObjects.taskArray[i].due;
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
        console.log(arraysAndObjects.taskArray);
    }

    const projectList = () => {
        domMods.removeChildren(document.getElementById('project-list-container'));
        domMods.createElementAppend('div', 'selected-project-container', 'project-list-container');

        //closes form and repopulates project list
        document.getElementById('form-submit-button').onclick = function () {
            submitTask();
            document.getElementById('task-form').style.display = 'none';

            //refreshes projects nodes, project lists and task lists
            projects();
            projectList();
            taskList();

        }
        //creates all saved projects and their associated tasks
        for (let i = 0; i < arraysAndObjects.projectArray.length; i++) {
            domMods.createIdClassElementAppend('div', `project-list-${i}`, 'project-list-container', 'project-lists');
            domMods.ImgIdClassAppend(`add-tasks-${i}`, 'project-list-items', showTasks, `project-list-${i}`);
            domMods.ImgIdClassAppend(`expand-tasks-${i}`, `project-list-items`, addTasks, `project-list-${i}`);
            domMods.ImgIdClassAppend(`delete-tasks-${i}`, `project-list-items`, trash, `project-list-${i}`);

            domMods.createIdClassElementAppend('div', `project-title-${i}`, `project-list-${i}`, 'project-list-items');
            domMods.createIdClassElementAppend('div', `project-notes-${i}`, `project-list-${i}`, 'project-list-items');
            domMods.createIdClassElementAppend('div', `project-due-${i}`, `project-list-${i}`, 'project-list-items');

            document.getElementById(`project-title-${i}`).textContent = arraysAndObjects.projectArray[i].title;
            document.getElementById(`project-notes-${i}`).textContent = arraysAndObjects.projectArray[i].notes;
            document.getElementById(`project-due-${i}`).textContent = arraysAndObjects.projectArray[i].due;

            //opens new task form
            document.getElementById(`add-tasks-${i}`).onclick = function () {

                arraysAndObjects.selectedProject = i;
                console.log(`selected project = ${i}`)
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
                console.log(arraysAndObjects.selectedProject);
            }

            document.getElementById(`delete-tasks-${i}`).onclick = function () {
                let expandedTaskListClass = document.getElementsByClassName(`expanded-task-list`)
                arraysAndObjects.selectedProject = i;
                //loop through task array deleting all tasks with associated i index
                for (let j = 0; j < arraysAndObjects.taskArray.length; j++) {
                    if (arraysAndObjects.taskArray[j].projectIndex == arraysAndObjects.selectedProject) {
                        console.log('task deleted!' + `${console.log(arraysAndObjects.taskArray)}`);
                        arraysAndObjects.deleteindex(arraysAndObjects.taskArray, i);
                    }
                }
                projects();
                projectList();
                taskList();
            }
        }
    }


    const submitProject = () => {
        let i = arraysAndObjects.projectArray.length;
        const projectTitle = document.getElementById(`project-title`).value;
        const projectNotes = document.getElementById(`project-notes`).value;
        const projectDueDate = document.getElementById(`project-due-date`).value;
        let newProject = new arraysAndObjects.project(projectTitle, projectNotes, projectDueDate)

        arraysAndObjects.projectArray.push(newProject);
        console.log(arraysAndObjects.projectArray)

        document.getElementById('project-form').style.display = 'none';
        projectList();

    }

    const projects = () => {
        let projectListClass = document.getElementsByClassName('project-list-items');

        domMods.clearContent();
        domMods.createElementAppend('div', 'project-container', 'content');
        domMods.createElementAppend('div', 'project-list-container', 'project-container');

        document.getElementById('project-button-container').textContent = 'New Project';
        domMods.createElementAppend('button', 'add-project-button', 'project-button-container');

        domMods.ImgAppend('plus-symbol', plus, 'add-project-button');


        document.getElementById('add-project-button').onclick = function () {

            //calling project list refreshes the associated nodes and keeps expanded lists from being persistent through the project form after expanding a list
            projectList();
            document.getElementById('project-form').style.display = 'flex';

            /* might bring this line back if i move the new project button from the sidebar
            document.getElementById('project-button-container').style.display = 'none';
            */
            Array.from(projectListClass).forEach(div => {
                div.style.display = 'none';
            });

        }

        document.getElementById('project-submit-button').onclick = function () {

            submitProject();
            projectList();

            /* might bring this line back if i move the new project button from the sidebar
            document.getElementById('project-button-container').style.display = 'flex';
            */
            Array.from(projectListClass).forEach(div => {
                div.style.display = 'flex';
            });

        }
    }

    return { submitTask, taskList, projectList, projects, submitProject }
})();

const header = () => {
    document.getElementById('header').style.gridArea = 'hd';

    domMods.createElementAppend('div', 'menu-icon', 'header');
    domMods.createElementAppend('div', 'project-logo', 'header');

    document.getElementById('project-logo').textContent = 'My ToDo App';
}

const sidebar = () => {
    const contentDiv = document.getElementById('content');

    document.getElementById('sidebar').style.gridArea = 'sb';

    domMods.createElementAppend('div', 'home-tab', 'sidebar');
    domMods.createElementAppend('div', 'tasks-tab', 'sidebar');
    domMods.createElementAppend('div', 'project-tab', 'sidebar');
    domMods.createElementAppend('div', 'project-button-container', 'sidebar');

    const sidebarHome = document.getElementById('home-tab');
    const sidebarTasks = document.getElementById('tasks-tab');

    document.getElementById('home-tab').textContent = 'Home';
    document.getElementById('project-tab').textContent = 'Projects';
}

const content = () => {
    //make this display the date and time on page open and home button click
}

const footer = () => {
    domMods.createElementAppend('div', 'footer-stuff', 'footer')
    document.getElementById('footer-stuff').textContent = 'footer stuff'
}

header(), sidebar(), content(), footer(), projectsTasks.projects();

//TODO after adding a task the project list doesnt refresh 7/19/22
//TODO line 209 taskList only appears on 2nd click
//TODO line 282 comment
//TODO create a delete button for tasks and projects