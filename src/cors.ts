import { CorsOptions } from "cors";

const allowedOrigins: string[] = [

];

/**
 * Revisa si el origen de la petición se encuentra en la lista
 * de orígenes permitidos.
 * @param req 
 * @param callback 
 */
export function corsOptionsDelegate(req: any, callback: (args: any, options: CorsOptions) => void)
{
    let corsOptions: CorsOptions;
    // let origin: string = req.header('Origin');
    if (checkRequestOrigin(req)) 
    {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    }
    else 
    {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
}

function checkRequestOrigin(req: any): boolean
{
    const headerOrigin: string = req.header("Origin");
    // let headerHost: string = req.header("Host");
    // let reqHost: string = req.host();
    // logger.info("Request from", headerOrigin, Date.now());

    // if(allowedOrigins.indexOf(headerOrigin) !== -1)
    //     return true;
    // else return false;
    return true;
}