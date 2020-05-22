import React from 'react';
import { ISuggestion } from '../interfaces';

interface SearchAutocompleteProps {
    onSelect?(option: ISuggestion): void,
    options?: ISuggestion[],
    show: boolean,
}
export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({ options = [], show = false, onSelect }) => {
    if (!show || options.length === 0) return <></>
    return (
        <div style={{ transform: 'translateY(63%)', zIndex: 5000 }} className="absolute padding-top-s padding-bottom-s box-shadow-small background-bars flex-column border-radius">
            {options.map((option, index) => {
                return (
                    <button
                        key={index}
                        tabIndex={0}
                        id={index.toString()}
                        style={{ width: "unset", textAlign: 'start' }}
                        onClick={() => (onSelect && !option.disabled) && onSelect(option)}
                        onMouseDown={() => (onSelect && !option.disabled) && onSelect(option)}
                        className={`btn padding-s  outline-none${option.disabled && " disabled"}`}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}
