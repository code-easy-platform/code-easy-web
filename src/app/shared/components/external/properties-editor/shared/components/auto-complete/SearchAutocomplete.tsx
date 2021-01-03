import React, { useState } from 'react';

import { SearchAutoCompleteOption } from './SearchAutoCompleteOption';
import { ISuggestion } from './../../interfaces';
import './SearchAutocomplete.css';

interface SearchAutocompleteProps {
    onSelect?(option: ISuggestion): void,
    options?: ISuggestion[],
    show: boolean,
}
export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({ options = [], show = false, onSelect }) => {

    const [search, setSearch] = useState('');

    if (!show || options.length === 0) return null;

    return (
        <ul onClick={e => e.stopPropagation()} style={{ transform: 'translateY(63%)', zIndex: 5000, minWidth: 100 }} className="options absolute padding-bottom-s box-shadow-small background-bars flex-column border-radius">
            <input
                value={search}
                autoFocus={true}
                className={"input-search flex1"}
                placeholder={"Type here to seach..."}
                onChange={e => setSearch(e.currentTarget.value)}
            />
            {options.filter(({ label }) => label.value.toLowerCase().indexOf(search.toLowerCase()) > -1).map((option, index) => {
                return (
                    <SearchAutoCompleteOption
                        id={index}
                        key={index}
                        {...option}
                        onSelect={() => onSelect && onSelect(option)}
                    />
                );
            })}
        </ul>
    );
}
