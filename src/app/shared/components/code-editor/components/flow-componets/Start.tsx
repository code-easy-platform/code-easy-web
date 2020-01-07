import React from 'react';

export const Start = (props: any) => {

    // Configura o top e left do triangulo.
    const left2 = props.left + (props.width / 2);
    const top2 = props.top + (props.height / 2);

    // Cria o triângulo.
    const pgRightRight: number = (left2 + 10);
    const pgBottonLeft: number = left2 - 7;
    const pgBottonTop: number = top2 + 10;
    const pgTopLeft: number = (left2 - 7);
    const pgTopTop: number = (top2 - 12);
    const pgTopRight: number = top2 - 1;

    const strokeColor: string = props.isSelecionado ? "#999fff" : "#219653";

    return (
        <>
            <rect
                key={"Start_" + props.id}
                strokeLinejoin="round"
                height={props.height}
                stroke={strokeColor}
                width={props.width}
                strokeWidth="2"
                fill="#1e1e1e"
                x={props.left}
                y={props.top}
                id={props.id}
                rx="25"
            />
            <polygon
                strokeLinejoin="round"
                stroke={strokeColor}
                strokeWidth="2"
                key={props.id}
                fill="#1e1e1e"
                id={props.id}
                points={
                    pgTopLeft + ", " +
                    pgTopTop + ", " +
                    pgRightRight + ", " +
                    pgTopRight + ", " +
                    pgBottonLeft + ", " +
                    pgBottonTop
                }
            />
        </>
    );
}
