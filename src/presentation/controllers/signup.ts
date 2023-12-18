import { MissingParamError } from "../errors/missing-param-error";
import { badRequest, serverErrorRequest } from "../http/http-helper";
import { Controller } from "../protocols/controller";
import { HttpResponse, HttpRequest } from "../protocols/http";

export class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = [
      "name",
      "email",
      "password",
      "passwordConfirmation",
    ];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
    return serverErrorRequest(new MissingParamError(""));
  }
}
