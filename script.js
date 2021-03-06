//chadrez em javascript/html

function criarUnidade(peca, cor){
    let icone;
    let valmov;        
    switch(peca){
        case "torre":
            if (cor == BRANCO){
                icone = 'r';
            }else{
                icone = 't';
            }
            valmov = function(selecao, destino){
                
                let linha_selecao = Number(selecao.parentElement.id[1]);
                let linha_destino = Number(destino.parentElement.id[1]);
                
                let col_selecao = selecao.classList[selecao.classList.length-1];
                let col_destino = destino.classList[destino.classList.length-1];

                if(col_destino == col_selecao){//movendo verticalmente
                    
                    if (linha_destino < linha_selecao){ // movendo para cima
                        let a = linha_selecao-1;

                        while(a > linha_destino){
                            
                            if (temPeca(getCasa(a, col_selecao))){return false;}

                            a = a - 1;
                        }
                    }else{ //movento para baixo
                        let a = linha_selecao+1;

                        while(a < linha_destino){
                            
                            if (temPeca(getCasa(a, col_selecao))){return false;}

                            a = a + 1;
                        }
                    }

                    return true;
                }

                if( linha_selecao == linha_destino ){//movendo lateralmente
                    let colunas = "abcdefgh";
                    let indice_selecao = colunas.indexOf(col_selecao);
                    let indice_destino = colunas.indexOf(col_destino);

                    if (indice_destino < indice_selecao){//movendo para a esquerda 
                        let a = indice_selecao-1;
                        while(a > indice_destino){
                            if (temPeca(getCasa(linha_selecao, colunas[a]))){return false;}
                            a = a - 1;
                        }
                    }else{//movendo para a direita
                        let a = indice_selecao+1;
                        while(a < indice_destino){
                            if (temPeca(getCasa(linha_selecao, colunas[a]))){return false;}
                            a = a + 1;
                        }
                    }
                    
                    return true;
                }
                return false;
            }
            break;
        case "cavalo":
            if (cor == BRANCO){
                icone = 'h';
            }else{
                icone = 'j';
            }
            valmov = function(selecao, destino){
                //+-2 linha e +-1 coluna OU +-1 linha e +-2 coluna
                let colunas = "abcdefgh";
                                
                let linha_selecao = Number(selecao.parentElement.id[1]); //linha
                let coluna_selecao = selecao.classList[selecao.classList.length-1]; // coluna
                
                let linha_destino = Number(destino.parentElement.id[1]); //linha
                let coluna_destino = destino.classList[destino.classList.length-1]; // coluna
                
                if (linha_destino == linha_selecao + 2 || linha_destino == linha_selecao - 2){
                    if (coluna_destino == colunas[colunas.indexOf(coluna_selecao)+1] || coluna_destino == colunas[colunas.indexOf(coluna_selecao)-1]){
                        return true;
                    }
                }

                if (linha_destino == linha_selecao + 1 || linha_destino == linha_selecao - 1){
                    if (coluna_destino == colunas[colunas.indexOf(coluna_selecao)+2] || coluna_destino == colunas[colunas.indexOf(coluna_selecao)-2]){
                        return true;
                    }
                }

                return false;

            }
            break;
        case "bispo":
            if (cor == BRANCO){
                icone = 'b';
            }else{
                icone = 'n';
            }
            valmov = function(selecao, destino){
                
                let linha_selecao = Number(selecao.parentElement.id[1]);
                let linha_destino = Number(destino.parentElement.id[1]);

                let col_selecao = selecao.classList[selecao.classList.length-1];
                let col_destino = destino.classList[destino.classList.length-1];

                let colunas = "abcdefgh";
                let indice_col_selecao = colunas.indexOf(col_selecao);
                let indice_col_destino = colunas.indexOf(col_destino);

                let diferenca_linha_selecao_destino = linha_selecao - linha_destino;
                let diferenca_coluna_selecao_destino = indice_col_selecao - indice_col_destino;
                
                //o bispo so pode se mover em uma diagonal, e como no xadrez a unica diagonal ?? sempre 45??, a dist??ncia movida nas linhas ?? sempre igual a das colunas.
                // a diferenca esta sendo elevada ao quadrado para descosiderar numeros negativos.
                if (diferenca_linha_selecao_destino * diferenca_linha_selecao_destino == diferenca_coluna_selecao_destino * diferenca_coluna_selecao_destino){

                    
                    if (linha_destino > linha_selecao){ //movendo para baixo
                        
                        if (indice_col_destino > indice_col_selecao){ //movendo inferior direito
                            let a = [linha_selecao + 1, indice_col_selecao + 1];
                            
                            while (linha_destino > a[0]){
                                if (temPeca(getCasa(a[0], colunas[a[1]]))){return false;}

                                a = [a[0] + 1, a[1] + 1];
                            }


                        } else { //movendo inferior esquerdo
                            let a = [linha_selecao + 1, indice_col_selecao - 1];
                            
                            while (linha_destino > a[0]){
                                if (temPeca(getCasa(a[0], colunas[a[1]]))){return false;}

                                a = [a[0] + 1, a[1] - 1];
                            }
                        }
                    } else { //movendo para cima

                        if (indice_col_destino > indice_col_selecao){ //movendo superior direito
                            let a = [linha_selecao - 1, indice_col_selecao + 1];

                            while (linha_destino < a[0]){
                                if (temPeca(getCasa(a[0], colunas[a[1]]))){return false;}
                                a = [a[0] - 1, a[1] + 1];
                            }
                        } else { //movendo superior esquerdo
                            let a = [linha_selecao - 1, indice_col_selecao - 1];

                            while (linha_destino < a[0]){
                                if (temPeca(getCasa(a[0], colunas[a[1]]))){return false;}
                                a = [a[0] - 1, a[1] - 1];
                            }
                        }
                    }

                    return true;
                }
                
                return false;
            }
            break;
        case "rainha":
            if (cor == BRANCO){
                icone = 'q';
            }else{
                icone = 'w';
            }
            valmov = function(selecao, destino){
                return TORRE_BRANCA.validarMovimento(selecao, destino) || BISPO_BRANCO.validarMovimento(selecao, destino);
            }
            break;
        case "rei":
            if (cor == BRANCO){
                icone = 'k';
            }else{
                icone = 'l';
            }
            valmov = function(selecao, destino){
                let linha_selecao = Number(selecao.parentElement.id[1]);
                let linha_destino = Number(destino.parentElement.id[1]);

                let col_selecao = selecao.classList[selecao.classList.length-1];
                let col_destino = destino.classList[destino.classList.length-1];

                let colunas = "abcdefgh";
                let indice_col_selecao = colunas.indexOf(col_selecao);
                let indice_col_destino = colunas.indexOf(col_destino);

                let delta_linha = linha_selecao - linha_destino;
                let delta_coluna = indice_col_selecao - indice_col_destino;

                delta_linha = delta_linha * delta_linha;
                delta_coluna = delta_coluna * delta_coluna;

                return (delta_linha <= 1 && delta_coluna  <= 1);  
            }
            break;
        case "peao":
            if (cor == BRANCO){
                icone = 'p';
            }else{
                icone = 'o';
            }
            valmov = function(selecao, destino){
                let linha_selecao = Number(selecao.parentElement.id[1]);
                let linha_destino = Number(destino.parentElement.id[1]);
                let col_selecao = selecao.classList[selecao.classList.length-1];
                let col_destino = destino.classList[destino.classList.length-1];


                let max_delta_linha = 1; // define o movimento vertical maximo do pe??o

                if (linha_selecao == 1 || linha_selecao == 6 && !selecao.classList.contains('usado')  ){
                    max_delta_linha = 2;
                    
                    selecao.classList.replace(col_selecao, 'usado');
                    selecao.classList.add(col_selecao);
                }



                let colunas = "abcdefgh";
                let indice_col_selecao = colunas.indexOf(col_selecao); 
                let indice_col_destino = colunas.indexOf(col_destino);

                let delta_linha = linha_selecao - linha_destino;// <0 = movendo para baixo, >0 = para cima
                let delta_coluna = indice_col_selecao - indice_col_destino;//<0 movendo para direita, >0 = para esquerda

                if ( col_selecao == col_destino ){//movendo verticalmente
                    if (Math.abs(delta_linha) <= max_delta_linha){ //o movimento vertical deve <=maximo
                        if (delta_linha < 0 && cor == PRETO || delta_linha > 0 && cor == BRANCO){
                            if (!temPeca(destino)){
                                return true;
                            }
                        }
                    }
                } else if (temPeca(destino)){ // movimento diagonal somente se tiver oposi????o no destino
                    if (Math.abs(delta_coluna) <= 1 && Math.abs(delta_linha) == 1){//movimento diagonal n??o pode se mover lateralmente mais que uma casa e ?? obrigado a se mover uma casa para frente.
                        if (delta_linha < 0 && cor == PRETO || delta_linha > 0 && cor == BRANCO){
                            return true;
                        }
                    }
                }

                return false;
            }
            break;
    }
    
    return {
        equipe: cor,
        tipo: peca,
        validarMovimento: valmov,
        simbolo: icone
    };
    
};

