
const formulario  = document.getElementById("contact-form");
const inputs = document.querySelectorAll('#formulario input')

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{1,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	empresa: /^.{1,150}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}


const validarFormulario = (e) =>{
    switch (e.target.name){
        case "name":
        if(expresiones.usuario.test(e.target.value)){
            document.getElementById('grupo__name').classList.remove('formulario__grupo-incorrecto');
            document.getElementById('grupo__name').classList.add('formulario__grupo-correcto');
            document.querySelector('.usuario-formulario__input-error').classList.remove('usuario-formulario__input-error-activo');
        }else{
            document.getElementById('grupo__name').classList.add('formulario__grupo-incorrecto');
            document.getElementById('grupo__name').classList.remove('formulario__grupo-correcto');
            document.querySelector('.usuario-formulario__input-error').classList.add('usuario-formulario__input-error-activo');
            
        }
        break
        case "empresa":
            if(expresiones.empresa.test(e.target.value)){
                document.getElementById('grupo__empresa').classList.remove('formulario__grupo-incorrecto');
                document.getElementById('grupo__empresa').classList.add('formulario__grupo-correcto');
                document.querySelector('.empresa-formulario__input-error').classList.remove('usuario-formulario__input-error-activo');
            }else{
                document.getElementById('grupo__empresa').classList.add('formulario__grupo-incorrecto');
                document.getElementById('grupo__empresa').classList.remove('formulario__grupo-correcto');
                document.querySelector('.empresa-formulario__input-error').classList.add('usuario-formulario__input-error-activo');
                
            }
        break
        case "rubro":
            if(expresiones.empresa.test(e.target.value)){
                document.getElementById('grupo__rubro').classList.remove('formulario__grupo-incorrecto');
                document.getElementById('grupo__rubro').classList.add('formulario__grupo-correcto');
                document.querySelector('.rubro-formulario__input-error').classList.remove('usuario-formulario__input-error-activo');
            }else{
                document.getElementById('grupo__rubro').classList.add('formulario__grupo-incorrecto');
                document.getElementById('grupo__rubro').classList.remove('formulario__grupo-correcto');
                document.querySelector('.rubro-formulario__input-error').classList.add('usuario-formulario__input-error-activo');
                
            }
        break
        case "localidad":
            if(expresiones.empresa.test(e.target.value)){
                document.getElementById('grupo__localidad').classList.remove('formulario__grupo-incorrecto');
                document.getElementById('grupo__localidad').classList.add('formulario__grupo-correcto');
                document.querySelector('.localidad-formulario__input-error').classList.remove('usuario-formulario__input-error-activo');
            }else{
                document.getElementById('grupo__localidad').classList.add('formulario__grupo-incorrecto');
                document.getElementById('grupo__localidad').classList.remove('formulario__grupo-correcto');
                document.querySelector('.localidad-formulario__input-error').classList.add('usuario-formulario__input-error-activo');
                
            }
        break
        case "usuarios":
          
        break
        case "email":
            if(expresiones.correo.test(e.target.value)){
                document.getElementById('grupo__email').classList.remove('formulario__grupo-incorrecto');
                document.getElementById('grupo__email').classList.add('formulario__grupo-correcto');
                document.querySelector('.mail-formulario__input-error').classList.remove('mail-formulario__input-error-activo');
            }else{
                document.getElementById('grupo__email').classList.add('formulario__grupo-incorrecto');
                document.getElementById('grupo__email').classList.remove('formulario__grupo-correcto');
                document.querySelector('.mail-formulario__input-error').classList.add('mail-formulario__input-error-activo');
                
            }
        break
        case "phone":
            if(expresiones.telefono.test(e.target.value)){
                document.getElementById('grupo__phone').classList.remove('formulario__grupo-incorrecto');
                document.getElementById('grupo__phone').classList.add('formulario__grupo-correcto');
                document.querySelector('.phone-formulario__input-error').classList.remove('phone-formulario__input-error-activo');
            }else{
                document.getElementById('grupo__phone').classList.add('formulario__grupo-incorrecto');
                document.getElementById('grupo__phone').classList.remove('formulario__grupo-correcto');
                document.querySelector('.phone-formulario__input-error').classList.add('phone-formulario__input-error-activo');
                
            }
        break
        
    }
}



inputs.forEach((input)=>{
    input.addEventListener('change',validarFormulario);
    input.addEventListener('keyup',validarFormulario);
    input.addEventListener('blur',validarFormulario);

});



$(function () {

    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    })
	$('#contact-form1').validator();

    $('#contact-form1').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form1').find('.messages').html(alertBox);
                        $('#contact-form1')[0].reset();
                    }
                }
            });
            return false;
        }
    })
});