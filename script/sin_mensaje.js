function sendMail(){
    /* A la escucha del evento 'submit' */
    const formula = document.getElementById('formulario');
    formula.addEventListener("submit", function(event) {
        event.preventDefault()});
    const form = new FormData(formula);
    const misDatos = { 
          cliente: form.get("name"),
          fmail: form.get("email"),
        };
    miCliente =  form.get("name");
    miFmail =  form.get("email"); 

    /*** Valida que los campos del formulario no estén vacíos ***/
    if (!miCliente || !miFmail){
        alert("Todos los campos son obligatorios");
        return;    
    }
    
    /*** Valida que la dirección de mail sea válida ***/
    if (!miFmail.includes('@')) {
        alert("La dirección de email no es válida.");
        return;
    } 

    
    /* Cambio del texto del botón y su desactivación posterior */
    /* Apuntando al boton */ 
    const submitBtn = document.getElementById('envio');
    
    /* Guardando el texto del botón para su restauración posterior */
    const textIniBtn = submitBtn.innerText;  

    /* Cambiando el texto del botón */
    submitBtn.innerText="Enviando...";                  

    /* Desactivando el botón */
    submitBtn.disabled = true;                          
 
 
    /* Ejecución del envío */
        /* Inicializo EMAILJS con mi clave pública*/
        emailjs.init("QcTgETiEzvj19gQ2v");

        /* Se ejecuta la orden de envío */
        emailjs.send("service_xs7q7zd","template_p3sovte", misDatos)

    /* Si envío exitoso */ 
        .then(function(response) { 
            /* Envío mensaje de confirmación a la consola */
            console.log("SUCCESS!", response.status, response.text);
            
            /* Borrado de datos del formulario */
            formula.reset();

            /* Restauración texto original del boton */
            submitBtn.innerText = textIniBtn;
            
            /* Activación del botón */
            submitBtn.disabled = false;

            /* Envío de mensaje de alerta <envío correcto> */
            alert("Email enviado con éxito!");

    /* Si envío fallido */     
        }, function(error) {
            /* Restauración texto original del boton */
            submitBtn.innerText = textIniBtn;

            /* Activación del botón */
            submitBtn.disabled = false;

             /* Envío mensaje de fallo a la consola */
            console.log("FAILED...", error);

            /* Envío de mensaje de alerta <envío fallido> */
            alert("Hubo un error en el envío.");
        });
}

