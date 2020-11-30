import Cards from './cards';

export default class App {
    constructor() {
        this.cards = [];

        this.btnTrocaTela = document.getElementById('troca-tela');
        this.btnSalvar = document.getElementById('button-salvar');
        this.btnPesquisa = document.getElementById('button-pesquisa');
        this.btnRemove = document.getElementById('btn-remove');
        this.btnEdit = document.getElementById('btn-edit');

        this.editando = null;

        this.registrarEventos();
    }

    registrarEventos() {
        this.btnTrocaTela.onclick = (event) => this.trocaTela(event);
        this.btnSalvar.onclick = (event) => this.salvar(event);
        this.btnPesquisa.onkeyup = (event) => this.pesquisa(event);
        this.btnRemove.onclick = (event) => this.atribuirEventosRemove(event);
        this.btnEdit.onclick = (event) => this.atribuirEventosEdit(event);
      }

    trocaTela(event) {
        if (event) {
            event.preventDefault();
        }
    
        document.getElementsByClassName('list')[0].classList.toggle('d-none');
        document.getElementsByClassName('register')[0].classList.toggle('d-none');
    
        this.resetarFormulario();
        this.resetarCampos();
    }

    salvar(event) {
        event.preventDefault();
        let valido = true;
    
        this.resetarFormulario();
    
        if (this.titulo.value.length === 0 || this.titulo.value.length > 20) {
            this.titulo.classList.add('error');
            valido = false;
        }
    
        if (this.texto.value.length === 0) {
            this.texto.classList.add('error');
            valido = false;
        }
    
        if (this.autor.value.length === 0 || this.autor.value.length > 20) {
            this.autor.classList.add('error');
            valido = false;
        }
    
        if (valido === false) {
            document.getElementsByClassName('alert-danger')[0].classList.remove('d-none');
        } else {
    
            if(this.editando) {
                this.editar();
            } else {
                this.adicionar();
            }
    
            document.getElementsByClassName('alert-success')[0].classList.remove('d-none');
            this.resetarCampos()
        }
    }

    resetarFormulario() {
        this.titulo.classList.remove('error');
        this.texto.classList.remove('error');
        this.autor.classList.remove('error');
        document.getElementsByClassName('alert-danger')[0].classList.add('d-none');
        document.getElementsByClassName('alert-success')[0].classList.add('d-none');
    }

    resetarCampos() {
        this.titulo.value = "";
        this.texto.value = "";
        this.autor.value = "";
    }

    adicionar() {
        document.getElementsByClassName('row-empty')[0].classList.add('d-none');
        document.getElementsByClassName('row-cards')[0].classList.remove('d-none');
    
        document.getElementsByClassName('row-cards')[0].innerHTML += card.criarCard(new Cards());

        this.card.push(this.cards);
    
        this.atribuirEventos();
    }

    atribuirEventos() {

        for (let botao of document.getElementsByClassName('btn-remove')) {
            atribuirEventosRemove(botao);
        }
    
        for (let botao of document.getElementsByClassName('btn-edit')) {
            atribuirEventosEdit(botao);
        }
    }

    atribuirEventosRemove(botao) {

        botao.addEventListener('click', function(event) {
            event.preventDefault();
            this.parentNode.parentNode.parentNode.parentNode.remove();
    
            if (document.querySelectorAll('.row-cards .col-3').length === 0) {
                document.getElementsByClassName('row-empty')[0].classList.remove('d-none');
            }
        });
    }

    atribuirEventosEdit(botao) {

        botao.addEventListener('click', function(event) {
            event.preventDefault();
    
            this.trocarTela();
    
            this.editando = this.parentNode.parentNode.parentNode.parentNode;
            this.titulo.value = this.editando.getElementsByClassName('h2')[0].innerHTML.trim();
            this.texto.value = this.editando.getElementsByClassName('card-text')[0].innerHTML.trim();
            this.autor.value = this.editando.getElementsByClassName('text-muted')[0].innerHTML.trim();
    
        });
    }

    editar() {
        this.editando.getElementsByClassName('h2')[0].innerHTML = this.titulo.value;
        this.editando.getElementsByClassName('card-text')[0].innerHTML = this.texto.value;
        this.editando.getElementsByClassName('text-muted')[0].innerHTML = this.autor.value;
    
        this.editando = null;
    }

    pesquisa(event) {
        this.cards = document.getElementsByClassName('card');
    
        for (let card of cards) {
    
            if (!card.getElementsByClassName('card-title')[0].innerText.toUpperCase().includes(event.target.value.toUpperCase())) {
                card.parentNode.classList.add('d-none');
            } else {
                card.parentNode.classList.remove('d-none');
            }
    
            if (!card.getElementsByClassName('card-text')[0].innerText.toUpperCase().includes(event.target.value.toUpperCase())) {
                card.parentNode.classList.add('d-none');
            } else {
                card.parentNode.classList.remove('d-none');
            }
        }
    }
}

