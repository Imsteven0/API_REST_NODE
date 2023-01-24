const { jsPDF } = require("jspdf");
require('jspdf-autotable')
const path = require('path')

var imgData = ('../public/img/senara logo.png')

async function PDFEstadoCuenta(datos) {  //lista el total de Clientes. 
    function dateNow() {
        let date = new Date()

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        let finaldate

        if (month < 10) {
            finaldate = `${day}-0${month}-${year}`
            return finaldate
        } else {
            finaldate = `${day}-${month}-${year}`
            return finaldate
        }
    }

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    let info = []

    // let img = new Image()
    //img.src = 'D:/Senara/server/public/img/logo.png';
    let doc = new jsPDF({ lineHeight: 1.5 });
    //doc.addImage(img, 'png', 10, 5, 45, 22);
    doc.autoTable({
        body: [
            [
                {
                    content: 'SERVICIO NACIONAL DE AGUAS SUBTERRÁNEAS, RIEGO Y AVENAMIENTO',
                    styles: {
                        halign: 'center',
                        fontSize: 11,
                        fontStyle: 'bold',
                        cellPadding: { top: 15 }
                        //textColor: '#ffffff'
                    }
                }
            ],
        ],
        theme: 'plain',
        styles: {
            //fillColor: '#3366ff'
        }
    });

    doc.autoTable({
        body: [
            [
                'Dirección: Cañas, Guanacaste. 400 metros al este de la escuela Monseñor Luis Leipod',
                'Cédula Jurídica: 3007042041',
                'Teléfono: 2669-0676 EXT 207',
                'Email: sia@senara.com'
            ],
            [
                'Numero de Factura: #INV0001',
                'Clave: N/A',
                'Tipo Documento:             Estado de cuenta',
                'Fecha:                       ' + dateNow()
            ]
        ],
        bodyStyles: {
            halign: 'left',
            fontSize: 8,
            textColor: '#000000',
            lineColor: '#6b7280'
        },
        theme: 'grid',
        startY: 35,
        tableLineColor: [38, 116, 56],
        tableLineWidth: 0.1,
    });

    doc.autoTable({
        body: [
            [
                {
                    content: 'INFORMACIÓN DEL CLIENTE',
                    styles: {
                        halign: 'center',
                        fontSize: 11,
                        //cellPadding: { top: 5 }
                        //textColor: '#ffffff'
                    }
                }
            ],
        ],
        theme: 'plain',
        startY: 56,
        styles: {
            //fillColor: '#3366ff'
        }
    });
    doc.autoTable({
        body: [
            [
                'Nombre: ' + datos.nombreCompleto,
                'Dirección: ' + datos.provincia + ', ' + datos.canton + ', ' + datos.direccionExacta,
                'Identificación: ' + datos.cedula,
                'Teléfono: ',
                'Correo: ' + datos.email
            ]
        ],
        bodyStyles: {
            fontSize: 10,
            halign: 'left',
            //cellPadding: { top: 3, right: 3, bottom: 8, left: 3 },
            textColor: '#000000',
            //cellPadding: 3,
            fontSize: 8,
            lineColor: '#6b7280'
        },
        theme: 'plain',
        tableLineColor: [38, 116, 56],
        tableLineWidth: 0.1,
        startY: 65,
    });



    doc.autoTable({
        body: [
            [
                {
                    content: 'INFORMACIÓN DE LA PARCELA',
                    styles: {
                        halign: 'center',
                        fontSize: 11,
                        //cellPadding: { top: 5 }
                        //textColor: '#ffffff'
                    }
                }
            ],
        ],
        theme: 'plain',
        startY: 76,
        styles: {
            //fillColor: '#3366ff'
        }
    });


    doc.autoTable({
        head: [['Nombre', 'Numero de finca', 'Area registral', 'Area regable', 'Sector parcela']],
        body: [
            [datos.nombre, datos.numeroFinca, datos.areaRegistral, datos.areaRegable, datos.sectorSiao]
        ],
        headStyles: {
            fillColor: '#ffffff',
            textColor: '#000000',
            halign: 'center',
            fontSize: 8
        },
        bodyStyles: {
            textColor: '#000000',
            halign: 'center',
            fontSize: 8,
            lineColor: '#6b7280'
        },
        theme: 'plain',
        startY: 84,
        tableLineColor: [38, 116, 56],
        tableLineWidth: 0.1,
    });

    doc.autoTable({
        body: [
            [
                {
                    content: 'HISTÓRICO DE CONSUMO',
                    styles: {
                        halign: 'center',
                        fontSize: 11,
                        //cellPadding: { top: 5 }
                        //textColor: '#ffffff'
                    }
                }
            ],
        ],
        theme: 'plain',
        startY: 100,
        styles: {
            //fillColor: '#3366ff'
        }
    });

    datos.WaterIntakes.forEach(function (ClientDato, index) {
        if (ClientDato.idTipoMedicion == 2) {
            ClientDato.services.forEach(function (Data, index) {
                info.push([Data.idMedicionToma, Data.servicio, Data.subtotalMetrosCubicos, Data.subtotalVolumenLitros])
            })
        }
    })

    doc.autoTable({
        head: [['Numero toma', 'Tipo toma', 'Metros cubicos', 'Total litros']],
        body: info,
        headStyles: {
            fillColor: '#ffffff',
            textColor: '#000000',
            halign: 'center',
            fontSize: 8
        },
        bodyStyles: {
            textColor: '#000000',
            halign: 'center',
            fontSize: 8,
            lineColor: '#6b7280'
        },
        theme: 'plain',
        startY: 108,
        tableLineColor: [38, 116, 56],
        tableLineWidth: 0.1,
    });

    let TotalMonto = 0;

    datos.WaterIntakes.forEach(function (ClientDato) {
        if (ClientDato.idTipoMedicion == 2) {
            TotalMonto += ClientDato.totalMonto;
        }
    });
    doc.autoTable({
        body: [
            ['Servicios Gravados:', '¢' + TotalMonto,],
            ['Servicios Excentos:', '¢0.00'],
            ['Total Gravado:', '¢' + TotalMonto],
            ['Total Excento:', '¢0.00'],
            ['IVA:', '¢' + (TotalMonto * 0.13).toFixed(2)],
            ['Descuento:', '¢0.00'],
            ['TOTAL:', '¢' + (TotalMonto * 0.13 + TotalMonto).toFixed(2)],
        ],
        theme: 'plain',
        tableWidth: 'auto',
        //halign: 'right',
        //startY: 130,
        columnStyles: {
            0: {
                halign: 'right',
                cellWidth: 'wrap',
                fontStyle: 'bold',
                cellPadding: { top: 1, right: 2, bottom: 1, left: 50 }
            },
            1: {
                halign: 'right',
                cellWidth: 'wrap',
                cellPadding: { top: 1, right: 6, bottom: 1, left: 0 }
            }
        },
        bodyStyles: {
            textColor: '#000000',
            halign: 'right',
            fontSize: 8,
        },
        styles: {
            //columnWidth: "wrap"
        },
    });

    doc.autoTable({
        body: [
            [
                {
                    content: 'Observaciones',
                    styles: {
                        halign: 'left',
                        fontSize: 12,
                        fontStyle: 'bold'
                    }
                }
            ],
            [
                {
                    content: 'Toda cuenta devengará intereses de 2,5% mensual por mora.'
                        + '                                                                                    '
                        + 'Es DEBER del usuario solicitar semestralmente la incorporación de sus planes de'
                        + 'cultivo del Plan de Riego antes de Abril y el 15 de Octubre de cada año.',
                    styles: {
                        halign: 'left'
                    }
                }
            ],
        ],
        theme: "plain"
    });
    console.log('PDF Creado: ' + datos.email);
    let date = new Date()
    let day = date.getDate()
    dataUII = generateUUID()
    const rutaAbsoluta = path.resolve('public', 'PDFS')
    doc.save(rutaAbsoluta + '/' + datos.cedula + '-' + day + datos.año + dataUII + '.pdf') //rutaAbsoluta + '/' + datos.cedula + '-' + day + datos.año + '-' + dataUII + '.pdf'
    return (rutaAbsoluta + '/' + datos.cedula + '-' + day + datos.año + dataUII + '.pdf');
};

module.exports = {
    PDFEstadoCuenta: PDFEstadoCuenta
}
