async function updateProgressBar(id_progress_bar) {

    const filePath = '/assets/Tracker_Regalos - Totales.csv';
    const response = await fetch(filePath);
    const csvData = await response.text();

    // Parse CSV data
    Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            const data = results.data;

            // Find the record with the matching id
            const record = data.find(row => row.Regalo === id_progress_bar);

            if (record && record.Pct_Recaudado) {
                const pctRecaudado = parseFloat(record.Pct_Recaudado);
                const progressBar = document.getElementById(id_progress_bar);

                if (!isNaN(pctRecaudado)) {
                    progressBar.style.width = `${pctRecaudado}%`;
                } else {
                    alert("Pct_Recaudado is not a valid number.");
                }
            } else {
                alert("ID not found or missing data.");
            }
        },
        error: function (error) {
            alert("Error parsing CSV file: " + error.message);
        }
        });
}

