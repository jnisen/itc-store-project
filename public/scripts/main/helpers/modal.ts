const bgModal =  document.querySelector('.modal-bg')
const modalClose = document.querySelector('.modal-close')
const btnModalInput = <HTMLButtonElement>document.querySelector('.btn-modal')
const btnModal = <HTMLButtonElement>document.querySelector('.btn-add')

btnModal.addEventListener('click', openModal)
modalClose.addEventListener('click', closeModal)

function openModal(){
    bgModal.classList.add('bg-active')
}

function closeModal(){
    bgModal.classList.remove('bg-active')
}