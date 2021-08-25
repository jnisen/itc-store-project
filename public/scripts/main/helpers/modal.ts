const bgModal =  document.querySelector('.modal-bg')
const modalClose = document.querySelector('.modal-close')
const btnModalInput = <HTMLButtonElement>document.querySelector('.btn-modal')
const btnModal = <HTMLButtonElement>document.querySelector('.btn-add')
const btnEdit = <HTMLButtonElement>document.querySelector('.btn-edit')

btnModal.addEventListener('click', openModal)
modalClose.addEventListener('click', closeModal)

function openModal(){
    bgModal.classList.add('bg-active')
    btnEdit.style.display = 'none'
}

function closeModal(){
    bgModal.classList.remove('bg-active')
}