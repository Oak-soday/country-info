export const GlobalFilter = ({ filter, setFilter }: { filter: string | undefined, setFilter: Function | undefined }) => {
    return (
        <span className="global-input">
            <input data-testid="global-input" value={filter || ''} onChange={(e) => setFilter && setFilter(e.target.value)} placeholder="Country Name"></input>
        </span>
    )
}