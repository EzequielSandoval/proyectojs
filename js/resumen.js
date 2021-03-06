let costeCopia = 0
let costeCertificado = 0
let sistema = "Ninguno"
let certOpcion = "NO"
let respaldo = "Ninguna"
let codigoDescuento = 0
let calcDescuentos = 0
let totalDescuentos = 0

//Calculo impuesto iva
function impIva(valor) {
    let valorIva = valor * 0.21
    return valorIva
}

//Calculos de descuentos
const desc25 = (descontarMedio) => { return descontarMedio * 0.25 }
const desc50 = (descontarMayor) => { return descontarMayor * 0.50 }

let planTipo = localStorage.getItem('tipoPlan')
let costePlan = localStorage.getItem('costePlan')



parseInt(costePlan)

//titulo de la compra
let tituloCompra = document.querySelector(".titulosResumen")
tituloCompra.innerHTML = `<h4>Seleccionaste: ${planTipo}</h4>`
// titulo modal
let modalTitle = document.querySelector(".modal-header")
modalTitle.innerHTML = `<h5 class="modal-title" id="formModal">Contacto por: ${planTipo}</h5>`
// Seleccion de meses
let inputDuracion1 = document.getElementById("duracion1")
let inputDuracion2 = document.getElementById("duracion2")
let inputDuracion3 = document.getElementById("duracion3")

inputDuracion1.onchange = () => {
    duracion = 1;
    costeMeses = parseInt(costePlan)
    calcDescuentos = 0
    totalDescuentos = 0
    codigoDescuento = 0
    updateResumen();

};
inputDuracion2.onchange = () => {
    duracion = 6;
    costeMeses = parseInt(costePlan) * duracion;
    calcDescuentos = 0
    totalDescuentos = 0
    codigoDescuento = 0
    updateResumen();
};
inputDuracion3.onchange = () => {
    duracion = 12;
    costeMeses = parseInt(costePlan) * duracion;
    Swal.fire('Los planes con duracion de un año poseen un descuento del 25%');
    codigoDescuento = 0
    calcDescuentos = desc25(costeMeses)
    totalDescuentos = calcDescuentos
    updateResumen();
};

//precios de los meses segun el plan
let preciosCompraMes = document.querySelector(".costeMensual")
preciosCompraMes.innerHTML = `<span>${costePlan}$/mes</span>`
let preciosCompraSemeste = document.querySelector(".costeSemestre")
preciosCompraSemeste.innerHTML = `<span>${costePlan * 6}$/mes</span>`
let preciosCompraAnual = document.querySelector(".costeAnual")
preciosCompraAnual.innerHTML = `<span>${costePlan * 12}$/mes</span>`

// Seleccion de sistema operativo
let inputSo1 = document.getElementById("soLin")
let inputSo2 = document.getElementById("soWin")

inputSo1.onchange = () => {
    sistema = "Linux";
    Swal.fire({
        title: '¿Deseas agregar sistema de respaldo por $90/mes?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {

        if (result.isConfirmed) {
            Swal.fire('Agregado!', '', 'success');
            respaldo = "Si";
            codigoDescuento = 0
            costeCopia = 90 * duracion;
            updateResumen();
        } else if (result.isDenied) {
            codigoDescuento = 0
            Swal.fire('No agregaste la copia de seguridad!', '', 'info');
            respaldo = "No";

        }
    })
    updateResumen();
};
inputSo2.onchange = () => {
    sistema = "Windows";
    respaldo = "No";
    costeCopia = 0;
    codigoDescuento = 0
    Swal.fire({
        title: 'Este sistema no posee copia de seguridad',
        icon: 'info',
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: 'OK',
    })
    updateResumen();
};


// Seleccion de ssl
let inputSsl = document.getElementById("ssl")
inputSsl.onchange = () => {
    if (inputSsl.checked == true) {
        certOpcion = "SI"
        codigoDescuento = 0
        costeCertificado = 1000

    } else {
        codigoDescuento = 0
        costeCertificado = 0
        certOpcion = "NO"
    }
    updateResumen();
};


let codDesc = document.getElementById("aplicarCodigo")
let inputCode = document.getElementById("codDesc")


codDesc.onclick = () => {

    if (inputCode.value == "cybermonday") {
        Swal.fire({
            title: 'Codigo "cybermonday" aplicado',
            icon: 'success',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: 'OK',

        })
        codigoDescuento = desc25(calculoTotal)

    } else if (inputCode.value == "hFnfqu5") {
        codigoDescuento = desc50(calculoTotal)
        Swal.fire({
            title: 'Codigo especial "hFnfqu5" aplicado',
            icon: 'success',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: 'OK',
        })
    } else {

        Swal.fire({
            title: 'El codigo ingresado no es valido',
            icon: 'error',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: 'OK',
        })

    }
    updateResumen();
}


