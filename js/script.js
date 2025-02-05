const FILES = {
    exe: {
        name: 'MathGame-1.0.exe',
        path: './downloads/MathGame-1.0.zip',
        size: '4.2 MB'
    },
    jar: {
        name: 'MathGame-1.0.jar',
        path: './downloads/MathGame-1.0.jar',
        size: '2.7 MB'
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

async function downloadJar() {
    if (await checkFileExists(FILES.jar)) {
        initiateDownload(FILES.jar);
    } else {
        alert('Spiacenti, il file .jar non è al momento disponibile.');
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