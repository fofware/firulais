"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const mongoDBoptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};
mongoose_1.default.connect(config_1.default.mongoDB.URI, mongoDBoptions);
const mdbConnection = mongoose_1.default.connection;
mdbConnection.on('open', () => {
    console.log('MongoDB Conectado Ok');
});
mdbConnection.on('error', (err) => {
    console.log('Error en la coneccion de MongoDB', err);
    process.exit(0);
});
