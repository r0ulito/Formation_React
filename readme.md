# Progamme

Structure des dossiers du support de cours :

- Un dossier par jour J1 avec son titre.

- Un dossier MODELS qui contient des modèles à utiliser dans certains exerices.

- Un dossier Rappels pour rappeler des notions de cours.

- Un dossier 

On commence avec les classes et J4 on passe au fonctionel et aux Hooks.

La CRA est présenté dans le Challenge 02

## J1 introduction

- Présentation de la librairie et sa philosophie abstraction avec DOM virtuel, Top/Down 

- des props non-mutable, état local des states sont vues à travers de petits exos. 

Ne pas lire le cours avec eux, mais expliquer les notions avec des exemples. Laissez du temps pour faire les exercices.

Créez des groupes de 2 personnes ou 1 personne si il le souhaite et mettez-les dans des salons sur Discord. Passez les voir pour les aider et répondre aux questions.

- Challenge, voir sujet_01

## J2 Life Cycle & Gestion Event

- Présentation du cycle de vie, voici les méthodes du cycle de vie nous présentons. On revoit cela en J4 avec useEffect

```js
// 1. Constructor
constructor(props){
    // ...
}

// 2. render
render(){
    
    
    return(
        <p>Hello World ! </p>
    );
}

// 3. 
componentDidMount(){
    // ...
}

//  démontage
componentWillUnmount(){
    // ...
}

// watch prev des props & states 
componentDidUpdate(prevProps, prevStates) {
    // condition !
}
```

- Gestion des événements, les formulaires sont présentés J3

- Challenge, voir sujet_02 PRESENTATION DE LA CRA, & un webpack "maison", on fera le choix de la CRA.


## J3 Form & lifting state up

- contrôle des champs d'un formulaire, et remonté de l'état à son parent direct.

## J4 Hooks

Maintenant on code les composants en mode fonctionnel. On utilise donc les Hooks pour ré-importer les fonctionnalités de la librairie de manière ciblée.

- useState

- useEffect

- useRef

## J5 Redux (principe de bases)