function updateResumen() {


    /*Suma totales*/
    totalDescuentos = calcDescuentos + codigoDescuento
    subtotal = costeMeses + costeCopia + costeCertificado
    totalImp = impIva(subtotal)
    calculoTotal = subtotal + totalImp
    /*Descuentos*/

    /*final*/
    precioFinal = calculoTotal - totalDescuentos


    // Resumen: 

    let resumenVisible = document.getElementById("resumenVisible")
    resumenVisible.style.position = "relative";
    resumenVisible.innerHTML = `<div id="resumen">
                                    <h4>Resumen:</h4>
                                    <div id="resumenContainer">
                                        <div class="resumenProductos"></div>
                                        <div class="totales"></div>
                                    </div>
                                    <div class="resumen"></div> 
                                </div>`
    // ----------------------
    const resumen = []
    class Resumen {

        constructor(typePlan, pricePlan, durationPlan, systemPlan, backupPlan, priceBackup, sslPlan, priceSSL) {

            this.typePlan = typePlan;
            this.pricePlan = pricePlan;
            this.durationPlan = durationPlan;
            this.systemPlan = systemPlan;
            this.backupPlan = backupPlan;
            this.priceBackup = priceBackup;
            this.sslPlan = sslPlan;
            this.priceSSL = priceSSL;
        }


    }

    resumen.push(new Resumen(planTipo, costeMeses, duracion, sistema, respaldo, costeCopia, certOpcion, costeCertificado))

    const padre = document.getElementById("resumenContainer")
    for (const resumenProductos of resumen) {

        let contenedorResumen = document.querySelector(".resumenProductos")

        contenedorResumen.innerHTML = `
                                       <h4 class="resumenTitulo" >     ${resumenProductos.typePlan}:</h4>
                                       <p>Coste:                       $${resumenProductos.pricePlan}</p>
                                       <p>Meses de duracion:           ${resumenProductos.durationPlan}</p>   
                                       <p>Sistema:                     ${resumenProductos.systemPlan}</p>   
                                       <p>Copia de seguridad:          ${resumenProductos.backupPlan}</p>   
                                       <p>Coste:                       $${resumenProductos.priceBackup}</p>   
                                       <p>Certificado SSL:             ${resumenProductos.sslPlan}</p>    
                                       <p>Coste:                       $${resumenProductos.priceSSL}</p>    
                                `

        padre.appendChild(contenedorResumen)
    }
    // ----------------------

    const totales = []
    class Totales {

        constructor(totImp, totDiscount, total, finalPrice) {
            this.totImp = totImp;
            this.totDiscount = totDiscount;
            this.total = total;
            this.finalPrice = finalPrice;
        }

    }

    totales.push(new Totales(totalImp, totalDescuentos, calculoTotal, precioFinal))

    for (const preciosTotales of totales) {

        let contenedorTotales = document.querySelector(".totales")

        contenedorTotales.innerHTML =
            `
                                        <h4 class="totalTitulo">Total:                                    </h4>
                                        <p>Total impuestos:                           $${preciosTotales.totImp.toFixed(2)}</p>
                                        <p>Total Descuentos:                          $${preciosTotales.totDiscount.toFixed(2)}</p>
                                        <p>Total:                                     $${preciosTotales.total.toFixed(2)}</p>
                                        <p class="precioFinal">Precio final:          $${preciosTotales.finalPrice.toFixed(2)}</p>
                                
        
                                      `
        padre.appendChild(contenedorTotales)
    }
    // ----------------------



    // BTN  finalizar compra 
    let btnFin = document.querySelector(".resumen")
    btnFin.innerHTML = ` <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#formularioModal">Finalizar Compra</button>`
}



let contacto = document.getElementById('enviar')

contacto.addEventListener('click', contactar);
function contactar() {

    // EmailJS api 
    const nombre = document.getElementById('nombre')
    const apellido = document.getElementById('apellido')
    const email = document.getElementById('email')
    const tel = document.getElementById('tel')

    if (nombre.value == '') {
        let alertName = document.querySelector('.alertIconName')
        alertName.innerHTML = ` 
                                <i class="fa-solid fa-triangle-exclamation "></i>
                                  `
    } else if (apellido.value == '') {
        let alertLastName = document.querySelector('.alertIconLastName')
        alertLastName.innerHTML = `
                                <i class="fa-solid fa-triangle-exclamation "></i>
                                      `
    } else if (email.value == '') {
        let alertEmail = document.querySelector('.alertIconEmail')
        alertEmail.innerHTML = `
                                 <i class="fa-solid fa-triangle-exclamation "></i>
                                   `
    } else if (tel.value == '') {

        let alertTel = document.querySelector('.alertIconTel')
        alertTel.innerHTML = `
                                <i class="fa-solid fa-triangle-exclamation "></i>
                                `
    } else {
        // let bntEnviar = document.getElementById("enviar")
        const procesarPago = document.getElementById('procesar-pago')
        procesarPago.addEventListener('submit', function (event) {
            event.preventDefault();
            contacto.innerHTML = `
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                `
            var params = {
                service_id: 'service_sha5pl4',
                template_id: 'template_371vbmm',
                user_id: 'KxcWOki9vdJSmKcrk',
                template_params: {
                    nombre: nombre.value,
                    apellido: apellido.value,
                    email: email.value,
                    tel: tel.value
                }
            };

            let headers = {
                'Content-type': 'application/json'
            };

            let options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(params)
            };

            fetch('https://api.emailjs.com/api/v1.0/email/send', options)
                .then((httpResponse) => {
                    if (httpResponse.ok) {
                        console.log('Correo enviado');
                        Swal.fire({
                            icon: 'success',
                            title: 'Enviado!. Nos contactaremos a la brevedad',
                            showConfirmButton: false,
                        })
                        setTimeout(() => { window.location.href = "../index.html"; }, 3000);

                    } else {
                        return httpResponse.text()
                            .then(text => Promise.reject(text));
                    }
                })
                .catch((error) => {
                    console.log('OCURRO ALGO INESPERADO: ' + error);
                });
        })


    }
}



