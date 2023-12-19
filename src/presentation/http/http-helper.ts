import { ServerError } from "../errors/server-error";
import { HttpResponse } from "../protocols/http";
export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});
export const serverErrorRequest = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error,
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});
