/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, TsoaResponse, HttpStatusCodeLiteral } from 'tsoa';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Session } from './api/controllers/session';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Test } from './api/controllers/test';
import { koaAuthentication } from './api/auth';
import * as KoaRouter from '@koa/router';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(router: KoaRouter) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    router.post('/sessions',
        async (context: any, next: any) => {
            const args = {
                username: { "in": "body-prop", "name": "username", "required": true, "dataType": "string" },
                password: { "in": "body-prop", "name": "password", "required": true, "dataType": "string" },
                unauthorized: { "in": "res", "name": "401", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "msg": { "dataType": "string", "required": true } } },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context, next);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new Session();

            const promise = controller.create.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.get('/tests',
        authenticateMiddleware([{ "jwt": ["username"] }]),
        async (context: any, next: any) => {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context, next);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new Test();

            const promise = controller.get.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async (context: any, next: any) => {
            let responded = 0;
            let success = false;

            const succeed = async (user: any) => {
                if (!success) {
                    success = true;
                    responded++;
                    context.request['user'] = user;
                    await next();
                }
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            const fail = async (error: any) => {
                responded++;
                if (responded == security.length && !success) {
                    // this is an authentication error
                    context.status = error.status || 401;
                    context.throw(context.status, error.message, error);
                } else if (success) {
                    // the authentication was a success but arriving here means the controller
                    // probably threw an error that we caught as well
                    // so just pass it on
                    throw error;
                }
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    let promises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        promises.push(koaAuthentication(context.request, name, secMethod[name]));
                    }

                    return Promise.all(promises)
                        .then((users) => succeed(users[0]))
                        .catch(fail);
                } else {
                    for (const name in secMethod) {
                        return koaAuthentication(context.request, name, secMethod[name])
                            .then(succeed)
                            .catch(fail);
                    }
                }
            }
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function promiseHandler(controllerObj: any, promise: Promise<any>, context: any, next: () => Promise<any>) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                let headers;

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();

                    statusCode = controllerObj.getStatus();
                }
                return returnHandler(context, next, statusCode, data, headers);
            })
            .catch((error: any) => {
                context.status = error.status || 500;
                context.throw(context.status, error.message, error);
            });
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(context: any, next: () => any, statusCode?: number, data?: any, headers: any = {}) {
        if (!context.response.__tsoaResponded) {
            context.set(headers);

            if (data || data === false) {
                context.body = data;
                context.status = 200;
            } else {
                context.status = 204;
            }

            if (statusCode) {
                context.status = statusCode;
            }

            context.response.__tsoaResponded = true;
            return next();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, context: any, next: () => any): any[] {
        const errorFields: FieldErrors = {};
        const values = Object.keys(args).map(key => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return context.request;
                case 'query':
                    return validationService.ValidateParam(args[key], context.request.query[name], name, errorFields, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'path':
                    return validationService.ValidateParam(args[key], context.params[name], name, errorFields, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'header':
                    return validationService.ValidateParam(args[key], context.request.headers[name], name, errorFields, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body':
                    return validationService.ValidateParam(args[key], context.request.body, name, errorFields, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], context.request.body[name], name, errorFields, 'body.', { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'res':
                    return responder(context, next);
            }
        });
        if (Object.keys(errorFields).length > 0) {
            throw new ValidateError(errorFields, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(context: any, next: () => any): TsoaResponse<HttpStatusCodeLiteral, unknown> {
        return function(status, data, headers) {
            returnHandler(context, next, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
