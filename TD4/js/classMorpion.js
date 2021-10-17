export class Morpion {

    static MAX_GRILLE = 8;
    static MIN_GRILLE = 3;
    #taille;
    #table;

    constructor(taille) {
        this.#taille = taille;

        if (Number.isNaN(taille) || taille < Morpion.MIN_GRILLE || taille > Morpion.MAX_GRILLE) {
            throw new Error('Taille invalide !');
        } else {
            this.#recommence();
        }

    }

    get taille() {
        return this.#taille;
    }

    get table() {
        return this.#table;
    }

    #recommence() {
        this.#table = new Array(this.#taille);

        for (let i = 0; i < this.#taille; i++) {
            this.#table[i] = new Array(this.#taille);

            for (let j = 0; j < this.#taille; j++) {
                this.#table[i][j] = ' ';
            }
        }
    }

    clicBouton(symbole, y, x) {
        if (this.#table[y][x] === ' ') {
            this.#table[y][x] = symbole;
            return true;
        } else
            return false;
    }

    aGagne(symbole, y, x) {

        let nbSymboles;

        // gagné en ligne 
        const ligne = y;
        nbSymboles = 0;
        for (let col = 0; col < this.#taille; col++) {
            if (this.#table[ligne][col] === symbole) {
                nbSymboles++;
            }
        }
        if (nbSymboles === this.#taille) {
            return true;
        }

        // gagné en colonne 
        const col = x;
        nbSymboles = 0;
        for (let ligne = 0; ligne < this.#taille; ligne++) {
            if (this.#table[ligne][col] === symbole) {
                nbSymboles++;
            }
        }
        if (nbSymboles === this.#taille) {
            return true;
        }

        // gagné diagonale
        if (x === y) {
            nbSymboles = 0;
            for (let lc = 0; lc < this.#taille; lc++) {
                if (this.#table[lc][lc] === symbole) {
                    nbSymboles++;
                }
            }
            if (nbSymboles === this.#taille) {
                return true;
            }
        }

        // gagné diagonale inverse
        if (x === this.#taille - (y + 1)) {
            nbSymboles = 0;
            for (let ligne = 0; ligne < this.#taille; ligne++) {
                if (this.#table[ligne][this.#taille - (ligne + 1)] === symbole) {
                    nbSymboles++;
                }
            }
            if (nbSymboles === this.#taille) {
                return true;
            }
        }

        return false;
    }
}