import './style.css';
import home from './icons/menu.svg';

const domModule = (() => {


    return 1;
})();

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

const header = () => {
    document.getElementById('header').style.gridArea = 'hd';

    createElementAppend('div', 'menu-icon', 'header');
    createElementAppend('div', 'project-logo', 'header');

    document.getElementById('project-logo').textContent = 'My ToDo App';

    ImgAppend('test-img', home, 'menu-icon');

    console.log('hello');

}

const sidebar = () => {
    document.getElementById('sidebar').style.gridArea = 'sb';
    createElementAppend('div', 'home', 'sidebar');
    createElementAppend('div', 'tasks', 'sidebar');
    createElementAppend('div', 'project', 'sidebar');

    document.getElementById('home').textContent = 'Home'
    document.getElementById('tasks').textContent = 'Tasks';
    document.getElementById('project').textContent = 'Projects';
}

const content = () => {
    createElementAppend('div', 'stuff', 'content');
    document.getElementById('stuff').textContent = 'content stuff';
}

const footer = () => {
    createElementAppend('div', 'footer-stuff', 'footer')
    document.getElementById('footer-stuff').textContent = 'footer stuff'
}
header(), sidebar(), content(), footer();

//TODO 6/27/22 create forms with neccessary inputs for creating
// a new task(refer to Libre Writer Document) then/or build 
// the class constructor required to handle the inputs