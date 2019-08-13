'use strict'
const DB = require('../../db')
const { error, response } = require('../../../handlers')


const errors = error()
let message
module.exports = async() => {

    async function updateFile(req, res, next) {

        const params = req.params

        if (!req.files) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No selecciono nada',
                errors: { message: 'Debe de seleccionar una imagen' }
            });
        }

        const file = req.files.img;

        const allowedFiles = []

        const splitName = file.name.split('.');
        const fileExtension = splitName[splitName.length - 1];

        const fileName = `${ params.id }-${ new Date().getMilliseconds() }.${ fileExtension }`;


        // Mover el archivo del temporal a un path
        // const path = `./public/uploads/${ params.tipo }/${ fileName }`;
        const path = `./public/uploads/${ fileName }`;
        file.mv(path, err => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al mover archivo',
                    errors: err
                });
            }


            //subirPorTipo(tipo, id, nombreArchivo, res);

            // res.status(200).json({
            //     ok: true,
            //     mensaje: 'Archivo movido',
            //     extensionArchivo: extensionArchivo
            // });


        })



        console.log(fileName, path)






    }

    return {
        updateFile
    }
}

async function subirPorTipo(type, id, fileName, res) {

    const {
        Producer,
        Client,
        Product,
        Organization
    } = await DB()


    if (type === 'producer') {

    }

    if (type === 'client') {

    }

    if (type === 'product') {

    }

    if (type === 'organization') {

    }

    if (tipo === 'usuarios') {

        Usuario.findById(id, (err, usuario) => {

            if (!usuario) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Usuario no existe',
                    errors: { message: 'Usuario no existe' }
                });
            }


            var pathViejo = './uploads/usuarios/' + usuario.img;

            // Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            usuario.img = nombreArchivo;

            usuario.save((err, usuarioActualizado) => {

                usuarioActualizado.password = ':)';

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    usuario: usuarioActualizado
                });

            })


        });

    }

    if (tipo === 'medicos') {

        Medico.findById(id, (err, medico) => {

            if (!medico) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Médico no existe',
                    errors: { message: 'Médico no existe' }
                });
            }

            var pathViejo = './uploads/medicos/' + medico.img;

            // Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            medico.img = nombreArchivo;

            medico.save((err, medicoActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de médico actualizada',
                    medico: medicoActualizado
                });

            })

        });
    }

    if (tipo === 'hospitales') {

        Hospital.findById(id, (err, hospital) => {

            if (!hospital) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Hospital no existe',
                    errors: { message: 'Hospital no existe' }
                });
            }

            var pathViejo = './uploads/hospitales/' + hospital.img;

            // Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            hospital.img = nombreArchivo;

            hospital.save((err, hospitalActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de hospital actualizada',
                    hospital: hospitalActualizado
                });

            })

        });
    }


}