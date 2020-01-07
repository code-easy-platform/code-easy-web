import React from 'react';

export const If = (props: any) => {

    // Configura o top e left do quadrado.
    const left2 = props.left + (props.width / 3);
    const top2 = props.top + (props.height / 3);

    // Cria o quadrado.
    const pgTopLeft_Left: number = (left2 - 17);
    const pgTopLeft_Top: number = (top2 + 10);

    const pgTopRight_Left: number = (pgTopLeft_Left + 25);
    const pgTopRight_Top: number = pgTopLeft_Top - 25;
    const pgBottonLeft_Left: number = pgTopLeft_Left + 25;
    const pgBottonLeft_Top: number = pgTopLeft_Top + 25;
    const pgBottonRight_Left: number = pgTopLeft_Left + 50;
    const pgBottonRight_Top: number = pgTopLeft_Top;

    const strokeColor: string = props.isSelecionado ? "#999fff" : "#219653";

    return (
        <>
            <polygon
                stroke={strokeColor}
                strokeWidth="2"
                key={props.id}
                fill="#1e1e1e"
                id={props.id}
                points={
                    pgTopLeft_Left + ", " +
                    pgTopLeft_Top + ", " +

                    pgTopRight_Left + ", " +
                    pgTopRight_Top + ", " +

                    pgBottonRight_Left + ", " +
                    pgBottonRight_Top + ", " +

                    pgBottonLeft_Left + ", " +
                    pgBottonLeft_Top
                }
            />
            />
        </>
    );
}
