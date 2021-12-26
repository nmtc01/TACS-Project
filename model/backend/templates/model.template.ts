import Attribute from "../../database/attribute";
import Table from "../../database/table"
import { type_ } from "../../database/types";

export default function generateModel(table: Table): string {

    if (table.name.length < 2) {
        return ""; // Invalid table name
    }

    const tableSufix = table.name.slice(1);

    const tableNameLC = table.name.charAt(0).toLowerCase() + tableSufix;
    const tableNameUC = table.name.charAt(0).toUpperCase() + tableSufix;


    return `
        const mongoose = require('mongoose');

        const ${tableNameLC}Schema = new mongoose.Schema({
            ${generateSchemaAttributes(table)
        }
        });
        
        const ${tableNameUC} = mongoose.model('User', ${tableNameLC}Schema);
        
        exports.${tableNameUC} = ${tableNameUC};
    `
}

function generateSchemaAttributes(table: Table): string {
    let generatedCode = "";

    table.attributes.forEach(attribute => {
        if (generatedCode) { 
            generatedCode += ',\n\t    '
        }
        generatedCode += `${attribute.name}: { type:  ${generateAttributeType(attribute.type)} }`
    });

    return generatedCode;
}

function generateAttributeType(type: type_) {
    switch (type) {
        case "number":
            return "Number";
        case "text":
            return "String";
        case "date":
            return "Date";
    }
}