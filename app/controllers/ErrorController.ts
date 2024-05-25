import { RequestHandler } from "express";

export class ErrorController {
	pageNotFound: RequestHandler = (_req, res, _next) => {
		res.status(404).render('404');
	};
}
