// ---------------------- MENÚ Y SUBMENÚS ----------------------
document.addEventListener("DOMContentLoaded", () => {
  // Menú hamburguesa y submenús
  const menu = document.querySelector('.menu');
  document.querySelectorAll('.menu > li > a').forEach(link => {
    link.addEventListener('click', (e) => {
      const submenu = link.nextElementSibling;
      if (submenu && submenu.classList.contains('submenu')) {
        e.preventDefault();
        document.querySelectorAll('.menu li.open').forEach(li => li.classList.remove('open'));
        link.parentElement.classList.toggle('open');
      }
    });
  });

  // Cierra submenús al hacer clic en cualquier enlace
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.menu li.open').forEach(li => li.classList.remove('open'));
      if (menu && menu.classList.contains('show')) {
        menu.classList.remove('show');
      }
    });
  });

  // Buscador: enfocar input al hacer clic en el icono
  document.querySelectorAll('.buscador .icono-buscar').forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.nextElementSibling) this.nextElementSibling.focus();
    });
  });

  // ---------------------- SELECTOR DE TEMA ----------------------
  const temasDisponibles = [
    'modo-claro',
    'tema-verde',
    'tema-azul',
    'tema-rojo',
    'tema-morado'
  ];
  document.querySelectorAll('.selector-tema button').forEach(btn => {
    btn.addEventListener('click', function() {
      document.body.classList.remove(...temasDisponibles);
      if (this.dataset.tema && this.dataset.tema !== 'oscuro') {
        document.body.classList.add(this.dataset.tema);
      }
    });
  });

  // Hover para mostrar/ocultar el selector de tema
  const btnToggle = document.getElementById('toggle-selector-tema');
  const selectorTema = document.querySelector('.selector-tema');
  if (btnToggle && selectorTema) {
    btnToggle.addEventListener('mouseenter', () => selectorTema.classList.remove('oculto'));
    selectorTema.addEventListener('mouseenter', () => selectorTema.classList.remove('oculto'));
    btnToggle.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!selectorTema.matches(':hover')) selectorTema.classList.add('oculto');
      }, 200);
    });
    selectorTema.addEventListener('mouseleave', () => selectorTema.classList.add('oculto'));
  }

  // ---------------------- FORMULARIO DE CONTACTO ----------------------
  const formContacto = document.getElementById("formulario-contacto");
  if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("¡Gracias por contactarnos! Te responderemos pronto.");
      formContacto.reset();
    });
  }

  // ---------------------- CARNET DIGITAL ----------------------
  const btnMostrar = document.getElementById('mostrar-carnet-btn');
  const seccion = document.getElementById('carnet-digital-seccion');
  const formCarnet = document.getElementById('form-carnet-seccion');
  const preview = document.getElementById('preview-carnet-seccion');
  const carnetFoto = document.getElementById('carnet-foto-preview-seccion');
  const carnetNombre = document.getElementById('carnet-nombre-preview-seccion');
  const carnetNumero = document.getElementById('carnet-numero-preview-seccion');
  const carnetTurno = document.getElementById('carnet-turno-preview-seccion');
  const carnetHora = document.getElementById('carnet-hora-preview-seccion');
  const carnetCarrera = document.getElementById('carnet-carrera-preview-seccion');
  const descargarBtn = document.getElementById('descargar-carnet-seccion');

  if (btnMostrar && seccion) {
    btnMostrar.onclick = function() {
      if (seccion.style.display === "none" || seccion.style.display === "") {
        seccion.style.display = "block";
        seccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
        btnMostrar.innerHTML = '<i class="fas fa-id-card"></i> Ocultar Registro';
      } else {
        seccion.style.display = "none";
        btnMostrar.innerHTML = '<i class="fas fa-id-card"></i> Registrar Carnet Digital';
      }
    };
  }

  if (
    formCarnet && carnetFoto && carnetNombre && carnetNumero &&
    carnetTurno && carnetHora && carnetCarrera && preview && descargarBtn
  ) {
    formCarnet.onsubmit = function(e) {
      e.preventDefault();
      carnetNombre.textContent = document.getElementById('nombre-carnet-seccion').value;
      carnetNumero.textContent = document.getElementById('numero-carnet-seccion').value;
      carnetTurno.textContent = document.getElementById('turno-carnet-seccion').value;
      carnetHora.textContent = document.getElementById('hora-carnet-seccion').value;
      carnetCarrera.textContent = document.getElementById('carrera-carnet-seccion').value;
      const file = document.getElementById('foto-carnet-seccion').files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          carnetFoto.src = evt.target.result;
          preview.style.display = 'block';
          setTimeout(() => {
            descargarBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 200);
        };
        reader.readAsDataURL(file);
      } else {
        preview.style.display = 'block';
        setTimeout(() => {
          descargarBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
      }
    };

    descargarBtn.onclick = function() {
      const carnet = document.getElementById('carnet-digital-seccion-preview');
      const originalBg = carnet.style.background;
      carnet.style.background = '#fff';
      html2canvas(carnet).then(function(canvas) {
        const link = document.createElement('a');
        link.download = 'carnet-digital.png';
        link.href = canvas.toDataURL();
        link.click();
        carnet.style.background = originalBg;
      });
    };
  }
}); 

