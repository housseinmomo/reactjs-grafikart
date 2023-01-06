
// creation d'un composant : cacultrice 

function ShowResult () {
    return <div className="form-group">
        <input type="text" name="result" placeholder="taper..."className="form-control"/>
    </div>
}

function ShowNumberAndSymbol () {
    return <div className="col">
        <div className="col-md-3">
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>x</button>
        </div>
        <div className="col-md-3">
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>-</button>
        </div>
        <div className="col-md-3">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>+</button>
        </div>
    </div>
} 

class Calculatrice extends React.Component{

    render () {
        return <div>
            <ShowResult />
            <ShowNumberAndSymbol />
        </div>
    }
}

ReactDOM.render(<Calculatrice />, document.getElementById("cal"))