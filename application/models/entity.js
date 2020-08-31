const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// let rolesValidos = {
//     values: ['ADMIN_ROLE', 'USER_ROLE'],
//     message: '{VALUE} no es un rol válido'
// };


let Schema = mongoose.Schema;


let entitySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    entityKey: {
        type: String,
        default: null
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});


entitySchema.methods.toJSON = function() {

    let entity = this;
    let entityObject = entity.toObject();
    delete entityObject.password;

    return entityObject;
}

entitySchema.statics.getEntity = function(req,res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });


        });

  };


entitySchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });

module.exports = mongoose.model('Entity', entitySchema);