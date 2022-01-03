import Route from "../../backend/route"
import { toUpper, toLower } from "../../../utils/utils"

// Argument = all routes e retornar numero de strings igual ao numero de ficheiros a serem produzidos
export default function generateRoute(route: Route): string {
    let code = "";
    const header = generateHeader(route.resource);
    // TODO
    /*
        switch case das rotas
        generate(Method)Route para cada method
        um ficheiro de código por resource
    */
    const getRoute = generateGetRoute(route.name, route.path, route.resource);
    console.log(getRoute);

    return code;
}

function generateHeader(resource: string): string {
    return `const express = require('express');
const router = express.Router();

const { ${toLower(resource)} } = require('../models/${toUpper(resource)}');`
}

function generateGetRoute(name: string, path: string[], resource: string): string {
    const variables: string[] = [];
    path.forEach((item) => {
        const variable = item.slice(1);
        if (item.charAt(0) === ":")
            variables.push(`'${variable}': req.params.${variable}`);
    });
    const finalPath = path.join('/');

    return (
`/* GET ${name} */
router.get('${finalPath}}', async function(_, res) {
    try {
        res.send(await ${toUpper(resource)}.find${variables.length > 0 ? 'One' : ''}({${variables}})});
    } catch(err) {
        console.log(err);
    }
});`
    );
}