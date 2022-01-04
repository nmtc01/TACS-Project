import Route from "../model/backend/route"
import Table from "../model/database/table";
import { toUpper, toLower } from "../utils/utils"

// Argument = all routes do mesmo resource e retornar código de um ficheiro a ser produzido
export default function generateRoutes(routes: Array<Route>): string {
    let code = "";

    if(routes.length < 1) {
        return "";
    }
    
    code += generateRoutesHeader(routes[0].resource);

    routes.forEach((route) => {
        switch (route.method) {
            case "GET":
                code += generateGetRoute(route.path, route.resource);
                break;
            case "DELETE":
                code += generateDeleteRoute(route.path, route.resource);
                break;
            case "POST":
                code += generatePostRoute(route.path, route.resource);
                break;
            case "PUT":
                code += generatePutRoute(route.path, route.resource);
                break;
            default:
                break;
        }
        code += '\n\n';
    })

    return code;
}

function generateRoutesHeader(resource: string): string {
    return `const express = require('express');
const router = express.Router();

const { ${toLower(resource)} } = require('../models/${toUpper(resource)}');`
}

function generateGetRoute(path: string[], resource: string): string {
    const variables: string[] = [];
    path.forEach((item) => {
        const variable = item.slice(1);
        if (item.charAt(0) === ":")
            variables.push(`'${variable}': req.params.${variable}`);
    });
    const finalPath = path.join('/');

    return (
        `router.get('${finalPath}}', async function(_, res) {
    try {
        res.send(await ${toUpper(resource)}.find${variables.length > 0 ? 'One' : ''}({${variables}})});
    } catch(err) {
        console.log(err);
    }
});`
    );
}

function generateDeleteRoute(path: string[], resource: string): string {
    const variables: string[] = [];
    path.forEach((item) => {
        const variable = item.slice(1);
        if (item.charAt(0) === ":")
            variables.push(`'${variable}': req.params.${variable}`);
    });
    const finalPath = path.join('/');

    return (
        `router.delete('${finalPath}}', async function(req, res) {
    try {
        const resource = await ${toUpper(resource)}.deleteOne({ 'id': req.params.id });
        return res.send("Deleted successfully: " + resource);
    }
    catch(err) {
        console.log(err);
    }
});`
    );
}

function generatePostRoute(path: string[], resource: string): string {
    const variables: string[] = [];
    path.forEach((item) => {
        const variable = item.slice(1);
        if (item.charAt(0) === ":")
            variables.push(`'${variable}': req.params.${variable}`);
    });
    const finalPath = path.join('/');

    return (
        `router.post('${finalPath}}', function (req, res) {
    const ${resource}_data = {
        id: req.body.id,
        name: req.body.name,
        address: req.body.address
    };
  
    User.create(user_data, function (err, user) {
        if (err) {
            console.log(err);
            return res.send({ message: '500 - Server Error', errors: [] });
        }
    
        return res.send({ id: user.id, name: user.name, address: user.address });
    });
});`
    );
}

function generatePutRoute(path: string[], resource: string): string {
    const variables: string[] = [];
    path.forEach((item) => {
        const variable = item.slice(1);
        if (item.charAt(0) === ":")
            variables.push(`'${variable}': req.params.${variable}`);
    });
    const finalPath = path.join('/');

    return (
        `router.put('', function (req, res) {
    const user_data = {
        id: req.body.id,
        name: req.body.name,
        address: req.body.address
    };
    
    User.create(user_data, function (err, user) {
        if (err) {
        console.log(err);
        return res.send({ message: '500 - Server Error', errors: [] });
        }
    
        return res.send({ id: user.id, name: user.name, address: user.address });
    });
});`
    );
}