import React from 'react';
import { populationOptions } from '../constants/populationOptions';
import '../css/components/PopulationFilter.css';

interface DropdownFilterProps {
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    setFilter: Function
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({ column: { filterValue, setFilter } }: any) => {
    return (
        <select
            className='population-select'
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined);
            }}
        >
            {populationOptions?.map((data, key) => {
                return <option value={data.value}>{data.label}</option>
            })}

        </select>

    );
};

export default DropdownFilter;
