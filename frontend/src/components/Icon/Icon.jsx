import React, { useState, useEffect } from 'react';

const Icon = ({ icon, width, height, className }) => {
    const [svg, setSvg] = useState(null);
    const [viewBox, setViewBox] = useState(null);
    const optionalProps = { className, width, height, };
    const props = Object.fromEntries(
        Object.entries(optionalProps).filter(([_, value]) => value != null)
    );

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
        <svg viewBox={viewBox} {...props}>
            <path d={svg} />
        </svg>
    ) : null;
};

export default Icon;
