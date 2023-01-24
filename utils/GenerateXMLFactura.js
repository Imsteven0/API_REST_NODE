const xml2js = require('xml2js');

async function GenerateXMLFacturacion() {

    //var Empresa = {$: {xsi: (type="xsd:string").toString()}, _: "senara"};

    let obj = {
        'soapenv:Envelope': {
            $: {
                'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
                'xmlns:ws': 'http://ws.interfacesSoin'
            },
            'soapenv:Header': {
            },
            'soapenv:Body': {
            },
            'ws:sendToSoinXML': {
                $: {
                    'soapenv:encodingStyle': 'http://schemas.xmlsoap.org/soap/encoding/'
                }
            },
             Empresa : {$: {'xsi:type':'xsd:string'}, _: "senara"},
             EcodigoSDC : {$: {'xsi:type':'xsd:double'}, _: "113"},
             Num_Interfaz : {$: {'xsi:type':'xsd:double'}, _: "1000"},
        }
    }

    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);


    console.log(xml)
} 

module.exports = {
    GenerateXMLFacturacion: GenerateXMLFacturacion
}


//*
//var obj = {name: "Super", Surname: "Man", age: 23};
//var builder = new xml2js.Builder();
//var xml = builder.buildObject(obj);
//*