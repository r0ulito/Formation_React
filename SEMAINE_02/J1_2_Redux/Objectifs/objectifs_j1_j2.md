# Objectif J1 & J2

## chap1_redux.md

Partie 1 on introduit avec les deux Hooks useSelector & useDispatch la gestion du store Redux dans React.

Bien comprendre que le store est synchrone dans sa "mise à jour" fonction pure pas de mutation du store. La lecture du store est en lecture seule et déclenche le render, d'où l'importance de la copie renvoyez par le store pour que tout se passe bien. 

## chap2_combine_reducer_middleware

Un reducer seul n'est pas suffisant pour gérer la logique des données dans une application, il faut donc faire du Single Responsability Principal, un reducer par logique métier. On les combinera dans ce cas pour créer un store que l'on peut lire dans l'application de manière globale.

On introduira également la notion de middleware qui permet de décorer l'application d'une logique métier spécifique.

Les actions qui retourne des callback pour leurs actions ne fonctionnent pas par défaut dans Redux, qui a une logique synchrone pour "mettre à jour son store", on introduira donc le middleware thunk pour résoudre cette problématique. Bien présenter sa logique middleware qui permet de gérer ce point.
