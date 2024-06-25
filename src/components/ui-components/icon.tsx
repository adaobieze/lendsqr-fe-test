import React from 'react';

type IconProps = {
    name: string;
    width?: string | number;
    height?: string | number;
    className?: string;
    style?: React.CSSProperties;
};

export default function Icon({ name, width = 24, height = 24, className, style  }: IconProps) {
    const IconComponent = require(`/public/icons/${name}.svg`).default;

    return <IconComponent
        width={width}
        height={height}
        className={className}
        style={style}
    />;
};
