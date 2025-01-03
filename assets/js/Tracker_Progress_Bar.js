async function cargarRegalos() {

    const filePath = '/assets/regalos.csv';
    const response = await fetch(filePath);
    const csvData = await response.text();

    // Parse CSV data
    Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        delimiter: ";", // Cambiar el delimitador a punto y coma
        complete: function (results) {
            const data = results.data;

            data.forEach(row => {
                console.log(row); // Imprime la fila en la consola
            });

            // Find the record with the matching id
            $('#regalos').empty();
            data.forEach(row => {
                $('#regalos').append(`
                    <!-- Col -->
                    <div class="col mb-7 mb-md-10">
                        <!-- Card -->
                        <a class="card card-ghost card-transition-zoom h-100" data-bs-toggle="collapse" href="#${row.Regalo}IBAN" role="button">
                            <!-- Foto -->
                            <div class="card-pinned card-transition-zoom-item">
                                <img class="card-img" src="${row.imagen}" alt="Image Description">
                            </div>
                            <!-- Texto -->
                            <div class="card-body">
                                <h4>${row.titulo}</h4>
                                <p class="card-text">${row.descripcion}</p>
                            </div>
                            <!-- IBAN -->
                            <div class="collapse" id="${row.Regalo}IBAN">
                                <div class="alert alert-soft-primary" role="alert">
                                    <b>Participa a través del siguiente IBAN:</b> ES8515830001129192861889
                                    <br>
                                    <b>Código BIC/SWIFT:</b> REVOESM2
                                    <br>
                                    <b>Concepto:</b> ${row.concepto}
                                </div>
                            </div>
                            <!-- Barra de progreso -->
                            <div class="progress" style="height: 15px;">
                                <div id="${row.Regalo}" class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: ${(row.Recaudado / row.Coste_Total) * 100}%">${Math.min(100,Math.round((row.Recaudado / row.Coste_Total) * 100))}%</div>
                            </div>
                            <!-- Participa -->
                            <div class="card-footer">
                                <span class="card-link">Participa</span>
                            </div>
                        </a>
                        <!-- End Card -->
                    </div>
                    <!-- End Col -->
                `);
            });
        },
        error: function (error) {
            alert("Error parsing CSV file: " + error.message);
        }
    });
}

