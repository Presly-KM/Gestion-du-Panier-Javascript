class Basket {                                                // On crée une classe Basket qui va nous permettre de gérer le panier
    constructor() {                                           // On crée le constructeur de la classe Basket. On va ici récupérer le panier du local storage et l'initialiser dans la classe
        let basket = localStorage.getItem("basket");          // On va chercher le panier dans le local storage. On utilise getitem pour récupérer le panier du local storage. On va stocker le panier dans une variable basket
        if (basket == null) {                                 // Si le panier est null (c'est à dire qu'il n'existe pas encore du au fait que quand l'utilisateur arrive sur le site,logiquement, il n'a pas encore eu à utiliser le panier, par exemple en ajoutant des produits à l'intérieur) on fait alors comprendre a la console que cela signifie que le panier est probablement vide.
            this.basket = [];                                 // On initialise le panier dans la classe à un tableau vide (c'est à dire qu'il n'y a pas de produits dans le panier) pour éviter d'avoir une erreur plus tard quand on va essayer de push un produit dans le panier. this.basket est le panier de la classe (c'est à dire que this.basket est le panier de l'utilisateur)
        } else {                                              // Sinon (c-à-dire si le panier existe déjà ) on va le récupérer et le transformer en tableau (cf ligne suivante)
            return JSON.parse(basket);                        // On va donc le parser (c'est à dire qu'on va le transformer en tableau) pour pouvoir l'utiliser dans la classe. On utilise JSON.parse pour transformer la chaine de caractères en tableau. On retourne le panier (this.basket) pour pouvoir l'utiliser dans la classe. 
        }
    }
}                                        

function saveBasket(basket) {                                 // Il permet d'enregistrer le panier dans le localStorage          
    localStorage.setItem('basket', JSON.stringify(basket));   // Lorsque on enregistre qqch dans le local storage on utilise setitem suivie d'une clé contenant une valeur : ici la clé est 'basket' et la valeur est basket (le panier). Problème dans le localstorage on ne peut pas enregistrer de données complexes (comme des tableaux ou des objets) on ne peut enregistrer que des chaines de caractères, des entiers etc du coup on est obligé d'utilsier la sérialisation (ça signifie qu'on passe une donnée complexe en une chaine de caractères)
}

function getBasket() {                                        // Il permet de récupérer le panier enregistré dans le localStorage
    
}

function addBasket(product) {                                 // On crée la fonction d'ajout au panier. Il permet d'ajouter un produit au panier. Il prend en paramètre le produit à ajouter. Permettra lorsqu'on appellera la focntion de dire : c'est ce produit là que je veux ajouter au panier.
    let basket = getBasket();                                 // On récupère le panier du local storage
    let foundProduct = basket.find(p => p.id = product.id);   // Est ce que le produit existe déjà dans le panier ? On cherche dans le panier s'il y'a un produit dont l'id est egal a l'id du produit qu'on veut ajouter dans le panier 
    if (foundProduct != undefined) {
        foundProduct.quantity++;                              // Si le produit est trouvé dans le panier, on va incrémenter la quantité de 1 (on va ajouter 1 à la quantité du produit trouvé dans le panier)
    } else {
        product.quantity = 1;                                 // Sinon (c'est à dire si le produit n'existe pas encore dans le panier) on va lui donner une quantité de 1 (on va ajouter le produit au panier avec une quantité de 1)
        basket.push(product);                                 // On va push/ajouter le produit (product) dans le panier (basket)
    }
    saveBasket(basket);                                       // Une fois qu'on a ajouté le produit dans le panier on enregistre le panier mis à jour dans le local storage
}


function removeFromBasket(product) {
    let basket = getBasket();                                 // On récupère le panier du local storage
    basket = basket.filter(p => p.id != product.id);          // On filtre le panier pour ne garder que les produits dont l'id est différent de l'id du produit qu'on veut supprimer (on va donc supprimer le produit du panier)
    saveBasket(basket);                                       // On enregistre le panier mis à jour dans le local storage
}

function changeQuantity(product, quantity) {
    let basket = getBasket();                                 // On récupère le panier du local storage
    let foundProduct = basket.find(p => p.id = product.id);   // On veut trouver le produit en question dans le panier. On cherche donc dans le panier s'il y'a un produit dont l'id est egal a l'id du produit qu'on veut modifier la quantité
    if (foundProduct != undefined) {                          // Si le produit est trouvé dans le panier, on va modifier sa quantité
        foundProduct.quantity += quantity;                    // On va donc ajouter la quantité(celle nouvellement entrée par l'utilisateur) à la quantité du produit trouvé dans le panier
       if(foundProduct.quantity <= 0) {                       // Si la quantité du produit est inférieure ou égale à 0 (c'est à dire que l'utilisateur a voulu supprimer le produit du panier) on va le supprimer du panier
            removeFromBasket(foundProduct);                   // On appelle la fonction removeFromBasket pour supprimer le produit du panier
        }
    }  
    saveBasket(basket);                                       // On enregistre le panier mis à jour dans le local storage

}

function getNumberProduct() {                                 // On crée la fonction qui va nous permettre de récupérer le nombre de produits dans le panier
    let basket = getBasket();                                 // On récupère le panier du local storage
    let number = 0;                                           // On initialise une variable number à 0 (c'est à dire qu'on va compter le nombre de produits dans le panier)
    for (let product of basket) {                             // On parcourt le panier (on va faire une boucle sur le panier)
        number += product.quantity;                           // On va ajouter la quantité de chaque produit dans le panier à la variable number (on va donc compter le nombre de produits dans le panier)
    }
    return number;                                            // On retourne le nombre de produits dans le panier
}

function getTotalPrice() {
    let basket = getBasket();                                 // On récupère le panier du local storage
    let total = 0;                                            // On initialise une variable totalPrice à 0 (c'est à dire qu'on va compter le prix total des produits dans le panier)
    for (let product of basket) {                             // On parcourt le panier (on va faire une boucle sur le panier)
        total += product.price * product.quantity;            // On va ajouter le prix de chaque produit multiplié par sa quantité à la variable totalPrice (on va donc compter le prix total des produits dans le panier)
    }
    return total;                                             // On retourne le prix total des produits dans le panier
}