// Galería de fotos dinámica con nombre
const fotosGaleria = [
  { src: "img/galeria/actividad1.jpg", nombre: "Actividad 1" },
  { src: "img/galeria/actividad2.jpg", nombre: "Actividad 2" },
  { src: "img/galeria/actividad3.jpg", nombre: "Actividad 3" },
  { src: "img/galeria/feria1.jpg", nombre: "Feria Tecnológica" },
  { src: "img/galeria/creativa1.jpg", nombre: "Creativa Chic" },
  { src: "img/galeria/hackathon1.jpg", nombre: "Hackathon" },
  { src: "img/galeria/graduacion1.jpg", nombre: "Graduación" },
  { src: "img/galeria/mi-foto.jpg", nombre: "Mi Foto" }

  // Agrega más fotos aquí si lo deseas
];

function mostrarGaleriaFotos() {
  const contenedor = document.getElementById('galeria-fotos-lista');
  if (!contenedor) return;
  contenedor.innerHTML = fotosGaleria.map(foto => `
    <div class="galeria-foto-item">
      <img src="${foto.src}" alt="${foto.nombre}" class="galeria-foto-img">
      <div class="galeria-foto-nombre">${foto.nombre}</div>
    </div>
  `).join('');
}
document.addEventListener('DOMContentLoaded', mostrarGaleriaFotos);

// Fechas importantes: puedes agregar/quitar aquí
const fechasImportantes = [
  { fecha: "2025-05-30", evento: "Día de la Madre" },
  { fecha: "2025-09-14", evento: "Batalla de San Jacinto" },
  { fecha: "2025-09-15", evento: "Día de la Independencia" },
  { fecha: "2025-12-25", evento: "Navidad" }
];

// Variables para el mes/año mostrado
let calMesActual = (new Date()).getMonth();
let calAnioActual = (new Date()).getFullYear();

function renderizarCalendarioImportante(mes = calMesActual, anio = calAnioActual) {
  calMesActual = mes;
  calAnioActual = anio;
  const primerDia = new Date(anio, mes, 1).getDay(); // 0=domingo, ..., 6=sábado
  const diasEnMes = new Date(anio, mes + 1, 0).getDate();

  // Fechas importantes de este mes
  const fechasMes = fechasImportantes.filter(f => {
    const d = new Date(f.fecha);
    return d.getMonth() === mes && d.getFullYear() === anio;
  });

  let tabla = `<table class="calendario-table"><tr>
    <th>Dom</th><th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th><th>Sáb</th>
  </tr><tr>`;

  // Espacios vacíos antes del primer día
  for (let i = 0; i < primerDia; i++) {
    tabla += "<td></td>";
  }

  for (let dia = 1; dia <= diasEnMes; dia++) {
    const fechaStr = `${anio}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    const evento = fechasMes.find(f => f.fecha === fechaStr);
    let clase = "";
    if (evento) clase = "calendario-dia-importante";
    tabla += `<td class="${clase}" data-fecha="${fechaStr}">${dia}</td>`;
    if ((primerDia + dia) % 7 === 0) tabla += "</tr><tr>";
  }
  tabla += "</tr></table>";

  // Mes y año
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  document.getElementById('cal-titulo').textContent = `${meses[mes]} ${anio}`;
  document.getElementById('calendario-importante').innerHTML = tabla;

  // Evento al hacer clic en un día
  document.querySelectorAll('.calendario-table td').forEach(td => {
    td.onclick = function() {
      const fecha = this.getAttribute('data-fecha');
      const evento = fechasImportantes.find(f => f.fecha === fecha);
      if (evento) {
        document.getElementById('evento-dia').textContent = `${evento.evento} (${new Date(evento.fecha).toLocaleDateString()})`;
      } else if (fecha) {
        document.getElementById('evento-dia').textContent = `No hay evento para esta fecha.`;
      }
    };
  });
  // Limpia el mensaje al cambiar de mes
  document.getElementById('evento-dia').textContent = '';
}

// SOLO UN bloque DOMContentLoaded para el calendario
document.addEventListener('DOMContentLoaded', function() {
  renderizarCalendarioImportante();

  const btnPrevio = document.getElementById('cal-previo');
  const btnSiguiente = document.getElementById('cal-siguiente');

  if (btnPrevio) {
    btnPrevio.onclick = function() {
      let mes = calMesActual - 1;
      let anio = calAnioActual;
      if (mes < 0) {
        mes = 11;
        anio--;
      }
     renderizarCalendarioImportante(mes, anio);
    };
  }

  if (btnSiguiente) {
    btnSiguiente.onclick = function() {
      let mes = calMesActual + 1;
      let anio = calAnioActual;
      if (mes > 11) {
        mes = 0;
        anio++;
      }
      renderizarCalendarioImportante(mes, anio);
    };
  }
});