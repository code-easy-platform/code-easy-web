import { MouseEvent, KeyboardEvent } from "react";
import { IObservable } from "react-observing";

/**
 * Used to define a Breadcrumb button
 */
export interface IBreadCrumbButton {
    /**
     * Text of the button
     */
    label: IObservable<string>;
    /**
     * Usade to disable click in to the button
     */
    disabled?: IObservable<boolean>;
    /**
     * Function executed when button is clicked
     */
    onClick: IObservable<(e: MouseEvent | KeyboardEvent) => void>;
}