//#region DECLARA????ES
let BRANCO = "branco";
let PRETO = "preto";
let TORRE_PRETA = criarUnidade("torre", PRETO);
let CAVALO_PRETO = criarUnidade("cavalo", PRETO);
let BISPO_PRETO = criarUnidade("bispo", PRETO);
let RAINHA_PRETA = criarUnidade("rainha", PRETO);
let REI_PRETO = criarUnidade("rei", PRETO);
let PEAO_PRETO = criarUnidade("peao", PRETO);

let TORRE_BRANCA = criarUnidade("torre", BRANCO);
let CAVALO_BRANCO = criarUnidade("cavalo", BRANCO);
let BISPO_BRANCO = criarUnidade("bispo", BRANCO);
let RAINHA_BRANCA = criarUnidade("rainha", BRANCO);
let REI_BRANCO = criarUnidade("rei", BRANCO);
let PEAO_BRANCO = criarUnidade("peao", BRANCO);
let selecao = undefined;
let destino = undefined;
let jogador = BRANCO;
//#endregion

function getTabuleiro(){ // retorna um conjunto de 8 linhas
    return document.getElementsByTagName("tr");
}


//prepara um tabuleiro para um novo jogo
function prepararTabuleiro(tabuleiro){

    let linha_1 = tabuleiro[0];//to-ca-bi-ra-re-bi-ca-to
    let linha_2 = tabuleiro[1];//pe-pe-pe-pe-pe-pe-pe-pe

    let linha_7 = tabuleiro[6];//pe-pe-pe-pe-pe-pe-pe-pe
    let linha_8 = tabuleiro[7];//to-ca-bi-ra-re-bi-ca-to


    for (i in linha_2.children){
        linha_2.children[i].innerHTML = PEAO_PRETO.simbolo;
        
        linha_7.children[i].innerHTML = PEAO_BRANCO.simbolo;
    }

    let pecasordenadasbrancas = [TORRE_BRANCA.simbolo, CAVALO_BRANCO.simbolo, BISPO_BRANCO.simbolo, RAINHA_BRANCA.simbolo, REI_BRANCO.simbolo, BISPO_BRANCO.simbolo, CAVALO_BRANCO.simbolo, TORRE_BRANCA.simbolo];

    let pecasordenadaspretas = [TORRE_PRETA.simbolo, CAVALO_PRETO.simbolo, BISPO_PRETO.simbolo, RAINHA_PRETA.simbolo, REI_PRETO.simbolo, BISPO_PRETO.simbolo, CAVALO_PRETO.simbolo, TORRE_PRETA.simbolo];

    for (i in linha_1.children) {
        linha_1.children[i].innerHTML = pecasordenadaspretas[i];

        linha_8.children[i].innerHTML = pecasordenadasbrancas[i];
    }

}

