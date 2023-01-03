let n = 0

// avec le JSX : on n'aura pas a utiliser la methode createElement(), on directement utiliser du code HTML
// pour que le JSX soit valide, il faut une  seule racine 
// avec react on utilise className au lieu de class 


function numberFormat(n){
    return n.toString().padStart(2, "0")
}

function formatName(user){
    if(user){return user.firstName + " " + user.lastName;}
    else{return "Monsieur ou Madame"}
}

const mugen = {
    firstName: "Abdoulfatah",
    lastName: "Houssein"
};

const element = <div>
                    <h2>Bonjour, {formatName(mugen)}</h2>
                    <h3>Content de vous voir ici</h3>
                </div>

ReactDOM.render(element, document.getElementById("mugen"));

// JSX vs createElement Function

const elementJSX = <h3 className="greeting">Hello avec JSX</h3>
const elementCEF = React.createElement("h3", {className: "greeting"}, 'Hello avec CEF')

// Babel compile JSX vers des appels à React.createElement() avant le rendu.

ReactDOM.render(elementJSX, document.getElementById("jsx"))
ReactDOM.render(elementCEF, document.getElementById("cef"))

class Clock extends React.Component{

    constructor(props){
        // Les composants à base de classe devraient toujours appeler le constructeur de base avec props.
        super(props)
        // etat locale de la classe
        this.state = {date: new Date()}
    }

    // méthodes de cycle de vie du composant : montage / demontage 

    // Cette methode est exécutée après que la sortie du composant a été injectée dans le DOM.
    componentDidMount() {
        // on appelle la fonction qui  permet de modifier la date a chaque seconde
        // Les fonctions fléchées sont souvent anonymes et ne sont pas destinées à être utilisées pour déclarer des méthodes.
        this.timerID = setInterval(() => this.tick(), 1000)
    }
  
    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick(){
        // on actualise la date qui se trouve au niveau de l'etat locale (state)
        // On va utiliser cette methode pour modifier nos etats locaux
        this.setState({
            date: new Date()
        });
    }


    // La méthode render sera appelée à chaque fois qu’une mise à jour aura lieu
    // tant que l’on exploite le rendu de <Clock /> dans le même nœud DOM, 
    //une seule instance de la classe clock sera utilisée.
    render(){
        return (
            <div>
                <h3 className="heure">Heure : {this.state.date.toLocaleTimeString()}</h3>
            </div>
        );
    }
}

ReactDOM.render( <Clock />, document.getElementById("heure"))



/* Même si nous créons à chaque seconde un élément décrivant l’arborescence complète de l’interface 
utilisateur, seul le nœud texte dont le contenu a été modifié est mis à jour par React DOM. */


function Wellcome(props){
    return "Bonjour " + props.name;
}

// Les composants peuvent s'imbriquer 
function Greeting(){
    return (
        <div>
            <h3>Greeting Lists</h3>
            <Wellcome name="mugen" /> <br />
            <Wellcome name="katakuri" /> <br />
            <Wellcome name="yamamoto" />
        </div>
    );
}

ReactDOM.render(<Greeting />, document.getElementById("wellcome"))

/*
    1. On appelle ReactDOM.render() avec l’élément <Welcome name="mugen" />.
    2. React appelle le composant Welcome avec comme props {name: 'mugen'}.
    3. Notre composant Welcome retourne un élément <h1>Bonjour mugen depuis la fonction-composant</h1> pour résultat.
    4. React DOM met à jour efficacement le DOM pour correspondre à <h1>Bonjour mugen depuis la fonction-composant </h1>.
*/

function render(){
    // creation de l'element h1
    const technos = [
        'python',
        'java',
        'js'
    ]

    const lists = technos.map( (value, key) => <li key={key}>{value}</li> )
    console.log(lists)

    const title = 
        <React.Fragment> 
            <h3>Liste de mes langages prefs : </h3>
            <ol>{lists}</ol>
        </React.Fragment>

    // branchement de notre element dans le DOM
    ReactDOM.render(title, document.querySelector("#app"))
}

// // on appelle cette fonction au chargement de la page
render()


// ----------------------- Evenement --------------------

class Compteur extends React.Component{

    constructor(props){
        super(props)
        this.state = {n: props.start, timer: null}
    }

    componentDidMount(){
        this.play()
    }

    componentWillUnmount(){
        window.clearInterval(this.state.timer)
    }

    incrementer(){
        this.setState(
            (state, props) => ({n: state.n + props.step})
        )
    }

    pause(event){
        console.log("pause...")
        window.clearInterval(this.state.timer)
        this.setState({timer: null})
    }

    play(event){
        console.log("play...")
        this.setState({
            timer: window.setInterval(this.incrementer.bind(this), 1000)
        })
    }

    toggle(){
        return this.state.timer ? this.pause() : this.play()
    }

    label(){
        return this.state.timer ? "pause" : "lecture"
    }

    reset(){
        console.log("reset...")
        this.pause()
        this.setState((state, props) => ({n: props.start}))
        this.play()
    }

    render(){
        return <div> <br/>
                    Valeur : {this.state.n} 
                    <button onClick={this.toggle.bind(this)}>{this.label()}</button>
                    <button onClick={this.reset.bind(this)}>reset</button>
                </div>
    }
}

ReactDOM.render(<Compteur start={0} step={1} />, document.getElementById("compteur"))


class ManualIncrementer extends React.Component{

