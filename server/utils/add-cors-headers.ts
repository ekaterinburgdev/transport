import type { NextFunction, Request, Response } from "express";

import { SITE_URL } from "transport-common/strapi/constants";

export const addCorsHeaders = (req: Request, res: Response, next: NextFunction) => {
    res.header(`Access-Control-Allow-Origin`, SITE_URL);
    next();
};
