const CustImageComponent = ({ value }: { value: string }) => {
    return <div style={{
        minWidth: "60px", minHeight: "20px", maxWidth: "60px", maxHeight: "20px", overflow: "none"

    }}><img style={{ width: "auto", height: "20px" }} src={value} alt="X"></img></div>

}

export default CustImageComponent;