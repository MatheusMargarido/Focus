// Função para salvar o estado dos checkboxes no Local Storage
function saveCheckboxState(formId) {
    const checkboxes = document.querySelectorAll(`#${formId} input[type="checkbox"]`);
    const checkboxState = {};
    checkboxes.forEach(checkbox => {
        checkboxState[checkbox.id] = checkbox.checked;
    });
    localStorage.setItem(`checkboxState_${formId}`, JSON.stringify(checkboxState));
}

// Função para carregar o estado dos checkboxes do Local Storage
function loadCheckboxState() {
    const currentForm = document.documentElement.getAttribute('data-form');
    const checkboxState = JSON.parse(localStorage.getItem(`checkboxState_${currentForm}`));
    if (checkboxState) {
        Object.keys(checkboxState).forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = checkboxState[id];
            }
        });
    }
}

// Adicionar eventos aos checkboxes para salvar o estado quando alterados
document.addEventListener('DOMContentLoaded', () => {
    // Identificar o formulário atual
    const currentForm = document.documentElement.getAttribute('data-form');
    
    console.log(currentForm)

    // Carregar o estado dos checkboxes para o formulário atual
    loadCheckboxState();
    
    // Adicionar eventos aos checkboxes para salvar o estado quando alterados
    const checkboxes = document.querySelectorAll(`#${currentForm} input[type="checkbox"]`);
    console.log(checkboxes)
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            saveCheckboxState(currentForm);
        });
    });
});
