import { MouseEvent, KeyboardEvent } from "react";

/**
 * Used to define a Breadcrumb button
 */
export interface IBreadCrumbButton {
    /**
     * Text of the button
     */
    label: string;
    /**
     * Usade to disable click in to the button
     */
    disabled?: boolean;
    /**
     * Function executed when button is clicked
     */
    onClick(e: MouseEvent | KeyboardEvent): void;
}
