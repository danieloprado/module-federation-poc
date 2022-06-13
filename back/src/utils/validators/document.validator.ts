import { registerDecorator, ValidationOptions } from 'class-validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';

/**
 * Validate if is a valid CPF or CNPJ
 * @param disabled
 * @param validationOptions
 * @returns
 */
export function IsDocument(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'document',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) return true;
          return cpf.isValid(value, false) || cnpj.isValid(value, false);
        },
        defaultMessage() {
          return 'Invalid Document';
        }
      }
    });
  };
}
