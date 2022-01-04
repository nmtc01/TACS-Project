import Route from "../model/backend/route"
import { toUpper, toLower } from "../utils/utils"
import Element from "../model/backend/element"

export default function generateRoutes(routes: Array<Route>): string {
    let code = "";

    if(routes.length < 1) {
        return "";
    }
    
    code += generateRoutesHeader(routes[0].resource);
    code += "\n\n";

    routes.forEach((route) => {
        switch (route.method) {
            case "GET":
                code += generateGetRoute(route.path, route.resource); // TODO
                break;
            case "DELETE":
                code += generateDeleteRoute(route.path, route.resource); // TODO
                break;
            case "POST":
                code += generatePostRoute(route);
                break;
            case "PUT":
                code += generatePutRoute(route);
                break;
            default:
                break;
        }
        code += '\n\n';
    })

    code += generateRoutesFooter();

    return code;
}

function generateRoutesHeader(resource: string): string {
    return `const express = require('express');
const router = express.Router();

const { ${toUpper(resource)} } = require('../models/${toLower(resource)}');`
}

function generateRoutesFooter(): string {
    return `module.exports = router;`
}

function generateGetRoute(path: string[], resource: string): string {
    const variables: string[] = [];
    path.forEach((item) => {
        const variable = item.slice(1);
        if (item.charAt(0) === ":")
            variables.push(`'${variable}': req.params.${variable}`);
    });
    let finalPath = '/';

    if(path.length > 1) {
        finalPath = `/${path.slice(1).join('/')}`
    }

    return (
        `router.get('${finalPath}', async function(_, res) {
    try {
        res.send(await ${toUpper(resource)}.find${variables.length > 0 ? 'One' : ''}({${variables}}));
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
    let finalPath = '/';

    if(path.length > 1) {
        finalPath = `/${path.slice(1).join('/')}`
    }

    return (
        `router.delete('${finalPath}', async function(req, res) {
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

function generatePostRoute(route: Route): string {
    const variables: string[] = [];
    route.path.forEach((item) => {
        const variable = item.slice(1);
        if (item.charAt(0) === ":")
            variables.push(`'${variable}': req.params.${variable}`);
    });
    
    let finalPath = '/';

    if(route.path.length > 1) {
        finalPath = `/${route.path.slice(1).join('/')}`
    }

    if (!route.data) {
        throw new Error("Property data is mandatory for a POST route!")
    }

    const resourceDataStatements: Array<string> = route.data.map((element: Element) => {
        return `${element.name}: req.body.${element.name}`;
    })

    return (
        `router.post('${finalPath}', function (req, res) {
    const ${route.resource}_data = {
        ${resourceDataStatements.join(',\n\t\t')}
    };
  
    ${toUpper(route.resource)}.create(${route.resource}_data, function (err, resource) {
        if (err) {
            console.log(err);
            return res.send({ message: '500 - Server Error', errors: [] });
        }
    
        return res.send("Successfully added new ${toUpper(route.resource)}!");
    });
});`
    );
}

function generatePutRoute(route: Route): string {
    const variables: string[] = [];
    route.path.forEach((item) => {
        const variable = item.slice(1);
        if (item.charAt(0) === ":")
            variables.push(`'${variable}': req.params.${variable}`);
    });

    let finalPath = '/';

    if(route.path.length > 1) {
        finalPath = `/${route.path.slice(1).join('/')}`
    }

    if (!route.data) {
        throw new Error("Property data is mandatory for a PUT route!")
    }

    const resourceDataStatements: Array<string> = route.data.map((element: Element) => {
        return `${element.name}: req.body.${element.name}`;
    })

    return (
        `router.put('${finalPath}}', function (req, res) {
    const ${route.resource}_data = {
        ${resourceDataStatements.join(',\n\t\t')}
    };
  
    ${toUpper(route.resource)}.create(${route.resource}_data, function (err, resource) {
        if (err) {
            console.log(err);
            return res.send({ message: '500 - Server Error', errors: [] });
        }
    
        return res.send("Successfully added new ${toUpper(route.resource)}!");
    });
});`
    );
}