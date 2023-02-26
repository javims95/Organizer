const react = (componentName, reactExtension, stylesExtension) => {
    if (reactExtension === '.jsx') {
        return (
`import React, { Component } from 'react';
import './${componentName}${stylesExtension}';

export default class ${componentName} extends Component {
    render() {
        return (
            <>
                {/* Your code here */}
            </>
        );
    }
}
`);
    } else {
        return (
`import React from 'react';
import './${componentName}${stylesExtension}';

interface ${componentName}VM {
    title: string;
}

const ${componentName} = (props: ${componentName}VM) => {
    return (
        <>
            <h1>{props.title}</h1>
        </>
    );
};

export default ${componentName};
`)
    }
}

module.exports = { react }
