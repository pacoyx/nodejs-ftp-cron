const Operacion = require('./operaciones/funciones');
const cron = require('node-schedule');



console.log('iniciando el cron...');

cron.scheduleJob('1 * * * * *', async function () {
    console.log("Inicio de subida al ftp");
    let result = await Operacion.UploadFileToFtp().then(
        res => {
            console.log(new Date(), res);

        }
    );
    console.log("Termino subida al ftp");
});