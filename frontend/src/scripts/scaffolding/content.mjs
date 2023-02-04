const react = (name, extension) => {
    console.log(extension);
	if (extension === '.jsx') {
		return `import React from 'react'

export const ${name} = () => {
    return (
        <>
            <div>Example content</div>
        </>
    )
}

export default ${name};`
	} else {
		return `import React from 'react';

interface Props {
    title: string;
}

const ${name} = (props: Props) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    );
};

export default ${name};`;
	}
}

export default { react }
