function cargarFormulario() {
    const numPersonas = parseInt(document.getElementById('forNumPersonas').value, 10);
    const contenedor = document.getElementById('contenedor-formulario');
    contenedor.innerHTML = ''; // Clear existing questions

    if (numPersonas > 0) {

        // Hacer desaparecer form de número de invitados
        const formularioNumPersonas = document.getElementById('FormNumeroPersonas');
        formularioNumPersonas.style.display = 'none';

        for (let i = 1; i <= numPersonas; i++) {
            const section = document.createElement('div');

            section.innerHTML = `
                <h3>Invitado #${i}</h3>

                <!-- Nombre -->
                <div class="mb-4">
                <label class="form-label" for="ForNombre-${i}">Nombre</label>
                <input type="text" class="form-control form-control-lg" name="FormNameFirstName" id="ForNombre-${i}" placeholder="Nombre" aria-label="Nombre">
                </div>
                <!-- End Nombre-->

                <!-- Tipo de ménu -->
                <div class="mb-4">
                <label class="form-label" for="ForTipoMenu-${i}">Selecciona el menú que prefieras</label>
                <select class="form-select form-select-lg" id="ForTipoMenu-${i}" aria-label="Selecciona el menú">
                    <option selected>Normal</option>
                    <option value="Vegano">Vegano</option>
                    <option value="Vegetariano">Vegetariano</option>
                    <option value="Sin Gluten">Sin Gluten</option>
                    <option value="Infantil">Infantil</option>
                </select>
                </div>
                <!-- End Tipo de menú -->

                <!-- Alergias -->
                <div class="mb-3">
                <label for="ForAlergias-${i}" class="form-label">Alergias</label>
                <textarea class="form-control" name="ForNameAlergias" id="ForAlergias-${i}" placeholder="Indica tus alergias" aria-label="Indica tus alergias" rows="3"></textarea>
                </div>
                <!-- End Alergias -->
            `;
            contenedor.appendChild(section);
        }

        // Mostrar Botón de confirmar asistencia de invitados
        
        const botonConfirmar = document.createElement('div');
        botonConfirmar.innerHTML = `
            <div class="d-grid">
                <button type="submit" class="btn btn-primary btn-lg" id="botonConfirmarAsistencia">Confirmar asistencia</button>
              </div>
        `;
        contenedor.appendChild(botonConfirmar);

    } else {
        alert('Por favor, introduzca un número válido de invitados.');
    }
}

function guardarInformacion(){
    
    const numPersonas = parseInt(document.getElementById('forNumPersonas').value, 10);

    if (numPersonas > 0) {
        
        const respuestasPeticiones = [];

        for (let i = 1; i <= numPersonas; i++) {

            // Recoger la información introducida

            const nombre = document.getElementById(`ForNombre-${i}`).value;
            const tipoMenu = document.getElementById(`ForTipoMenu-${i}`).value;
            const alergias = document.getElementById(`ForAlergias-${i}`).value;

            // Endpoint URL (replace with your actual URL)
            const url = `https://script.google.com/macros/s/AKfycbzihxNPuKdsoNWXfllTElf53-YuShvAicbgEGoxT0Cz4o1qZPkBVHEGUzJPcEGMQVLU/exec?nombre=${encodeURIComponent(nombre)}&tipoMenu=${encodeURIComponent(tipoMenu)}&alergias=${encodeURIComponent(alergias)}`;

            // Send GET request to Google Apps Script
            respuestasPeticiones.push(
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status != 'success') {
                            throw new Error(`Error: ${data.message}`);
                        }
                        return data.status;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        return 'error';
                    }) 

            );

        }

        Promise.all(respuestasPeticiones)
            .then(statuses => {
                if (statuses.every(status => status === 'success')) {
                    alert('Todos los datos se han guardado correctamente.');
                    window.location.href = '/';
                } else {
                    alert('Hubo un error al guardar algunos datos.');
                }
            });

    }
}