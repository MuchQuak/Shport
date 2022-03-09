import {ReactSearchAutocomplete} from "react-search-autocomplete";
import SelectedTable from "./SelectedTable";
import React, {useEffect, useState} from "react";
import {fetchSports, getAllTeams, getTeamLogo} from "./SportHandler";
import "./style/Selector.css";

const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
}
const handleOnHover = (result) => {}
const handleOnFocus = () => {}
const formatResult = (item) => {
    return (
        <div className='logo-multiline-words'>
            {getTeamLogo(item.sport, item.code, null)}
            <div className='logo-text'>
                <p>{item.city} {item.name}</p>
                <p>{item.sport}</p>
            </div>
        </div>
    )
}
function itemsEqual(a, b) {
    return a.name === b.name && a.city === b.city && a.sport === b.sport && a.code === b.code;
}

export default function TeamPreferenceSelector(props) {
    const [availableTeams, setAvailableTeams] = useState([]);
    const selectedTeams = props.selected;
    function setSelectedTeams(select) {
        props.setSelected(select);
    }
    useEffect(() => {
        fetchSports().then(result => {
            if (result)
                setAvailableTeams(getAllTeams(result).filter(element => !selectedTeams.some((e) => itemsEqual(e, element))));
        });
    }, [selectedTeams] );
    if (!props || !availableTeams || availableTeams.length === 0 || !props.selected || !props.setSelected) {
        return null;
    }
    const handleOnSelect = (item) => {
        setAvailableTeams(availableTeams.filter(element => !itemsEqual(element, item)));
        setSelectedTeams(oldArray => [...oldArray, item]);
    }
    function removeSelected(index){
        const select = selectedTeams[index];
        setAvailableTeams(old => [...old, select]);
        setSelectedTeams(selectedTeams.filter(element => !itemsEqual(element, select)));
    }
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