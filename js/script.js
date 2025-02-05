const FILES = {
    exe: {
        name: 'MathGame-1.0.exe',
        path: './downloads/MathGame-1.0.exe',
        size: '9.22 MB'
    },
    jar: {
        name: 'MathGame-1.0.jar',
        path: './downloads/MathGame-1.0.jar',
        size: '8.94 MB'
    }
};

async function checkFileExists(file) {
    try {
        const response = await fetch(file.path, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.error('Errore nel controllo del file:', error);
        return false;
    }
}

async function downloadExe() {
    if (await checkFileExists(FILES.exe)) {
        initiateDownload(FILES.exe);
    } else {
        alert('Spiacenti, il file .exe non è al momento disponibile.');
    }
}

function showTermsAndConditions() {
    return confirm(
        "Termini e Condizioni d'uso:\n\n" +
        "1. Questo software è fornito 'così com'è' senza garanzie di alcun tipo\n" +
        "2. L'utente si assume la responsabilità dell'utilizzo del software\n" +
        "3. È vietata la redistribuzione non autorizzata\n\n" +
        "Accetti i termini e le condizioni?"
    );
}

async function downloadJar() {
    if (!(await checkFileExists(FILES.jar))) {
        alert('Spiacenti, il file .jar non è al momento disponibile.');
        return;
    }
    
    if (showTermsAndConditions()) {
        initiateDownload(FILES.jar);
    } else {
        alert('È necessario accettare i termini e le condizioni per procedere con il download.');
    }
}

function initiateDownload(file) {
    try {
        const link = document.createElement('a');
        link.href = file.path;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showDownloadStarted(file);
    } catch (error) {
        console.error('Errore durante il download:', error);
        alert('Si è verificato un errore durante il download. Riprova più tardi.');
    }
}

function showDownloadStarted(file) {
    alert(`Download di ${file.name} (${file.size}) iniziato!\n\nIl file verrà salvato nella cartella download.`);
}

window.downloadExe = downloadExe;
window.downloadJar = downloadJar;