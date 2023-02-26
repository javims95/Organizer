const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const cli = require('cli-color');

const template = require('./component-parts.js');

inquirer
    .prompt([
        {
            name: 'name',
            message: 'Nombre del componente',
            type: 'input'
        },
        {
            name: 'reactExtension',
            message: 'Extensión del archivo React',
            type: 'list',
            choices: ['.jsx', '.tsx']
        },
        {
            name: 'stylesExtension',
            message: 'Extensión del archivo de estilos',
            type: 'list',
            choices: ['.scss', '.css', '.sass']
        },
    ])
    .then(function (answer) {
        const {name: componentName, reactExtension, stylesExtension} = answer;
        const componentPath = path.join(__dirname, '..', '..', 'components', componentName);

        // Create the component directory
        fs.mkdirSync(componentPath);

        // Create the component logic file
        fs.writeFileSync(path.join(componentPath, `${componentName}${reactExtension}`), template.react(componentName, reactExtension, stylesExtension));

        // Create the component styles file
        fs.writeFileSync(path.join(componentPath, `${componentName}${stylesExtension}`), '');

        // Messages
        console.log(cli.green(`+ Created ${componentName}${reactExtension} component`));
        console.log(cli.green(`+ Created ${componentName}${stylesExtension} component`));

    });