function getCasa(linha, coluna){

    let alvo = document.querySelector(`#l${linha}`);
    
    for (i in alvo.children){
        if (alvo.children[i].classList.contains(coluna)){
            alvo = alvo.children[i];
            return alvo;
        }
    }
    return undefined;
}

function getPecaDaCasa(casa){
    let pecas = [TORRE_BRANCA, CAVALO_BRANCO, BISPO_BRANCO, RAINHA_BRANCA, REI_BRANCO, PEAO_BRANCO, TORRE_PRETA, CAVALO_PRETO, BISPO_PRETO, RAINHA_PRETA, REI_PRETO, PEAO_PRETO];

    for (i in pecas){
        if (pecas[i].simbolo == casa.innerHTML){
            return pecas[i];
        }
    }
    return undefined;
}

function temPeca(casa){
    
    if (casa.innerHTML == '' || casa.innerHTML.length>=2){
        return false;
    }else{
        return true;
    }
}

function selecionar(linha, coluna){

    let casa = getCasa(linha, coluna);
    let peca = getPecaDaCasa(casa);

    

    let tempeca = temPeca(casa);
    if (selecao == undefined){
        if (tempeca && peca.equipe == jogador){
            selecao = casa;
            selecao.style.boxShadow = "inset 3px 3px 6px rgba(0, 0, 0, 0.7)";
            console.log(`(${linha},${coluna}) selected`);
        }
    }else if(destino == undefined){
        if (!tempeca || peca.equipe != jogador){
            destino = casa;
            console.log(`(${linha},${coluna}) set as target\nmoving...`);
            if(moverPeca(selecao, destino)){
                passarVez();
                cleanSelection();
            }else{
                destino = undefined;
            }
            
        }else{
            cleanSelection();
            selecionar(linha, coluna);
        }
    }else{
        cleanSelection();
    }
}

