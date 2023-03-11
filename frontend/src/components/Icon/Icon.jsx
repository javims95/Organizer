import React, { useState, useEffect } from 'react';

const Icon = ({ icon, color, width, height, className }) => {
    const [svg, setSvg] = useState(null);
    const [viewBox, setViewBox] = useState(null);
    const optionalProps = { width, height, className };
    const props = {
        ...optionalProps,
        fill: color,
    };

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
        return () => {
            setSvg({});
            setViewBox({});
        }
    }, [icon, color, width, height, className]);

    return svg ? (
        <svg viewBox={viewBox} {...props}>
            <path d={svg} />
        </svg>
    ) : null;
};

export default Icon;
