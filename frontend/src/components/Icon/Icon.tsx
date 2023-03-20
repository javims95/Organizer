import React, { useState, useEffect } from 'react';

type IconProps = {
    icon: string;
    color?: string;
    width?: string;
    height?: string;
    className?: string;
    style?: React.CSSProperties;
};

const Icon: React.FC<IconProps> = ({ icon, color, width, height, className, style }) => {
    const [svg, setSvg] = useState<string | null>(null);
    const [viewBox, setViewBox] = useState<string | null>(null);
    const optionalProps = { width, height, className, style, color };
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
            setSvg(null);
            setViewBox(null);
        }
    }, [icon, color, width, height, className]);

    return svg ? (
        <svg viewBox={viewBox} {...props}>
            <path d={svg} />
        </svg>
    ) : null;
};

export default Icon;