    constructor(props){
        super(props)
        this.state = {n : 0}
    }

    incrementer(){
        this.setState(
            (state, props) => ({n : state.n + 1 })
        )
    }

    render(){
        return  <div> <br/>Valeur {this.state.n} <button onClick={this.incrementer.bind(this)}>incrementer</button> </div> 
    }
}

ReactDOM.render(<ManualIncrementer />, document.getElementById("incremental"))


// ----------------------- Formulaire --------------------

class Field extends React.Component{

    render () {

        const name = this.props.name 
        const value = this.props.value
        const onChange = this.props.onChange
        const children = this.props.children 

        return <div className="form-group">
            <label htmlFor={name}>{children}</label>
            <input type="text" id={name} name={name} value={value} onChange={onChange} className="form-control"></input>
        </div>

    }
}

class Checkbox extends React.Component{

    render () {
        const {name, value, onChange, children} = this.props
        
        return <div className="form-check">
            <input type="checkbox" id={name} name={name} checked={value} onChange={onChange} className="form-check-input" />
            <label htmlFor={name} className="form-check-label">{children}</label>
        </div>
    }
}

class Formulaire extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {nom: "", prenom: "", newsletter: false}
    }

    handleChange (event) {   
        const name = event.target.name 
        const type = event.target.type
        const value = type === "checkbox" ? event.target.checked : event.target.value
        this.setState({[name]: value})
    }

    handleSubmit (event) {
        event.preventDefault()
        const data = JSON.stringify(this.state)
        console.log(data)
        this.setState({nom: "", prenom: "", newsletter: false})
    }



    render () {
        return <form className="container" onSubmit={this.handleSubmit.bind(this)}>
            <h3>Formulaire d'abonnement</h3>
            <Field name="nom" value={this.state.nom} onChange={this.handleChange.bind(this)}>Nom</Field>
            <Field name="prenom" value={this.state.prenom} onChange={this.handleChange.bind(this)}>Prenom</Field>
            <Checkbox name="newsletter" value={this.state.newsletter} onChange={this.handleChange.bind(this)}>S'abonner a la newsletter</Checkbox>
            <div className="form-group">
                <button type="submit" className="btn btn-primary">Envoyer</button>
            </div>
            {JSON.stringify(this.state)}
        </form>
    }
}

ReactDOM.render(<Formulaire/>, document.getElementById("form"))

// ----------------------- TP1 React --------------------



// // un composant n'est rien d'autre qu'une fonction

// // composant wellcome va nous retourner un element
// // c'est comme si on creer une nouvelle balise ? 
// // C'est une approche fonctionnelle 
// function WellcomeFunc({name, children}){
//     return <div>
//         <h1>Bonjour {name}</h1>
//         <p>{children}</p>
//     </div>
// }

// // approche orientee classes 
// class Wellcome extends React.Component{

//     constructor(props){
//         super(props)
//         console.log(props)
//     }

//     // nous retourner creer un element
//     render(){
//         return <div>
//             <h1>Bonjour {this.props.name}</h1>
//             <p>{this.props.children}</p>
//         </div>
//     }
// }

// class Clock extends React.Component{

//     constructor(props){
//         super(props)
//         this.state = {date: new Date()}
//         this.timer = null
//     }


//     // cycles de vie des components 

//     componentDidMount(){
//         this.timer = window.setInterval(this.tick.bind(this), 1000)
//     }

//     componentWillUnmount(){
//         window.clearInterval(this.timer)
//     }

//     tick(){
//         this.setState({date: new Date()})
//     }

//     // retourner l'element

//     render(){
//         return <div>
//             Il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
//         </div>
//     }

// }

// class Incrementer extends React.Component{

//     // props contient l'ensemble des params de notre component 
//     constructor(props){
//         super(props)
//         this.state = {n : props.start, s: props.step} // un etat va nous permettre de conserver une valeur
//         this.timer = null
//         console.log(props)
//     }

//     componentDidMount(){
//         this.timer = window.setInterval(this.tick.bind(this), 1000)
//     }


//     componentWillUnmount(){
//         window.clearInterval(this.timer)
//     }

//     tick(){
//         this.setState({n: this.state.n + this.state.s})
//     }

//     pause(){
//         this.componentWillUnmount()
//         // this.state.stateName = "Pause"
//     }

//     render(){
//         return <div>
//             Incrementer : {this.state.n} 
//             <button onClick={this.pause}>Pause</button>
//         </div>
//     }

// }

// class ManualIncrementer extends React.Component{

//     constructor(props){
//         super(props)
//         this.state = {n: 0} 
//     }

//     incrementer(){
//         this.setState({n: this.state.n + 1}) // nous permet d'actualise la valeur de l'etat
//     }

//     render(){
//         return <div>
//             Valeur {this.state.n} <button onClick={this.incrementer.bind(this)}>Incrementer</button>
//         </div>
//     }


// }


// function Home(){

//     //Les composant sont reutilisable
//     // On peut egalement les imbriquer 
//     return <div>
//                 <Wellcome name="sakura" />
//                 <Wellcome name="hinata" />
//                 <Wellcome name="tsunade" />
//                 <Clock />
//                 <Incrementer start={0} step={10}/>
//                 <Incrementer start={100} step={10}/>
//                 <ManualIncrementer />
//             </div>
// }

// const wellcome = <Wellcome name="Mugen">DBZ, c'est bien</Wellcome>

// ReactDOM.render(<Home />, document.querySelector("#wellcome"))