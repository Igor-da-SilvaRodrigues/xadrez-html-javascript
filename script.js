//chadrez em javascript/html

function criarUnidade(peca, cor){
    let icone;
    let valmov;        
    switch(peca){
        case "torre":
            if (cor == 'branco'){
                icone = 'r';
            }else{
                icone = 't';
            }
            valmov = function(tabuleiroAntigo, TabuleiroNovo){

            }
            break;
        case "cavalo":
            if (cor == 'branco'){
                icone = 'h';
            }else{
                icone = 'j';
            }
            valmov = function(tabuleiroAntigo, TabuleiroNovo){
                
            }
            break;
        case "bispo":
            if (cor == 'branco'){
                icone = 'b';
            }else{
                icone = 'n';
            }
            valmov = function(tabuleiroAntigo, TabuleiroNovo){
                
            }
            break;
        case "rainha":
            if (cor == 'branco'){
                icone = 'q';
            }else{
                icone = 'w';
            }
            valmov = function(tabuleiroAntigo, TabuleiroNovo){
                
            }
            break;
        case "rei":
            if (cor == 'branco'){
                icone = 'k';
            }else{
                icone = 'l';
            }
            valmov = function(tabuleiroAntigo, TabuleiroNovo){
                
            }
            break;
        case "peao":
            if (cor == 'branco'){
                icone = 'p';
            }else{
                icone = 'o';
            }
            valmov = function(tabuleiroAntigo, TabuleiroNovo){
                
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

//#region DECLARAÇÕES
let TORRE_PRETA = criarUnidade("torre", "preto");
let CAVALO_PRETO = criarUnidade("cavalo", "preto");
let BISPO_PRETO = criarUnidade("bispo", "preto");
let RAINHA_PRETA = criarUnidade("rainha", "preto");
let REI_PRETO = criarUnidade("rei", "preto");
let PEAO_PRETO = criarUnidade("peao", "preto");

let TORRE_BRANCA = criarUnidade("torre", "branco");
let CAVALO_BRANCO = criarUnidade("cavalo", "branco");
let BISPO_BRANCO = criarUnidade("bispo", "branco");
let RAINHA_BRANCA = criarUnidade("rainha", "branco");
let REI_BRANCO = criarUnidade("rei", "branco");
let PEAO_BRANCO = criarUnidade("peao", "branco");
let selecao = undefined;
let destino = undefined;
//#endregion

function getTabuleiro(){ // retorna um conjunto de 8 linhas
    return document.getElementsByTagName("tr");
}

/*//#region codigo aparentemente desnecessário
function setTabuleiro(tabuleiro){

    aparentemente `document.getElementsByTagName()` retorna os elementos "AO VIVO", o que provavelmente significa que ele retorna um ponteiro.
    então eu não devo precisar de um metodo `set`

}
*///#endregion

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

function temPeca(casa){
    
    if (casa.innerHTML == '' || casa.innerHTML.length>=2){
        return false;
    }else{
        return true;
    }
}

function selecionar(linha, coluna){

    let casa = getCasa(linha, coluna);

    let tempeca = temPeca(casa);
    if (selecao == undefined){
        if (tempeca){
            selecao = casa;
            selecao.style.boxShadow = "inset 6px 6px 12px rgba(0, 0, 0, 0.7)";
            console.log(`(${linha},${coluna}) selected`);
        }
    }else if(destino == undefined){
        if (!tempeca){
            destino = casa;
            console.log(`(${linha},${coluna}) set as target\nmoving...`);
            moverPeca(selecao, destino);
            cleanSelection();
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
    //let valides = validarMovimento(selecao, destino);
    
    simbolo = selecao.innerHTML;
    selecao.innerHTML = '';
    destino.innerHTML = simbolo;
}

function validarMovimento(from, to){
    let pecas = {
        torre: [TORRE_BRANCA, TORRE_PRETA],
        cavalo: [CAVALO_BRANCO, CAVALO_PRETO],
        bispo: [BISPO_BRANCO, BISPO_PRETO],
        rainha: [RAINHA_BRANCA, RAINHA_PRETA],
        rei: [REI_BRANCO, REI_PRETO],
        peao: [PEAO_BRANCO, PEAO_PRETO]
    }


    
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
            //selecionar(tds[i].parentElement.id[1], tds[i].classList[tds[i].classList.length-1]);
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
