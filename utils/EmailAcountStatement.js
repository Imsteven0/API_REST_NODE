const nodemailer = require("nodemailer");
var fs = require('fs');
const dbAccountStatus = require("../Db/dataModels/dbAccountStatus.js");

async function enviarCorreo(dataEmail, dataPDF) {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'ndgonzalezarias8@gmail.com', //Correo del SIAO
      pass: 'onkuhisbyttamdtu',  // Contrasenia de un uso SIAO
    },
  });

  let email = ({
    from: 'ndgonzalezarias8@gmail.com', // Envio SIAO
    to: dataEmail.email, // Facturador
    subject: 'Estado de cuenta Senara', // datos.subject
    text: 'Estado de cuenta', // datos.text
    html: `<h3>Saludos ` + dataEmail.nombreCompleto + `, Se adjunta el estado de cuenta del mes de ` + dataEmail.mes + `del ` + dataEmail.año + ` </h3> 
     <h4>Para mayor informacion comuniquese con nuestros equipo de Senara Cañas.</h4> 
     <h4>Correo:sia@senara.com.</h4> 
     <h4>Telefono:2669-0676 EXT 207</h4> 
     <a href='https://www.senara.or.cr/' >Para mas informacion pulse aqui!</a>`, // html body
    attachments: [
      {
        filename: 'EstadoCuenta_' + dataEmail.nombreCompleto + '_' + dataEmail.mes + '_' + dataEmail.año + '.pdf',
        path: dataPDF,
        cid: 'uniq-mailtrap.pdf'
      }
    ]
  });

  transporter.sendMail(email, function (error, info) { //Este metodo envia un correo vacio al usuario para verificar la entra.
    if (error) {
      let dataDescription = "Error al enviar email: " + dataEmail.email;
      dbAccountStatus.AddSendEmailsLogs(dataEmail.nombreCompleto, dataDescription);
      console.log(dataDescription);
    } else {
      let dataDescription = "El correo fue enviado correctamente: " + dataEmail.email;
      dbAccountStatus.AddSendEmailsLogs(dataEmail.nombreCompleto, dataDescription);
      console.log(dataDescription);
    }
    createTransport.close();
  });

};

module.exports = {
  enviarCorreo: enviarCorreo
}