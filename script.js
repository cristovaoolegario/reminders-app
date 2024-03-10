// Se data não existe, criar o elemento na lista de lembretes
// Se data já existe, criar o elemento dentro do item de lembretes da data em questão

var lista_lembretes = [
  { data: new Date("2000-02-01"), lembretes: ["lembrete 3"] },
  { data: new Date("2001-02-01"), lembretes: ["lembrete 4"] },
  { data: new Date("1999-12-01"), lembretes: ["lembrete 1", "lembrete 2"] },
];

document.addEventListener("DOMContentLoaded", function () {
  ordenarLista(lista_lembretes);
  removerElementosListaHTML();
  renderizarElementosLista(lista_lembretes);
  lista_lembretes.push({
    data: new Date("1998-12-01"),
    lembretes: ["lembrete 5", "lembrete 6"],
  });

  ordenarLista(lista_lembretes);
});

function ordenarLista(lista) {
  lista.sort(function (a, b) {
    return a.data.getTime() - b.data.getTime();
  });
  console.log(lista);
}

function removerElementosListaHTML() {
  const ul = document.getElementById("lista");
  ul.innerText = "";
}

function renderizarElementosLista(lista) {
  const listaData = document.getElementById("lista");

  lista.forEach((element) => {
    let itemData = document.createElement("li");
    itemData.innerText = element.data;
    let listaLembretes = document.createElement("ul");

    element.lembretes.forEach((lembrete) => {
      let itemlembrete = document.createElement("li");
      itemlembrete.innerText = lembrete;
      listaLembretes.appendChild(itemlembrete);
    });

    itemData.appendChild(listaLembretes);
    listaData.appendChild(itemData);
  });
}
