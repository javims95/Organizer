const react = (componentName, reactExtension, stylesExtension) => {
	if (reactExtension === '.jsx') {
		return `import React, { Component } from 'react';
import` + ` './${componentName}${stylesExtension}';` + `

export default class ${componentName} extends Component {

    render() {
        return (
            <div>
                {/* Your code here */}
            </div>
        );
    }
}`
	} else {
		return `import React from 'react';

interface Props {
    title: string;
}

const ${componentName} = (props: Props) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    );
};

export default ${componentName};`;
	}
}

export default { react }
