
export const customPopulationFilter = (rows: any[], id: string, filterValue: string) => {
    if (!filterValue) return rows;

    return rows.filter(row => {
        const rowValue = row.values[id];
        switch (filterValue) {
            case '<1000000':
                return rowValue < 1000000;
            case '<5000000':
                return rowValue < 5000000;
            case '<10000000':
                return rowValue < 10000000;
            default:
                return true;
        }
    });

};
