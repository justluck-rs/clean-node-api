import { MissingParamError } from "../errors/missing-param-error";
import { InvalidParamError } from "../errors/invalid-param-error";
import { ServerError } from "../errors/server-error";
import { EmailValidator } from "../protocols/email-valitador";
import { SignUpController } from "./signup";

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  const emailValidatorStub = new EmailValidatorStub();
  const sut = new SignUpController(emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};
describe("SignUp Controller", () => {
  const { sut } = makeSut();

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

  test("Should return 400 if an invalid email is provided", () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        name: "any_name",
        email: "invalid_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  test("Should call EmailValidator with correct email", () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    sut.handle(httpRequest);
    expect(isValidSpy).toBeCalledWith("any_email@mail.com");
  });

  test("Should return 500 if EmailValidator throws", () => {
    class EmailValidatorStub implements EmailValidator {
      isValid(): boolean {
        throw new Error();
      }
    }
    const emailValidatorStub = new EmailValidatorStub();
    const sut = new SignUpController(emailValidatorStub);
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
