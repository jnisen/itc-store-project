var bgModal = document.querySelector('.modal-bg');
var modalClose = document.querySelector('.modal-close');
var btnModalInput = document.querySelector('.btn-modal');
var btnEdit = document.querySelector('.btn-edit');
modalClose.addEventListener('click', closeModal);
function openModal() {
    try {
        bgModal.classList.add('bg-active');
        btnEdit.style.display = 'none';
        btnModalInput.style.display = 'block';
    }
    catch (e) {
        alert(e);
    }
}
function closeModal() {
    try {
        bgModal.classList.remove('bg-active');
    }
    catch (e) {
        alert(e);
    }
}
