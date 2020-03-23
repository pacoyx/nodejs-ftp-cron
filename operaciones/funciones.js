const ftp = require("basic-ftp")
const moment = require('moment');
const setting = require('../config.js')

exports.UploadFileToFtp = async function () {

    const client = new ftp.Client()
    client.ftp.verbose = false

    try {
        await client.access({
            host: setting.h,
            user: setting.u,
            password: setting.p,
            secure: false
        });

        var fechaFile = moment().format('DDMMYYYY');
        var fileCredinka = "ABO_000000001_" + fechaFile + ".DAT";
        var rutaLocal = setting.rutalocal;

        var source = rutaLocal + fileCredinka;
        var destino = setting.rutaftp;

        //console.log(await client.list("/Desarrollo"))
        await client.ensureDir(destino)
        //await client.clearWorkingDir()
        client.trackProgress(info => console.log(info.bytesOverall))
        var respuesta = await client.uploadFrom(source, destino + fileCredinka);
        // await client.downloadTo("README_COPY.md", "README_FTP.md")
        client.trackProgress()

        return respuesta;

    } catch (err) {
        console.log(err)
    }
    client.close()






}