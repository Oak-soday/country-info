// @ts-nocheck
import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { useTable, useFilters, useGlobalFilter, Column, TableInstance, usePagination } from 'react-table';
import { GlobalFilter } from './Filter';
import DropdownFilter from './DropdownFilter';
import { COUNTRIES_API_URL } from '../constants/api';
import { customPopulationFilter } from './PopulationFilter';
import CustImageComponent from './ImageComponent';
import '../css/components/CountryList.css';

interface Country {
    name: string;
    abbreviation: string;
    capital: string;
    phone: string;
    population: number;
    media: {
        flag: string;
        emblem: string;
    },
}

interface TableState<Country> {
    globalFilter?: string;
    setGlobalFilter?: (filterValue?: string | undefined) => void;
}

const CountriesTable: React.FC = () => {
    const [data, setData] = useState<Country[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setFilter('population', "");
        setLoading(true);
        try {
            const response = await axios.get<Country[]>(COUNTRIES_API_URL);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const columns: Column<Country>[] = useMemo(
        () => [
            {
                Header: 'Country Name',
                accessor: 'name',
            },
            {
                Header: 'Code',
                accessor: 'abbreviation',
            },
            {
                Header: 'Capital',
                accessor: 'capital',
            },
            {
                Header: 'Ph Code',
                accessor: 'phone',
            },
            {
                Header: 'Population',
                accessor: 'population',
                Filter: DropdownFilter,
                filter: 'customPopulationFilter',
            },
            {
                Header: 'Flag',
                accessor: (row) => row.media.flag,
                Cell: CustImageComponent,
            },
            {
                Header: 'Emblem',
                accessor: (row) => row.media.emblem,
                Cell: CustImageComponent,
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        // @ts-ignore
        setGlobalFilter,
        // @ts-ignore,
        nextPage,
        // @ts-ignore,
        previousPage,
        // @ts-ignore,
        canNextPage,
        canPreviousPage,
        pageOptions,
        setFilter,
        page,
        state,


    } = useTable(
        {
            columns,
            data,
            // @ts-ignore
            filterTypes: {
                customPopulationFilter,
            },
            initialState: { filters: [] }


        },
        useFilters,
        useGlobalFilter,
        usePagination


    ) as TableInstance<Country> & { state: TableState<Country> };

    const { globalFilter, pageIndex } = state;

    const handleClearFilter = () => {
        setGlobalFilter?.('');
        setFilter('population', "");
    };



    return (
        <div>
            <div className='filter-header'>
                <div className='gloablfilter'>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
                    </React.Suspense>
                    <button data-testid="show-btn" className="clear-btn" onClick={handleClearFilter}>Clear</button>
                </div>
                <button className="showall-btn" onClick={fetchData} disabled={loading}>
                    {loading ? 'Loading...' : 'Show all Countries'}
                </button>
            </div>
            <table {...getTableProps()} className='country-table'>
                <thead>
                    {headerGroups.map((headerGroup, key) => (
                        <tr key={key} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, key) => (
                                <th key={key} {...column.getHeaderProps()} className='table-border country-table-head'>
                                    {column.render('Header')}
                                    {/* @ts-ignore */}
                                    <div className='Population-filter'>{column.id == 'population' && (column?.canFilter ? column?.render("Filter") : null)}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} className='table-border country-table-body'>
                    {loading ? (
                        // Skeleton loading rows
                        Array.from({ length: 10 }).map((_, rowIndex) => (
                            <tr key={rowIndex} >
                                {columns.map((_, cellIndex) => (
                                    <td key={cellIndex} className='table-border country-table-cell'><div className='skeleton'></div></td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        page.map((row: { cells: Function }, key) => {
                            {/* @ts-ignore */ }
                            prepareRow(row);
                            return (
                                <>
                                    {/* @ts-ignore */}
                                    <tr key={key} {...row.getRowProps()}>
                                        {/* @ts-ignore */}
                                        {row.cells.map((cell, key) => (
                                            <td key={key} {...cell.getCellProps()} className='table-border country-table-cell'>
                                                {cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                </>
                            );
                        }))}
                </tbody >
            </table>
            <div className='table-pagination'>
                <span>
                    PAGE{' '}
                    <strong>{pageIndex + 1} OF {pageOptions.length}</strong>
                </span>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next
                </button>
            </div>
        </div >
    );
};

export default CountriesTable;
