const react = (componentName, reactExtension, stylesExtension) => {
    if (reactExtension === '.jsx') {
        return (
`import React, { Component } from 'react';
import './${componentName}${stylesExtension}';

export default class ${componentName} extends Component {
    render() {
        return (
            <div>
                {/* Your code here */}
            </div>
        );
    }
}
`);
    } else {
        return (
`import React from 'react';
import './${componentName}${stylesExtension}';
import { Props } from './${componentName}.VM';

const ${componentName} = (props: Props) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    );
};

export default ${componentName};
`)
    }
}

const interface = () => {
  return (
`export interface Props {
    title: string;
}`
  )
}

module.exports = { react, interface }
