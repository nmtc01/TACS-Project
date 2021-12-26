import Database from './model/database/database';
import Backend from './model/backend/backend';

export default class Generator {
    constructor(private database: Database, private backend: Backend) {
        database.print();
        backend.print();
    }
}

/**
 * Tasks TODO: 
 *  
 * 1- Criar ficheiros p/ models a partir Database obj
 * 2- Criar ficheiros p/ rotas a partir Backend obj
 * 3- Template strings 
 * 4- Colocar template strings nos sitios anotados
 * 
 */