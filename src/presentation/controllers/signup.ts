import { MissingParamError } from "../erros/missing-param-error";
import { badRequest, serverErrorRequest } from "../http/http-helper";
import { HttpResponse, HttpRequest } from "../protocols/http";

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError("name"));
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError("email"));
    }
    return serverErrorRequest(new MissingParamError(""));
  }
}
