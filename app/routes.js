var AuthenticationController = require('./controllers/authentication'), 
   
    DatosfijosController = require('./controllers/datosfijos'),
    ParticipaController = require('./controllers/participa'),
    ConferenciaController = require('./controllers/conferencia'),
    PersonalController = require('./controllers/personal'),
    EventoController = require('./controllers/eventos'),
    PerfilController = require('./controllers/perfil'),
    EmpresaController = require('./controllers/empresa'),
    ModuloController = require('./controllers/moduloxx'),
    CatalogoController = require('./controllers/catalogo'),
    TarifaController = require('./controllers/tarifa'),
    SuscriptorController = require('./controllers/suscriptor'),
    busController = require('./controllers/bus'),
    PermisoController = require('./controllers/permiso'),
    DtarifaController = require('./controllers/dtarifa'),
    AfiliadoController = require('./controllers/afiliado'),
    ComprasaldoController = require('./controllers/comprasaldo'),
    MailController = require('./controllers/mail'),
    QrimagenController = require('./controllers/qrimagen'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');
    PersonalController = require('./controllers/personal');
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
  //  var EmpresaModel = require('./models/empresa');

module.exports = function(app){
 
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        participaRoutes = express.Router(),
        conferenciaRoutes = express.Router(),
        moduloRoutes = express.Router(),
        catalogoRoutes = express.Router(),
        tarifaRoutes = express.Router(),
        datosfijosRoutes = express.Router(),
        eventoRoutes = express.Router(),
        perfilRoutes = express.Router(),
        mailRoutes = express.Router(),
        empresaRoutes = express.Router(),
        permisoRoutes = express.Router(),
        dtarifaRoutes = express.Router(),
        suscriptorRoutes = express.Router(),
        comprasaldoRoutes = express.Router(),
        qrimagenRoutes = express.Router(),
        busRoutes = express.Router(),
        afiliadoRoutes = express.Router(),
        mailRoutes = express.Router();
        personalRoutes = express.Router();

    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
 
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
 
   


//-----------------------------------PERSONAL
apiRoutes.use('/personals', personalRoutes);
personalRoutes.get('/', PersonalController.getPersonal);
personalRoutes.get('/:email',  PersonalController.getPersonal);
personalRoutes.post('/:recordID',  PersonalController.creaPersonal2s);
personalRoutes.delete('/:recordID/:userID',  PersonalController.deletePersonal);

//-------------------------------------------------
//-----------------------------------EMPRESA----------------------------------

apiRoutes.use('/empresas', empresaRoutes);
empresaRoutes.get('/', EmpresaController.getEmpresa);
empresaRoutes.get('/:nit',  EmpresaController.getEmpresa);
empresaRoutes.post('/:nit',  EmpresaController.creaEmpresas);
empresaRoutes.delete('/:nit',  EmpresaController.deleteEmpresa);

//-----------------------------------SUSCRIPTOR----------------------------------

apiRoutes.use('/suscriptors', suscriptorRoutes);
suscriptorRoutes.get('/', SuscriptorController.getSuscriptor);
suscriptorRoutes.get('/:nodpi',  SuscriptorController.getSuscriptor);
suscriptorRoutes.post('/:nodpi',  SuscriptorController.creaSuscriptors);
suscriptorRoutes.delete('/:nodpi',  SuscriptorController.deleteSuscriptor);

//-----------------------------------SUSCRIPTOR----------------------------------

apiRoutes.use('/afiliados', afiliadoRoutes);
afiliadoRoutes.get('/:id', AfiliadoController.getAfiliado);
afiliadoRoutes.get('/:id/:id2',  AfiliadoController.getAfiliado);
afiliadoRoutes.post('/:id',  AfiliadoController.creaAfiliados);
afiliadoRoutes.delete('/:id/:id2',  AfiliadoController.deleteAfiliado);

//-----------------------------------BUS----------------------------------

apiRoutes.use('/buss', busRoutes);
busRoutes.get('/:id/:id2', busController.getBus);
busRoutes.get('/:id/:id2/:id3',  busController.getBus);
busRoutes.post('/:id',  busController.creaBuss);
busRoutes.delete('/:id/:id2/:id3',  busController.deleteBus);

//-----------------------------------COMPRA DE SALDO----------------------------------

apiRoutes.use('/comprasaldos', comprasaldoRoutes);
comprasaldoRoutes.get('/:id', ComprasaldoController.getComprasaldo);
comprasaldoRoutes.get('/:id/:id2',  ComprasaldoController.getComprasaldo);
comprasaldoRoutes.post('/:id',  ComprasaldoController.creaComprasaldos);
comprasaldoRoutes.delete('/:id/:id2',  ComprasaldoController.deleteComprasaldo);

//-----------------------------------EVENTOS
apiRoutes.use('/eventos', eventoRoutes);
eventoRoutes.get('/', EventoController.getEvento);
eventoRoutes.get('/:id',  EventoController.getEvento);
eventoRoutes.post('/:recordID',  EventoController.creaEvento2s);
eventoRoutes.delete('/:recordID/:userID',  EventoController.deleteEvento);


//-----------------------------------PERFIL
apiRoutes.use('/perfils', perfilRoutes);
perfilRoutes.get('/', PerfilController.getPerfil);
perfilRoutes.get('/:id',  PerfilController.getPerfil);
perfilRoutes.post('/:recordID',  PerfilController.creaPerfil2s);
perfilRoutes.delete('/:recordID/:userID',  PerfilController.deletePerfil);


//-----------------------------------PARTICIPA
apiRoutes.use('/participas', participaRoutes);
participaRoutes.get('/:id',  ParticipaController.getParticipa);
participaRoutes.get('/:id/:id2',  ParticipaController.getParticipa);
participaRoutes.post('/:id',  ParticipaController.creaParticipa2s);
participaRoutes.delete('/:id/:userID',  ParticipaController.deleteParticipa);

//-----------------------------------CONFERENCIAS
apiRoutes.use('/conferencias', conferenciaRoutes);
conferenciaRoutes.get('/:id',  ConferenciaController.getConferencia);
conferenciaRoutes.get('/:id/:id2',  ConferenciaController.getConferencia);
conferenciaRoutes.post('/:id',  ConferenciaController.creaConferencia2s);
conferenciaRoutes.delete('/:id/:userID', ConferenciaController.deleteConferencia);

//-----------------------------------MAIL
apiRoutes.use('/mails', mailRoutes);
mailRoutes.post('/:id',  MailController.getMail);

//-----------------------------------QR
apiRoutes.use('/qrs',qrimagenRoutes);
qrimagenRoutes.get('/:key',  QrimagenController.getQR);

//-----------------------------------PERMISOS
apiRoutes.use('/permisos', permisoRoutes);
permisoRoutes.get('/:id',  PermisoController.getPermiso);
permisoRoutes.get('/:id/:id2',  PermisoController.getPermiso);
permisoRoutes.post('/:id',  PermisoController.creaPermiso2s);
permisoRoutes.delete('/:id/:userID',  PermisoController.deletePermiso);

//-----------------------------------MODULO
apiRoutes.use('/modulos', moduloRoutes);
moduloRoutes.get('/', ModuloController.getModuloxx);
moduloRoutes.get('/:id',  ModuloController.getModuloxx);
moduloRoutes.post('/:recordID',  ModuloController.creaModuloxx2s);
moduloRoutes.delete('/:recordID/:userID',  ModuloController.deleteModuloxx);

//-----------------------------------CATALOGO
apiRoutes.use('/catalogos', catalogoRoutes);
catalogoRoutes.get('/', CatalogoController.getCatalogo);
catalogoRoutes.get('/:id',  CatalogoController.getCatalogo);
catalogoRoutes.post('/:recordID',  CatalogoController.creaCatalogo2s);
catalogoRoutes.delete('/:recordID/:userID',  CatalogoController.deleteCatalogo);

//-----------------------------------TARIFA
apiRoutes.use('/tarifas', tarifaRoutes);
tarifaRoutes.get('/', TarifaController.getTarifa);
tarifaRoutes.get('/:id',  TarifaController.getTarifa);
tarifaRoutes.post('/:recordID',  TarifaController.creaTarifa2s);
tarifaRoutes.delete('/:recordID/:userID',  TarifaController.deleteTarifa);

//-----------------------------------DTARIFA
apiRoutes.use('/dtarifas', dtarifaRoutes);
dtarifaRoutes.get('/:id',  DtarifaController.getDtarifa);
dtarifaRoutes.get('/:id/:id2',  DtarifaController.getDtarifa);
dtarifaRoutes.post('/:id',  DtarifaController.creaDtarifa2s);
dtarifaRoutes.delete('/:id/:userID',  DtarifaController.deleteDtarifa);


//-----------------------------------datos combo fijos
apiRoutes.use('/datosfijos', datosfijosRoutes);
datosfijosRoutes.get('/:id',  DatosfijosController.getCombofijo);
datosfijosRoutes.get('/:id/:id2',  DatosfijosController.getCombofijo);

    app.use('/api', apiRoutes);
 
}