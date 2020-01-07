import React from 'react';

export const Assign = (props: any) => {

    // Configura o top e left do triangulo.
    const left2 = props.left + (props.width / 2);
    const top2 = props.top + (props.height / 2);


    // Cria o "=".
    const pgTopLeft_Left: number = (left2 - 10);
    const pgTopLeft_Top: number = (top2 - 5);
    const pgTopRight_Left: number = (pgTopLeft_Left + 20);
    const pgTopRight_Top: number = pgTopLeft_Top - 0;

    const pgBottonLeft_Left: number = pgTopLeft_Left + 0;
    const pgBottonLeft_Top: number = pgTopLeft_Top + 10;
    const pgBottonRight_Left: number = pgTopLeft_Left + 20;
    const pgBottonRight_Top: number = pgTopLeft_Top + 10;

    const strokeColor: string = props.isSelecionado ? "#999fff" : "#219653";


    return (
        <>
            <rect
                key={"Assign_" + props.id}
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
            <line
                strokeLinecap="round"
                stroke={strokeColor}
                x2={pgTopRight_Left}
                x1={pgTopLeft_Left}
                y2={pgTopRight_Top}
                y1={pgTopLeft_Top}
                strokeWidth={3}
            />
            <line
                strokeLinecap="round"
                x2={pgBottonRight_Left}
                x1={pgBottonLeft_Left}
                y2={pgBottonRight_Top}
                y1={pgBottonLeft_Top}
                stroke={strokeColor}
                strokeWidth={3}
            />
        </>
    );
}
