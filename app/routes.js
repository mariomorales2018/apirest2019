var AuthenticationController = require('./controllers/authentication'), 
    OraController = require('./controllers/oraclesqlx'), 
    DatosfijosController = require('./controllers/datosfijos'),
    ParticipaController = require('./controllers/participa'),
    Participa2Controller = require('./controllers/participa2'),
    ConferenciaController = require('./controllers/conferencia'),
    DcatalogoController = require('./controllers/dcatalogo'),
    PersonalController = require('./controllers/personal'),
    EventoController = require('./controllers/eventos'),
    PerfilController = require('./controllers/perfil'),
    EmpresaController = require('./controllers/empresa'),
    ModuloController = require('./controllers/moduloxx'),
    CatalogoController = require('./controllers/catalogo'),
    TarifaController = require('./controllers/tarifa'),
    NuevosalonController = require('./controllers/nuevosalon'),
    SuscriptorController = require('./controllers/suscriptor'),
    busController = require('./controllers/bus'),
    PermisoController = require('./controllers/permiso'),
    EstudianteovController = require('./controllers/estudianteov'),
    EstudiantevtController = require('./controllers/estudiantevt'),
    EstudiantepcbController = require('./controllers/estudiantepcb'),
    DtarifaController = require('./controllers/dtarifa'),
    AfiliadoController = require('./controllers/afiliado'),
    ComprasaldoController = require('./controllers/comprasaldo'),
    MailController = require('./controllers/mail'),
    QrimagenController = require('./controllers/qrimagen'),
    AsignapcbController = require('./controllers/asignapcb'),
    TipounidadController = require('./controllers/tipounidad'),
    DepartamentoController = require('./controllers/departamento'),
    EdificiousacController = require('./controllers/unidadedificio'),
    PeriodousacController = require('./controllers/unidadperiodo'),
    EdificiosalonController = require('./controllers/unidadedificiosalon'),
    UnidadplanController = require('./controllers/unidadplan'),
    FacultadmateriaController = require('./controllers/facultadmateria'),
    UnidadacademicaController = require('./controllers/unidadacademica'),
    AsignaestudianteController = require('./controllers/asignaestudiante'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport'),
    PersonalController = require('./controllers/personal');
    //UserController = require('./controllers/sun_facultad');
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
  //  var EmpresaModel = require('./models/empresa');

module.exports = function(app){
 
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        participaRoutes = express.Router(),
        participa2Routes = express.Router(),
        conferenciaRoutes = express.Router(),
        dcatalogoRoutes = express.Router(),
        moduloRoutes = express.Router(),
        catalogoRoutes = express.Router(),
        tarifaRoutes = express.Router(),
        nuevosalonRoutes = express.Router(),
        datosfijosRoutes = express.Router(),
        eventoRoutes = express.Router(),
        perfilRoutes = express.Router(),
        mailRoutes = express.Router(),
        estudianteovRoutes = express.Router(),
        estudiantevtRoutes = express.Router(),
        estudiantepcbRoutes = express.Router(),
        empresaRoutes = express.Router(),
        permisoRoutes = express.Router(),
        oraRoutes = express.Router(),
        dtarifaRoutes = express.Router(),
        suscriptorRoutes = express.Router(),
        comprasaldoRoutes = express.Router(),
        qrimagenRoutes = express.Router(),
        busRoutes = express.Router(),
        afiliadoRoutes = express.Router(),
        departamentoRoutes = express.Router(),
        mailRoutes = express.Router(),
        personalRoutes = express.Router(),
        asignapcbRoutes = express.Router(),
        tipounidadRoutes = express.Router(),
        edificiousacRoutes = express.Router(),
        periodousacRoutes = express.Router(),
        unidadacademicaRoutes = express.Router(),
        facultadmateriaRoutes = express.Router(),
        edificiosalonRoutes = express.Router(),
        unidadplanRoutes = express.Router(),
        asignaestudianteRoutes = express.Router();
        apiRoutes.use('/auth', authRoutes);
        authRoutes.post('/register', AuthenticationController.register);
        authRoutes.post('/login', requireLogin, AuthenticationController.login);
 
        authRoutes.get('/protected', requireAuth, function(req, res){
            res.send({ content: 'Success'});
        });
 
   


//-----------------------------------PERSONAL
apiRoutes.use('/personals', personalRoutes);
personalRoutes.get('/', PersonalController.getPersonal);
personalRoutes.get('/:email/:id2', PersonalController.getPersonal);
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
perfilRoutes.get('/:id1/:id2',  PerfilController.getPerfil);
perfilRoutes.post('/:recordID',  PerfilController.creaPerfil2s);
perfilRoutes.delete('/:recordID/:userID',  PerfilController.deletePerfil);


//-----------------------------------PARTICIPA
apiRoutes.use('/participas', participaRoutes);
participaRoutes.get('/:id',  ParticipaController.getParticipa);
participaRoutes.get('/:id/:id2',  ParticipaController.getParticipa);
participaRoutes.post('/:id',  ParticipaController.creaParticipa2s);
participaRoutes.delete('/:id/:userID',  ParticipaController.deleteParticipa);


//-----------------------------------PARTICIPA2
apiRoutes.use('/participa2s', participa2Routes);
participa2Routes.get('/:id',  Participa2Controller.getParticipa2);
participa2Routes.get('/:id/:id2',  Participa2Controller.getParticipa2);
participa2Routes.post('/:id',  Participa2Controller.creaParticipa22s);
participa2Routes.delete('/:id/:userID',  Participa2Controller.deleteParticipa2);
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
catalogoRoutes.get('/:id/:id2',  CatalogoController.getCatalogo);
catalogoRoutes.post('/:recordID',  CatalogoController.creaCatalogo2s);
catalogoRoutes.delete('/:recordID/:userID',  CatalogoController.deleteCatalogo);


//-----------------------------------Dcatalogo
apiRoutes.use('/dcatalogos', dcatalogoRoutes);
dcatalogoRoutes.get('/:id',  DcatalogoController.getDcatalogo);

dcatalogoRoutes.get('/:id/:id2',  DcatalogoController.getDcatalogo);
dcatalogoRoutes.post('/:id',  DcatalogoController.creaDcatalogo2s);
dcatalogoRoutes.delete('/:id/:userID',  DcatalogoController.deleteDcatalogo);

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
datosfijosRoutes.get('/:id/:id2/:id3',  DatosfijosController.getCombofijo);
//datosfijosRoutes.get('/:id/:id2/:id3',  DatosfijosController.getCombofijo);
//---------------------------------------estudiantes ov
apiRoutes.use('/estudianteov', estudianteovRoutes);
estudianteovRoutes.get('/',  EstudianteovController.getEstudianteov);
estudianteovRoutes.get('/:codigo',  EstudianteovController.getEstudianteov);

//---------------------------------------estudiantes vt
apiRoutes.use('/estudiantevt', estudiantevtRoutes);
estudiantevtRoutes.get('/',  EstudiantevtController.getEstudiantevt);
estudiantevtRoutes.get('/:codigo',  EstudiantevtController.getEstudiantevt);
estudiantevtRoutes.post('/:recordID',  EstudiantevtController.creaEstudiantevts);

//---------------------------------------estudiantes PCB
apiRoutes.use('/estudiantepcb', estudiantepcbRoutes);
estudiantepcbRoutes.get('/',  EstudiantepcbController.getEstudiantepcb);
estudiantepcbRoutes.get('/:codigo',  EstudiantepcbController.getEstudiantepcb);

/*
apiRoutes.use('/oracle', userRoutes);
userRoutes.get('/', UserController.getUser);
userRoutes.get('/:id',  UserController.getUser);
userRoutes.post('/:recordID',  UserController.creaUser2s);
userRoutes.delete('/:recordID/:userID',  UserController.deleteUser);
*/
/*

apiRoutes.use('/oracle2', oraRoutes);
oraRoutes.get('/:txt',  OraController.getoraclesqlxx);
*/

//-----------------------------------TIPO UNIDAD
apiRoutes.use('/tipounidads', tipounidadRoutes);
tipounidadRoutes.get('/', TipounidadController.getTipounidad);
tipounidadRoutes.get('/:id',  TipounidadController.getTipounidad);
tipounidadRoutes.post('/:recordID',  TipounidadController.creaTipounidad2s);
tipounidadRoutes.delete('/:recordID/:userID',  TipounidadController.deleteTipounidad);


//-----------------------------------unidad academica
apiRoutes.use('/unidadacademicas', unidadacademicaRoutes);
unidadacademicaRoutes.get('/:id',  UnidadacademicaController.getUnidadacademica);

unidadacademicaRoutes.get('/:id/:id2',  UnidadacademicaController.getUnidadacademica);
unidadacademicaRoutes.post('/:id',  UnidadacademicaController.creaUnidadacademica2s);
unidadacademicaRoutes.delete('/:id/:userID',  UnidadacademicaController.deleteUnidadacademica);

//-----------------------------------ASIGNA PCB
apiRoutes.use('/asignapcbs', asignapcbRoutes);
asignapcbRoutes.get('/', AsignapcbController.getAsignapcb);
asignapcbRoutes.get('/:id',  AsignapcbController.getAsignapcb);
asignapcbRoutes.get('/:id/:id2',  AsignapcbController.getAsignapcb);
asignapcbRoutes.get('/:id/:id2/:id3',  AsignapcbController.getAsignapcb);
asignapcbRoutes.post('/:recordID',  AsignapcbController.creaAsignapcb2s);
asignapcbRoutes.delete('/:recordID/:userID',  AsignapcbController.deleteAsignapcb);


//-----------------------------------unidad edificio 
apiRoutes.use('/unidadedificios',edificiousacRoutes);
edificiousacRoutes.get('/:id',  EdificiousacController.getUnidadedificio);
edificiousacRoutes.get('/:id2/:id3',  EdificiousacController.getUnidadedificio);
edificiousacRoutes.post('/:recordID',  EdificiousacController.creaUnidadedificio2s);
edificiousacRoutes.delete('/:recordID/:userID',  EdificiousacController.deleteUnidadedificio);


//-----------------------------------unidad periodo
apiRoutes.use('/unidadperiodos',periodousacRoutes);
periodousacRoutes.get('/:id',  PeriodousacController.getUnidadperiodo);
periodousacRoutes.get('/:id2/:id3',  PeriodousacController.getUnidadperiodo);
periodousacRoutes.post('/:recordID',  PeriodousacController.creaUnidadperiodo2s);
periodousacRoutes.delete('/:recordID/:userID',  PeriodousacController.deleteUnidadperiodo);



//-----------------------------------unidad edificio salon
apiRoutes.use('/unidadedificiosalons',edificiosalonRoutes);
edificiosalonRoutes.get('/:id',  EdificiosalonController.getUnidadedificiosalon);
edificiosalonRoutes.get('/:id2/:id3/:id4',  EdificiosalonController.getUnidadedificiosalon);
edificiosalonRoutes.post('/:recordID',  EdificiosalonController.creaUnidadedificiosalon2s);
edificiosalonRoutes.delete('/:recordID/:userID',  EdificiosalonController.deleteUnidadedificiosalon);


//-----------------------------------unidad plan
apiRoutes.use('/unidadplans',unidadplanRoutes);
unidadplanRoutes.get('/:id',  UnidadplanController.getUnidadplan);
unidadplanRoutes.get('/:id2/:id3/:id4',  UnidadplanController.getUnidadplan);
unidadplanRoutes.post('/:recordID',  UnidadplanController.creaUnidadplan2s);
unidadplanRoutes.delete('/:recordID/:userID',  UnidadplanController.deleteUnidadplan);




//-----------------------------------FACULTAD MATERIA
apiRoutes.use('/facultadmaterias', facultadmateriaRoutes);
facultadmateriaRoutes.get('/', FacultadmateriaController.getFacultadmateria);
facultadmateriaRoutes.get('/:id/:id2',  FacultadmateriaController.getFacultadmateria);
facultadmateriaRoutes.post('/:recordID',  FacultadmateriaController.creaFacultadmateria2s);
facultadmateriaRoutes.delete('/:recordID/:userID',  FacultadmateriaController.deleteFacultadmateria);


//-----------------------------------ASIGNA ESTUDIANTE
apiRoutes.use('/asignaestudiantes', asignaestudianteRoutes);
asignaestudianteRoutes.get('/:id',  AsignaestudianteController.getAsignaestudiante);

//-----------------------------------DEPARTAMENTO
apiRoutes.use('/Departamentos', departamentoRoutes);
departamentoRoutes.get('/', DepartamentoController.getDepartamento);
departamentoRoutes.get('/:id',  DepartamentoController.getDepartamento);
departamentoRoutes.post('/:recordID',  DepartamentoController.creaDepartamento2s);
departamentoRoutes.delete('/:recordID/:userID',  DepartamentoController.deleteDepartamento);


//-----------------------------------NUEVO SALON
apiRoutes.use('/nuevosalons', nuevosalonRoutes);
nuevosalonRoutes.get('/', NuevosalonController.getNuevosalon);
nuevosalonRoutes.get('/:id',  NuevosalonController.getNuevosalon);
nuevosalonRoutes.post('/:recordID',  NuevosalonController.creaNuevosalon2s);
nuevosalonRoutes.delete('/:recordID/:userID',  NuevosalonController.deleteNuevosalon);

    app.use('/api', apiRoutes);
 
}