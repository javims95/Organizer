import React, { useState, useEffect } from 'react';

const Icon = ({ icon, width, height, className }) => {
    const [svg, setSvg] = useState(null);
    const [viewBox, setViewBox] = useState(null);

    useEffect(() => {
        fetch('icons.svg')
            .then(response => response.text())
            .then(text => {
                const regex = new RegExp(`<symbol id="${icon}".*?viewBox="(.*?)".*?<path d="(.*?)"`, 's');
                const match = text.match(regex);
                if (match) {
                    const path = match[2];
                    setSvg(path);
                    setViewBox(match[1]);
                }
            });
    }, [icon, width, height, className]);

    return svg ? (
        <svg
            className={className ? className : ''}
            viewBox={viewBox}
            width={width}
            height={height}>
            <path d={svg} />
        </svg>
    ) : null;
};

export default Icon;
