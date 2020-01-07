import React from 'react';

export const Switch = (props: any) => {

    // Configura o top e left do quadrado.
    const left2 = props.left + (props.width / 3);
    const top2 = props.top + (props.height / 3);

    // Consigura a altura e largura do item.
    const polyHeight = 18;
    const polyWidth = 35;

    // Cria o quadrado.
    const pgPonto01_Left = (left2 - 15);
    const pgPonto01_Top = (top2 + 5);

    const pgPonto02_Left = (pgPonto01_Left + 10);
    const pgPonto02_Top = (pgPonto01_Top + polyHeight);

    const pgPonto03_Left = (pgPonto01_Left + polyWidth);
    const pgPonto03_Top = pgPonto01_Top + polyHeight;

    const pgPonto04_Left = (pgPonto01_Left + (polyWidth + 10));
    const pgPonto04_Top = pgPonto01_Top;

    const pgPonto05_Left = (pgPonto01_Left + polyWidth);
    const pgPonto05_Top = pgPonto01_Top - polyHeight;

    const pgPonto06_Left = (pgPonto01_Left + 10);
    const pgPonto06_Top = pgPonto01_Top - polyHeight;

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
                    pgPonto01_Left + ", " +
                    pgPonto01_Top + ", " +

                    pgPonto02_Left + ", " +
                    pgPonto02_Top + ", "+

                    pgPonto03_Left + ", " +
                    pgPonto03_Top + ", " +

                    pgPonto04_Left + ", " +
                    pgPonto04_Top + ", "  +

                    pgPonto05_Left + ", " +
                    pgPonto05_Top + ", " +

                    pgPonto06_Left + ", " +
                    pgPonto06_Top + ", "
                }
            />
            />
        </>
    );
}
