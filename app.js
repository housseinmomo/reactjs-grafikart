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

function getDateNow(){

    const element = <div>
                        <h3 className="heure">Heure : {new Date().toLocaleTimeString()}</h3>
                    </div>
    ReactDOM.render(element, document.getElementById("heure"))
}

/* Même si nous créons à chaque seconde un élément décrivant l’arborescence complète de l’interface 
utilisateur, seul le nœud texte dont le contenu a été modifié est mis à jour par React DOM. */
setInterval(getDateNow, 1000);

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