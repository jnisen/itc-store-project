var bgModal = document.querySelector('.modal-bg');
var modalClose = document.querySelector('.modal-close');
var btnModalInput = document.querySelector('.btn-modal');
var btnModal = document.querySelector('.btn-add');
btnModal.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
function openModal() {
    bgModal.classList.add('bg-active');
}
function closeModal() {
    bgModal.classList.remove('bg-active');
}
