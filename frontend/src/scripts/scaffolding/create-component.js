import inquirer from 'inquirer';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cli from 'cli-color';

import file from './content.mjs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
            choices: ['.css', '.scss', '.sass']
        },
    ])
    .then(function (answer) {
        const componentName = answer.name
        const componentPath = path.join(__dirname, '..', '..', 'components', componentName);
        const reactExtension = answer.reactExtension
        const stylesExtension = answer.stylesExtension

        // Create the component directory
        fs.mkdirSync(componentPath);

        // Create the component JSX file
        const componentFile = `import React from 'react';

        interface Props {
        title: string;
        }

        const ${componentName} = (props: Props) => {
            return (
                <div>
                    <h1>{props.title}</h1>
                    <p>{props.description}</p>
                </div>
            );
        };

        export default ${componentName};`;

        fs.writeFileSync(path.join(componentPath, `${componentName}${reactExtension}`), file.react(componentName, reactExtension, stylesExtension));

        // Create the component CSS file
        fs.writeFileSync(path.join(componentPath, `${componentName}${stylesExtension}`), '');

        // Messages
        console.log(cli.green(`+ Created ${componentName}${reactExtension} component`));
        console.log(cli.green(`+ Created ${componentName}${stylesExtension} component`));

    });





