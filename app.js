let n = 0

// avec le JSX : on n'aura pas a utiliser la methode createElement(), on directement utiliser du code HTML
// pour que le JSX soit valide, il faut une  seule racine 
// avec react on utilise className au lieu de class 


function numberFormat(n){
    return n.toString().padStart(2, "0")
}

function render(){
    // creation de l'element h1
    const technos = [
        'php',
        'java',
        'nodejs'
    ]

    const lists = technos.map( (value, key) => <li key={key}>{value}</li> )

    const title = <React.Fragment> 
        <h1 className={"title-" + n}>Bonjour tout le monde <span>{numberFormat(n)}</span></h1>
        <h3>Liste de tehcnos</h3>
        <ul>{lists}</ul>
        </React.Fragment>

    // branchement de notre element dans le DOM
    ReactDOM.render(title, document.querySelector("#app"))
}

// on appelle cette fonction au chargement de la page
render()

window.setInterval( () =>{
    n++
    render()
}, 1000);

// un composant n'est rien d'autre qu'une fonctiin 

// composant wellcome va nous retourner un element
// c'est comme si on creer une nouvelle balise ? 
// C'est une approche fonctionnelle 
function WellcomeFunc({name, children}){
    return <div>
        <h1>Bonjour {name}</h1>
        <p>{children}</p>
    </div>
}

// approche orientee classes 
class Wellcome extends React.Component{

    constructor(props){
        super(props)
        console.log(props)
    }

    // nous retourner creer un element
    render(){
        return <div>
            <h1>Bonjour {this.props.name}</h1>
            <p>{this.props.children}</p>
        </div>
    }
}

class Clock extends React.Component{

    constructor(props){
        super(props)
        this.state = {date: new Date()}
        this.timer = null
    }


    // cycles de vie des components 

    componentDidMount(){
        this.timer = window.setInterval(this.tick.bind(this), 1000)
    }

    componentWillUnmount(){
        window.clearInterval(this.timer)
    }

    tick(){
        this.setState({date: new Date()})
    }

    // retourner l'element

    render(){
        return <div>
            Il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </div>
    }

}

class Incrementer extends React.Component{

    // props contient l'ensemble des params de notre component 
    constructor(props){
        super(props)
        this.state = {n : props.start, s: props.step, stateName: "start"} // un etat va nous permettre de conserver une valeur
        this.timer = null
        console.log(props)
    }

    componentDidMount(){
        this.timer = window.setInterval(this.tick.bind(this), 1000)
    }


    componentWillUnmount(){
        window.clearInterval(this.timer)
    }

    tick(){
        this.setState({n: this.state.n + this.state.s})
    }

    pause(){
        this.componentWillUnmount()
        this.state.stateName = "Pause"
    }

    render(){
        return <div>
            Incrementer : {this.state.n} 
            <button onClick={this.pause}>{stateName}</button>
        </div>
    }

}

class ManualIncrementer extends React.Component{

    constructor(props){
        super(props)
        this.state = {n: 0}
    }

    incrementer(){
        this.setState({n: this.state.n + 1}) // nous permet d'actualise la valeur de l'etat
    }

    render(){
        return <div>
            Valeur {this.state.n} <button onClick={incrementer.bind(this)}>Incrementer</button>
        </div>
    }


}


function Home(){

    //les composant sont reutilisable
    return <div>
        <Wellcome name="sakura" />
        <Wellcome name="hinata" />
        <Wellcome name="tsunade" />
        <Clock />
        <Incrementer start={0} step={10}/>
        <Incrementer start={100} step={10}/>
        <ManualIncrementer />
    </div>
}

const wellcome = <Wellcome name="Mugen">DBZ, c'est bien</Wellcome>

ReactDOM.render(<Home />, document.querySelector("#wellcome"))