function moverPeca(selecao, destino){
    let simbolo;
    let valides = validarMovimento(selecao, destino);
    if (valides){
        simbolo = selecao.innerHTML;
        selecao.innerHTML = '';
        destino.innerHTML = simbolo;
        
    }else{
        console.log('movimento invalido');
    }

    return valides;
}

function validarMovimento(selecao, destino){
    let peca = getPecaDaCasa(selecao);
    let retorno =  peca.validarMovimento(selecao, destino);
    if ((peca == PEAO_BRANCO && destino.parentElement.id[1] == '0' || peca == PEAO_PRETO && destino.parentElement.id[1] == '7') && retorno){
        selecao.innerHTML = promoverPeao(selecao);
    }
    return retorno;    
}

function promoverPeao(selecao){
    let userInput
    let pecasvalidas = ['rainha', 'torre', 'bispo', 'cavalo'];

    let pecasbrancas = [RAINHA_BRANCA.simbolo, TORRE_BRANCA.simbolo, BISPO_BRANCO.simbolo, CAVALO_BRANCO.simbolo, REI_BRANCO.simbolo, PEAO_BRANCO.simbolo];

    let pecaspretas = [RAINHA_PRETA.simbolo, TORRE_PRETA.simbolo, BISPO_PRETO.simbolo, CAVALO_PRETO.simbolo, REI_PRETO.simbolo, PEAO_PRETO.simbolo];
    
    let cordopeao = undefined;

    if (pecasbrancas.includes( selecao.innerHTML )){
        cordopeao = BRANCO;
    } else if (pecaspretas.includes( selecao.innerHTML )){
        cordopeao = PRETO;
    }

    do {
        userInput = prompt('Para qual pe??a voc?? deseja promover este pe??o?');
    } while ( userInput == null || !pecasvalidas.includes( userInput.toLowerCase() ) );
    

       
    return criarUnidade(userInput, cordopeao).simbolo;
}

window.onload = function () {
    let tabuleiro =  getTabuleiro();
    prepararTabuleiro(tabuleiro);

    let tds = document.getElementsByTagName('td');
    for (i in tds){
        
        if (i.length<=2){
            
            let td_linha = tds[i].parentElement.id[1];
            let td_coluna = tds[i].classList[tds[i].classList.length-1];
            

            tds[i].addEventListener('click', function(){
                selecionar(td_linha, td_coluna);  
            });
            console.log(`added event listener to (${td_linha},${td_coluna})`); 
            
        }else{
            console.log(`failed to add event listener to \"${i}\"`);
        }
    }

}

function cleanSelection(){
    selecao.style.boxShadow = "";
    console.log('cleaning selection');
    selecao = undefined;
    destino = undefined;
    
}

function passarVez(){
    let footer = document.querySelector('footer');
    let painel = document.querySelector('jogador');
    if (jogador == BRANCO){
        jogador = PRETO;
        footer.style.backgroundColor = "var(--black-color)";
        footer.style.color = "var(--white-color)";
        footer.style.border = "2px solid beige"
        painel.innerHTML = PRETO.toUpperCase();

    }else{
        jogador = BRANCO;
        footer.style.backgroundColor = "var(--white-color)";
        footer.style.color = "var(--black-color)";
        footer.style.border = "2px solid var(--black-color)"
        painel.innerHTML = BRANCO.toUpperCase();

    }

    
}
