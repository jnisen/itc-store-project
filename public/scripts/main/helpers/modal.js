var bgModal = document.querySelector('.modal-bg');
var modalClose = document.querySelector('.modal-close');
var btnModalInput = document.querySelector('.btn-modal');
var btnModal = document.querySelector('.btn-add');
var btnEdit = document.querySelector('.btn-edit');
btnModal.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
function openModal() {
    bgModal.classList.add('bg-active');
    btnEdit.style.display = 'none';
}
function closeModal() {
    bgModal.classList.remove('bg-active');
}
