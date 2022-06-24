import './style.css';
import home from './icons/menu.svg';

const domModule = (() => {
    return 1;

})();

const elementIdAppend = (element, ID, parent) => {
    element.id = ID;
    document.getElementById(parent).appendChild(element);
}

const elementIdImgAppend = (ID, importedImage, parent) => {
    let imgElement = document.createElement('img');
    imgElement.id = ID;
    imgElement.src = importedImage;
    document.getElementById(parent).appendChild(imgElement);
}

const header = () => {
    let menuIcon = document.createElement('div');
    elementIdAppend(menuIcon, 'menu-icon', 'header');
    let projectLogo = document.createElement('div');

    projectLogo.textContent = 'My ToDo App';
    elementIdAppend(projectLogo, 'project-logo', 'header');


    elementIdImgAppend('test-img', home, 'menu-icon');

    console.log('hello');

}

const sidebar = () => {

}

const content = () => {

}

const footer = () => {
    
}
header();