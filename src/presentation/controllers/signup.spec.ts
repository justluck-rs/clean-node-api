import { MissingParamError } from "../errors/missing-param-error";
import { SignUpController } from "./signup";

describe("SignUp Controller", () => {
  const sut = new SignUpController();

  const testMissingParam = (paramName: string) => {
    test(`Should return 400 if no ${paramName} is provided`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const httpRequest: { body: Record<string, any> } = {
        body: {
          name: "any_name",
          email: "any_email@mail.com",
          password: "any_password",
          passwordConfirmation: "any_password",
        },
      };

      httpRequest.body[paramName] = undefined;

      const httpResponse = sut.handle(httpRequest);
      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new MissingParamError(paramName));
    });
  };

  testMissingParam("name");
  testMissingParam("email");
  testMissingParam("password");
  testMissingParam("passwordConfirmation");
});
