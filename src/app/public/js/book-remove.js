let booksTable = document.querySelector('#livros');

booksTable.addEventListener('click', (event) => {
    let selectedElement = event.target;
    console.log(event.target);
    if (selectedElement.dataset.type == 'remocao') {
        let bookId = selectedElement.dataset.ref;
        fetch(`http://localhost:3000/livros/${bookId}`, { method: 'DELETE' })
            .then(resposta => {

                let tr = selectedElement.closest(`#livro_${bookId}`);
                tr.remove();

            })
            .catch(erro => console.log(erro));

    }

});