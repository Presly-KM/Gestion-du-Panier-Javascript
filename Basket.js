function saveBasket(basket) {                                  // Il permet d'enregistrer le panier dans le localStorage          
    localStorage.setItem('basket', JSON.stringify(basket));    // Lorsque on enregistre qqch dans le local storage on utilise setitem suivie d'une clé contenant une valeur : ici la clé est 'basket' et la valeur est basket (le panier). Problème dans le localstorage on ne peut pas enregistrer de données complexes (comme des tableaux ou des objets) on ne peut enregistrer que des chaines de caractères, des entiers etc du coup on est obligé d'utilsier la sérialisation (ça signifie qu'on passe une donnée complexe en une chaine de caractères)
}

function getBasket() {                                         // Il permet de récupérer le panier enregistré dans le localStorage
    let basket = localStorage.getItem("basket");               // On va chercher le panier dans le local storage. On utilise getitem pour récupérer le panier du local storage. On va stocker le panier dans une variable basket
    if (basket == null) {                                      // Si le panier est null (c'est à dire qu'il n'existe pas encore du au fait que quand l'utilisateur arrive sur le site,logiquement, il n'a pas encore eu à utiliser le panier, par exemple en ajoutant des produits à l'intérieur) on fait alors comprendre a la console que cela signifie que le panier est probablement vide.
        return [];                                             // On retourne un tableau vide (c'est à dire qu'il n'y a pas de produits dans le panier) pour éviter d'avoir une erreur plus tard quand on va essayer de push un produit dans le panier. 
    } else {                                                   // Sinon (c-à-dire si le panier existe déjà ) on va le récupérer et le transformer en tableau (cf ligne suivante)
        return JSON.parse(basket);                             // ATTENTION : Plus haut on a enregistré en veillant a sérialiser les données ,maintenant qu'il s'agit de récupérer les données sauvegardées, on doit utiliser JSON.Parse ce qui va permettre de transformer la chaine de caractère à nouveau en objet/tableau/données complexes. On utilise getitem pour récupérer le panier du local storage. On retourne le panier récupéré du local storage
    }
}

function addBasket(product) {                                  // On crée la fonction d'ajout au panier. Il permet d'ajouter un produit au panier. Il prend en paramètre le produit à ajouter. Permettra lorsqu'on appellera la focntion de dire : c'est ce produit là que je veux ajouter au panier.
    let basket = getBasket();                                  // On récupère le panier du local storage
    let foundProduct = basket.find(p => p.id = product.id);     // Est ce que le produit existe déjà dans le panier ? On cherche dans le panier s'il y'a un produit dont l'id est egal a l'id du produit qu'on veut ajouter dans le panier 
    if (foundProduct != undefined) {
        foundProduct.quantity++;                               // Si le produit est trouvé dans le panier, on va incrémenter la quantité de 1 (on va ajouter 1 à la quantité du produit trouvé dans le panier)
    } else {
        product.quantity = 1;                                  // Sinon (c'est à dire si le produit n'existe pas encore dans le panier) on va lui donner une quantité de 1 (on va ajouter le produit au panier avec une quantité de 1)
        basket.push(product);                                  // On va push/ajouter le produit (product) dans le panier (basket)
    }
    saveBasket(basket);                                        // Une fois qu'on a ajouté le produit dans le panier on enregistre le panier mis à jour dans le local storage
}


function removeFromBasket(product) {
    let basket = getBasket();                                  // On récupère le panier du local storage
    basket = basket.filter(p => p.id != product.id);           // On filtre le panier pour ne garder que les produits dont l'id est différent de l'id du produit qu'on veut supprimer (on va donc supprimer le produit du panier)
    saveBasket(basket);                                        // On enregistre le panier mis à jour dans le local storage
}

function changeQuantity(product, quantity) {
    let basket = getBasket();                                  // On récupère le panier du local storage
    let foundProduct = basket.find(p => p.id = product.id);    // On veut trouver le produit en question dans le panier. On cherche donc dans le panier s'il y'a un produit dont l'id est egal a l'id du produit qu'on veut modifier la quantité
    if (foundProduct != undefined) {                           // Si le produit est trouvé dans le panier, on va modifier sa quantité
        foundProduct.quantity += quantity;                     // On va donc ajouter la quantité(celle nouvellement entrée par l'utilisateur) à la quantité du produit trouvé dans le panier
    }  
    saveBasket(basket);                                        // On enregistre le panier mis à jour dans le local storage

}