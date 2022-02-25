import {ReactSearchAutocomplete} from "react-search-autocomplete";
import SelectedTable from "./SelectedTable";
import React from "react";

export default function TeamPreferenceSelector(props) {
    const availableTeams = props.availableTeams;
    const handleOnSearch = props.handleOnSearch;
    const handleOnHover = props.handleOnHover;
    const handleOnSelect = props.handleOnSelect;
    const handleOnFocus = props.handleOnFocus;
    const formatResult = props.formatResult;
    const selectedTeams = props.selectedTeams;
    const removeSelected = props.removeSelected;
    return (
        <div className='wrapper'>
            <ReactSearchAutocomplete
                items={availableTeams}
                onSearch={handleOnSearch}
                fuseOptions={{
                    keys: ["city", "name", "sport"],
                    threshold: 0.2,
                    maxPatternLength: 32,
                    minMatchCharLength: 1 }}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                autoFocus
                formatResult={formatResult}
            />
            <SelectedTable selectedData={selectedTeams} removeSelected={removeSelected} />
        </div>
    );
}