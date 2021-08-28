var bgModal = document.querySelector('.modal-bg');
var modalClose = document.querySelector('.modal-close');
var btnModalInput = document.querySelector('.btn-modal');
var btnEdit = document.querySelector('.btn-edit');
modalClose.addEventListener('click', closeModal);
function openModal() {
    bgModal.classList.add('bg-active');
    btnEdit.style.display = 'none';
    btnModalInput.style.display = 'block';
}
function closeModal() {
    bgModal.classList.remove('bg-active');
}
