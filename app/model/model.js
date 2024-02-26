const tf = require('@tensorflow/tfjs-node');
const tfnode = require('@tensorflow/tfjs-node');

export default async function loadCSV(path) {
    // Lade das CSV-Datei
    const csvUrl = path;
    const dataset = tfnode.data.csv(csvUrl, {
        columnConfigs: {
            // Definiere hier die Konfiguration für jede Spalte, z.B. für numerische oder kategorische Spalten
            // Beispiel: 'label': {
            //             isLabel: true
            //          }
        }
    });

    // Konvertiere das Dataset in ein Array
    const dataArray = await dataset.toArray();

    // Jetzt kannst du dataArray verwenden, um deine Daten weiter zu verarbeiten, z.B. um sie in ein TensorFlow.js-Modell einzuspeisen
    return dataArray
}
