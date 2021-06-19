
const elements = {

    info: document.querySelector('#successNotification'),
    error: document.querySelector('#errorNotification'),
    loading: document.querySelector('#loadingNotification')
}

window.addEventListener('click', hideInfo)
window.addEventListener('click', hideError)
export function showInfo(message) {

    elements.info.textContent = message;
    elements.info.style.display = 'block';

    setTimeout(hideInfo, 1500);
}

export function hideInfo(message) {

    elements.info.style.display = 'none'
}

export function showError(message) {

    elements.error.textContent = message
    elements.error.style.display = 'block'
}

export function hideError(message) {

    elements.error.style.display = 'none'
}

let requests = 0;
export function beginRequest() {

    requests++;
    elements.loading.style.display = 'block'
}

export function endRequest() {

    requests--;
    if(requests === 0) {
        elements.loading.style.display = 'none'
    }
    
}