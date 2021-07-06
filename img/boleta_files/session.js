(function () {
    /*
     jQuery check:
     We need to ensure that we load jQuery with the right version.
     If jQuery is not found, we load our jQuery
     If we found jQuery, but with a different version, we load our version and run the noConflict() statement
     */

    var jQuery;

    // Load jQuery if not present
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.8.3') {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        // Inject dependencies for a nice time, jQuery & less
        script_tag.setAttribute("src", "/widgets/jquery.min.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    scriptLoadHandler();
                }
            };
        } else { // Other browsers
            script_tag.onload = scriptLoadHandler;
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    } else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        main();
    }

    // When jQuery is loaded, call once
    function scriptLoadHandler() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);
        // Call our main function
        main();
    }

    // Our main function
    function main() {
        jQuery(document).ready(function ($) {
            // We load an external css
            var url = '/widgets/style.css'
            if (document.createStyleSheet) {
                //console.log('createStyleSheet');
                try {
                    document.createStyleSheet(url);
                } catch (e) {
                }
            }
            else {
                //console.log('createStyleSheet fallback');
                var css;
                css = document.createElement('link');
                css.rel = 'stylesheet';
                css.type = 'text/css';
                css.media = "all";
                css.href = url;
                document.getElementsByTagName("head")[0].appendChild(css);
            }

            // Polyfill for older browsers: Load JSON parser for IE7 and below
            // TODO: Check browser support without json2 (it should be only IE7 and below)
            //var JSON;JSON||(JSON={}),function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t=="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];a&&typeof a=="object"&&typeof a.toJSON=="function"&&(a=a.toJSON(e)),typeof rep=="function"&&(a=rep.call(t,e,a));switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";gap+=indent,u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1)u[n]=str(n,a)||"null";return i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]",gap=o,i}if(rep&&typeof rep=="object"){s=rep.length;for(n=0;n<s;n+=1)typeof rep[n]=="string"&&(r=rep[n],i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i))}else for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i));return i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}",gap=o,i}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(e){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(e,t,n){var r;gap="",indent="";if(typeof n=="number")for(r=0;r<n;r+=1)indent+=" ";else typeof n=="string"&&(indent=n);rep=t;if(!t||typeof t=="function"||typeof t=="object"&&typeof t.length=="number")return str("",{"":e});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i=="object")for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(r=walk(i,n),r!==undefined?i[n]=r:delete i[n]);return reviver.call(e,t,i)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}()

      // Now, we can use jQuery
      /**
       * getConfig() will return the JSON config within
       * the SCRIPT tag before the modyo-session element.
       * This function accept a default set of values inside of a json object
       * This values can be overrides later with the actual values
       * Usage:
       * Create an instance of getConfig (ie, in a var), and ask for properties
       *
       */


      // Get the current URL path
      var currentPath = window.location.pathname;


            // Create the HTML, checking if there's some current user or not

      var html = '<div id="modyo-session-header"  ><a class="signIn" href="#modyo-session-login">Ingresar</a>';
      html += '<div class="wrap-singin">';
      html += '<div class="wrap-tabs">';
      html += '<div class="tabs-signin">';
      html += '<button class="close nav-manager-close">×</button> ';
      html += '<ul class="modyo-tabs">';
      html += '<li class="active" id="modyo-session-login-tab"><a href="#modyo-session-login">Ingresa</a></li>';

            html += '</ul>';
            html += '</div>';

            html += '<div id="modyo-session-login" class="modyo-tabs-panel">';
            html += '<style>\n    a.modyo-session-custom-link-color:link {\n    \n    }\n\n    a.modyo-session-custom-link-color:visited {\n    \n    }\n\n    a.modyo-session-custom-link-color:hover {\n    \n    }\n\n    a.modyo-session-custom-link-color:active {\n    \n    }\n\n<\/style>\n<form accept-charset=\"UTF-8\" action=\"https://www.bci.cl/session/create?site=52ac08f8-506f-4640-8b5b-a734a2839753\" class=\"simple_form user_session\" method=\"post\"><div style=\"margin:0;padding:0;display:inline\"><input name=\"utf8\" type=\"hidden\" value=\"&#x2713;\" /><input name=\"authenticity_token\" type=\"hidden\" value=\"goYgCETHG62PAxe79H+QUWonQYOkLurcNM2hXuXKA4E=\" /><\/div>\n\n  <div class=\"row-fluid\">\n\n\n      <div class=\"span12\">\n        <ul class=\"form-wide form-login\">\n\n  <li class=\"control-group email required user_session_email\"><label class=\"email required control-label\" for=\"user_session_email\"><abbr title=\"required\">*<\/abbr> Email<\/label><div class=\"controls\"><input autocomplete=\"off\" class=\"string email required span12\" id=\"user_session_email\" name=\"user_session[email]\" required=\"required\" size=\"50\" type=\"email\" /><\/div><\/li>\n  <li class=\"control-group password required user_session_password\"><label class=\"password required control-label\" for=\"user_session_password\"><abbr title=\"required\">*<\/abbr> Contraseña<\/label><div class=\"controls\"><input autocomplete=\"off\" class=\"password required span12\" id=\"user_session_password\" name=\"user_session[password]\" required=\"required\" size=\"50\" type=\"password\" /><\/div><\/li>\n\n <li class=\"control-group\">\n   <div class=\"pull-right\">\n     <a href=\"/password\" class=\"modyo-session-reset-password modyo-session-custom-link-color\">¿Olvidaste tu contraseña?<\/a>\n   <\/div>\n <\/li>\n\n\n<\/ul>\n      <\/div>\n\n\n  <\/div>\n\n    <div class=\"form-actions-holder\"><\/div>\n    <div class=\"form-actions\">\n      <div class=\"inner\">\n        <input class=\"btn btn btn-primary btn-large\" data-disable-with=\"Entrar\" name=\"commit\" required=\"required\" type=\"submit\" value=\"Entrar\" />\n      <\/div>\n    <\/div>\n\n<\/form>';
            html += '</div>';

            html += '<div id="modyo-session-reset-password" class="modyo-tabs-panel hide">';
            html += '\n<form accept-charset=\"UTF-8\" action=\"https://www.bci.cl/password/send_link?site_uuid=52ac08f8-506f-4640-8b5b-a734a2839753\" class=\"simple_form owner\" method=\"post\"><div style=\"margin:0;padding:0;display:inline\"><input name=\"utf8\" type=\"hidden\" value=\"&#x2713;\" /><input name=\"authenticity_token\" type=\"hidden\" value=\"goYgCETHG62PAxe79H+QUWonQYOkLurcNM2hXuXKA4E=\" /><\/div>\n  <ul class=\"form-wide\">\n    <li>\n      <h5>Restablecer mi contraseña<\/h5>\n\n      <p>Te enviaremos un correo electrónico con un enlace temporal para actualizar tu contraseña.<\/p>\n    <\/li>\n\n    <li class=\"control-group\">\n      <input class=\"field text half\" id=\"email\" input_html=\"{:autocomplete=&gt;&quot;off&quot;}\" name=\"email\" placeholder=\"Email\" type=\"email\" />\n    <\/li>\n  <\/ul>\n\n  <div class=\"form-actions\">\n  <div class=\"inner\">\n    <input class=\"btn btn-primary btn-large\" data-disable-with=\"Guardando ...\" name=\"commit\" type=\"submit\" value=\"Enviar\" />  o\n    <a href=\"#modyo-session-login\" class=\"backtologin modyo-session-custom-link-color\">Cancelar<\/a>\n  <\/div>\n  <\/div>\n<\/form>';
            html += '</div>';

            html += '<div id="modyo-session-ldap" class="modyo-tabs-panel hide">';
            html += '<form method=\'post\' action=\'https://www.bci.cl/auth/ldap/callback?site=52ac08f8-506f-4640-8b5b-a734a2839753&token=\"\' noValidate=\'noValidate\'>\n  <ul class=\"form-wide form-login row-fluid box\">\n    <li>\n      <p>\n        Ingresa tus credenciales de .\n      <\/p>\n    <\/li>\n    <li>\n      <label for=\'username\'>Usuario<\/label>\n      <input type=\'text\' id=\'username\' name=\'username\' class=\"span12\"/>\n    <\/li>\n\n    <li>\n      <label for=\'password\'>Contraseña<\/label>\n      <input type=\'password\' id=\'password\' name=\'password\' class=\"span12\" autocomplete=\"off\"/>\n    <\/li>\n\n  <\/ul>\n\n  <div class=\"form-actions\">\n    <div class=\"inner\">\n      <input class=\"btn btn-primary btn-large\" data-disable-with=\"Entrar\" name=\"commit\" type=\"submit\" value=\"Entrar\" />\n        &nbsp;&nbsp;o\n        <a href=\"#modyo-session-login\" class=\"backtologin hide-ldap-login\">Cancelar<\/a>\n    <\/div>\n  <\/div>\n\n<\/form>';
            html += '</div>';



      html += '</div>';
      html += '</div>';

            $('#modyo-session').append(html);

            // Main behaviors
            // DROPDOWN SESSION USER


            $('#ldap-btn').on('click', function () {
                return false;
            });


            $(".modyo-tabs").find("a").on('click', function () {
                $(".modyo-tabs").find("li").removeClass("active");
                $(this).parent().addClass("active");
                var tmp = $(this).attr("href");
                $(".modyo-tabs-panel").addClass("hide");
                $(tmp).removeClass("hide");
                return false;
            });

            $('.backtologin').on('click', function (e) {
                $(".modyo-tabs-panel").addClass("hide");
                $("#modyo-session-login").removeClass("hide");
                $("#modyo-session-ldap").addClass("hide");
                return false;
            });

            $('.modyo-session-reset-password').on('click', function () {
                $(".modyo-tabs-panel").addClass("hide");
                $("#modyo-session-reset-password").removeClass("hide");
                $("#modyo-session-ldap").addClass("hide");
                return false;
            });

            $('#show-ldap-login').on('click', function () {
                $(".modyo-tabs-panel").addClass("hide");
                $("#modyo-session-reset-password").addClass("hide");
                $("#modyo-session-ldap").removeClass("hide");
                return false;
            });

            $('#modyo-session-header a.signIn').on('click', function (e) {
                $('#modyo-session-header a').removeClass("active");
                $(this).addClass("active");
                if ($("#modyo-session").hasClass("active")) {
                    e.stopPropagation();
                    $("#modyo-session").addClass("active");
                    $('.wrap-tabs').addClass('show-panel');
                    return false;
                } else {
                    e.stopPropagation();
                    var bd = "<div id='backdrop'></div>";
                    $("#modyo-session").addClass("active");
                    $("body").append(bd);
                    $('.wrap-tabs').removeClass('show-panel');

                    return false;
                }
            });

            $('#modyo-session-header a.signIn.active').on('click', function (e) {
                e.stopPropagation();
                return false;
            })

            $("a.modyo-signin, a.modyo-signup").on('click', function () {
                var bd = "<div id='backdrop'></div>";
                $("#modyo-session").addClass("active");
                $("body").append(bd);
                $('.wrap-tabs').removeClass('show-panel');
                $("#modyo-session-login-tab").removeClass('active');
                $('.modyo-tabs-panel').addClass('hide');
                if ($(this).hasClass('modyo-signin')) {
                    $("#modyo-session-login-tab").addClass('active');
                    $('#modyo-session-login').removeClass('hide');
                } else if ($(this).hasClass('modyo-signup')) {
                    $("#modyo-session-signup-tab").addClass('active');
                    $('#modyo-session-signup').removeClass('hide');
                }
                return false;
            });

      $(".wrap-tabs").live('click', function (e) { e.stopPropagation(); });

      $(".wrap-singin").live('click', function () {
        $("#modyo-session").removeClass("active");
        $('#modyo-session-header').show();
        $("#backdrop").remove();
        $('#modyo-session-header a').removeClass("active");
      });

            $(".close").on('click', function () {
                $("#modyo-session").removeClass("active");
                $('#modyo-session-header').show();
                $("#backdrop").remove();
                $('#modyo-session-header a').removeClass("active");
            })

            var theHash = window.location.hash;
            theHash = theHash.substring(1);
            if (theHash === "signin") {
                var bd = "<div id='backdrop'></div>";
                $("#modyo-session").addClass("active");
                $("body").append(bd);
                $('.wrap-tabs').removeClass('show-panel');
            } else if (theHash === "signup") {
                var bd = "<div id='backdrop'></div>";
                $("#modyo-session").addClass("active");
                $("body").append(bd);
                $('.wrap-tabs').removeClass('show-panel');
                $("#modyo-session-login-tab").removeClass('active');
                $("#modyo-session-signup-tab").addClass('active');
                $('.modyo-tabs-panel').addClass('hide');
                $('#modyo-session-signup').removeClass('hide');
            }
            // Include validations for existing account and passwords matches
            
  var passValid = true;
  var passConfirmed = true;


  var emailAllowed = true;

  var currentEmail = $('#user_email').val();

  var emailConfirmed = true;



  var rutValid = true;
  var rutAllowed = true;



function enableSubmit() {
  //console.log("passValid: "+passValid+", passConfirmed: "+passConfirmed+", emailAllowed: "+emailAllowed+", emailConfirmed: "+emailConfirmed+", rutValid: "+rutValid+", rutAllowed: "+rutAllowed);
  if (passValid && passConfirmed && emailAllowed && emailConfirmed && rutValid && rutAllowed) {
    $('#actions input[type=submit]').removeAttr('disabled');
    } else {
    $('#actions input[type=submit]').attr('disabled', true);
    }
}

function checkPasswordLength() {
  var minLen = 8;
  var passwordEl = $('#user_password');
  var labelEl = passwordEl.parent();
  var passwordConfEl = $('#user_password_confirmation');
  var originalValue = passwordEl.attr('value');
  var fail = '<span id="password-length" class="password-check text-error">La contraseña debe tener al menos 8 caracteres de longitud.</span>';
  var pass = '<span id="password-length" class="password-check text-success">✔</span>';

  $('#password-length').remove();
  passValid = false;

  if (originalValue.length >= minLen) {
    passValid = true;
    if (originalValue.length > 0) labelEl.append(pass);
  } else {
    if (originalValue.length > 0) labelEl.append(fail);
  }
}

function checkPasswordConfirmation() {
    var passwordEl = $('#user_password');
    var passwordConfEl = $('#user_password_confirmation');
  var labelConfEl = passwordConfEl.parent();
    var originalValue = passwordEl.attr('value');
    var newValue = passwordConfEl.attr('value');

  $('#password-confirmation').remove();
  passConfirmed = false;

  var pass = '<span id="password-confirmation" class="password-check text-success">✔</span>';
  var fail = '<span id="password-confirmation" class="password-check text-error">Las contraseñas no coinciden.</span>';

        if (originalValue !== newValue) {
    if (originalValue.length > 0 && newValue.length > 0) labelConfEl.append(fail);
        } else {
    if (originalValue.length > 0 && newValue.length > 0) labelConfEl.append(pass);
    passConfirmed = true;
    }
}

function checkEmailExistence() {

  var emailEl = $('#user_email');
  var labelEl = emailEl.parent();
  var pass = '<span id="email-existence" class="email-check text-success">✔</span>';
  var fail = '<span id="email-existence" class="email-check text-error">Esta dirección de correo electrónico ya está en uso.</span>';
  var email = emailEl.attr('value');
    var url = "https://www.bci.cl" + "/users/check?email=" + email;
    var pattern = new RegExp(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);


  if (email.length > 0 && email.match(pattern) && email != currentEmail) {

    emailAllowed = false;
    $('#email-existence').remove();
    var loading = '<span id="email-existence" class="email-check"><i class="icon icon-spinner icon-spin"></i></span>';
    $(labelEl).append(loading);
            $.ajax({
                url: url,
                type: "GET",
                dataType: "jsonp",
                success: function (data) {
        $('#email-existence').remove();
                    if (data.user === 'false') {
                        $(labelEl).append(pass);
          emailAllowed = true;
                    } else if (data.user === 'true') {
                        $(labelEl).append(fail);
        }
      },
      complete: function (){
                        enableSubmit();
                    }
    });
                }
}

function checkEmailConfirmation() {
  var emailEl = $('#user_email');
  var emailConfEl = $('#user_email_confirmation');
  var labelEl = emailConfEl.parent();
  var originalValue = emailEl.attr('value');
  var newValue = emailConfEl.attr('value');
  emailConfirmed = false;
  $('#email-confirmation').remove();

  emailConfEl.parent().parent().removeClass('hide');

  var pass = '<span id="email-confirmation" class="email-check text-success">✔</span>';
  var fail = '<span id="email-confirmation" class="email-check text-error">Los emails no coinciden.</span>';

  if (originalValue !== newValue) {
    if (originalValue.length > 0 && newValue.length > 0) labelEl.append(fail);
        } else {
    if (originalValue.length > 0 && newValue.length > 0) labelEl.append(pass);
    emailConfirmed = true;
  }
}

/* Events */

            enableSubmit();


$('#user_password').on('keyup', function () {
  checkPasswordLength();
  if (passValid) checkPasswordConfirmation();
        enableSubmit();
});

$('#user_password_confirmation').on('keyup', function () {
  checkPasswordConfirmation();
  enableSubmit();
});

$("#user_email").on('focusout', function () {
  checkEmailExistence();
  enableSubmit();
});





        /* Custom Styles */
        $('#modyo-session .btn.btn-large.btn-primary').css({
            background: '#2A5C99',
            borderColor: '#2A5C99',
            boxShadow: 'none'
        });








    })
  }

})(); // We call our anonymous function immediately
