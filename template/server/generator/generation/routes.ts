import Route from "../model/backend/route"
import { toUpper, toLower } from "../utils/utils"
import Element from "../model/backend/element"
import config from "../config/config.json"
import { MethodType } from "../model/backend/types"

export default function generateRoutes(routes: Array<Route>): string {
    let code = "";

    if (routes.length < 1) {
        return "";
    }

    const resourceName = routes[0].resource;
    code += generateRoutesHeader(resourceName);
    code += "\n";

    routes.forEach((route) => {
        switch (route.method) {
            case "GET":
                code += generateGetRoute(route);
                break;
            case "DELETE":
                code += generateDeleteRoute(route);
                break;
            case "POST":
                code += generatePutOrPostRoute(route, 'POST');
                break;
            case "PUT":
                code += generatePutOrPostRoute(route, 'PUT');
                break;
            default:
                break;
        }
        code += '\n\n';
    });

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

function generateGetRoute(route: Route): string {
    const variables: string[] = [];
    for(let i = 0; i < route.path.length; i++) {
        const variable = route.path[i].slice(1);
        if (route.path[i].charAt(0) === ":") {
            variables.push(`'_${variable}': req.params.${variable}`);
            break;
        }
    };
    let finalPath = '/';
    if (route.path.length > 1) {
        finalPath = `/${route.path.slice(1).join('/')}`;
    }

    return (
        `router.get('${finalPath}', async function(req, res) {
    try {
        res.send(await ${toUpper(route.resource)}.find${variables.length > 0 ? 'One' : ''}({${variables}}));
    } catch (err) {
        console.log(err);
    }
});`
    );
}

function generateDeleteRoute(route: Route): string {
    let finalPath = '/';
    if (route.path.length > 1) {
        finalPath = `/${route.path.slice(1).join('/')}`
    }

    return (
        `router.delete('${finalPath}', async function(req, res) {
    try {
        const resource = await ${toUpper(route.resource)}.deleteOne({ '_id': req.params.id });
        return res.send("Deleted successfully: " + resource);
    }
    catch (err) {
        console.log(err);
    }
});`
    );
}

function generatePutOrPostRoute(route: Route, method: 'PUT' | 'POST'): string {
    const variables: string[] = [];
    route.path.forEach((item) => {
        const variable = item.slice(1);
        if (item.charAt(0) === ":")
            variables.push(`'${variable}': req.params.${variable}`);
    });

    const finalPath = '/';

    if (!route.data) {
        throw new Error(`Property data is mandatory for a ${method} route!`)
    }

    const resourceDataStatements: Array<string> = route.data.map((element: Element) => {
        return `${element.name}: req.body.${element.name}`;
    })

    return (
        `router.${method.toLowerCase()}('${finalPath}', function (req, res) {
    const ${route.resource}_data = {
        ${resourceDataStatements.join(',\n\t\t')}
    };
  
    ${toUpper(route.resource)}.${method == 'POST' ? 'create' : 'updateOne'}(${route.resource}_data, function (err, resource) {
        if (err) {
            console.log(err);
            return res.send({ message: '500 - Server Error', errors: [] });
        }
    
        return res.send(${method == 'POST' ? 'resource._id' : true});
    });
});`
    );
}

export function generateConfigRoute(): string {
    return `
router.get('/config', function (req, res, next) {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);  
  res.json(${JSON.stringify(config)});
}); 
`;
}

export function generateResourcesRoute(): string {
    return `
router.get('/resources', function (req, res, next) {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  
	let resources = JSON.parse('${JSON.stringify(config.resources)}');
	let names = [];

  for (let i = 0; i < resources.length; i++) {
        names.push(resources[i].name)
  }

  res.json(names);
}); 
`;
}

export function generateAttributesRoute(): string {
    return `
router.get('/attributes', function (req, res, next) {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  
	let config = JSON.parse('${JSON.stringify(config)}');
	let resource = req.query.resource;
	let attributes = [];

  for (let i = 0; i < config.resources.length; i++) {
        if (config.resources[i].name === resource) {
            attributes = config.resources[i].attributes;
            break;
        }
    }

  res.json(attributes);
}); 
`;
}

function generateHasMethodRoute(method: MethodType): string {
    
    const methodArray = method.split("-");
    const endpoint = `/has${methodArray.join("")}`;

    return `
router.get('${endpoint}', async function (req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    let config = JSON.parse('${JSON.stringify(config)}');
    let resource = req.query.resource;

    const pages = config.website.pages;
    let hasMethod = false;
    if (pages) {
        for(let i = 0; i < pages.length; i++) {
            if (pages[i].resource === resource && pages[i].method === "${method}") {
                hasMethod = true;
                break;
            }
        }
    }

    res.send(hasMethod);
}); 
`;  
}

function generateHasGetAllRoute(): string {
    return generateHasMethodRoute("Get-all");
}

function generateHasGetOneRoute(): string {
    return generateHasMethodRoute("Get-one");
}

function generateHasAddRoute(): string {
    return generateHasMethodRoute("Add");
}

function generateHasUpdateRoute(): string {
    return generateHasMethodRoute("Update");
}

function generateHasDeleteRoute(): string {
    return generateHasMethodRoute("Delete");
}

export function generateHasRoutes(): string {
    let code = generateHasGetAllRoute() + '\n';
    code += generateHasGetOneRoute() + '\n';
    code += generateHasAddRoute() + '\n';
    code += generateHasUpdateRoute() + '\n';
    code += generateHasDeleteRoute() + '\n';
    return code;
}
