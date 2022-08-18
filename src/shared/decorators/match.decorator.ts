import { Logger } from "@nestjs/common";
import { ClassConstructor } from "class-transformer";
import { 
    registerDecorator, 
    ValidationArguments, 
    ValidationOptions, 
    ValidatorConstraint, 
    ValidatorConstraintInterface 
} from "class-validator";

/**
 * https://github.com/typestack/class-validator/issues/486
 * by: hnbnh
 */
export const Match = <T>(
    type: ClassConstructor<T>,
    property: (o: T) => any, 
    validationOptions?: ValidationOptions,
) => {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
};

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
    private readonly logger = new Logger(MatchConstraint.name);
    
    validate(
        value: any, 
        vArgs?: ValidationArguments
    ): boolean | Promise<boolean> {
        const [fn] = vArgs.constraints;

        return fn(vArgs.object) === value;
    }

    defaultMessage(vArgs?: ValidationArguments): string {
        const [constraintProperty]: (() => any)[] = vArgs.constraints;

        // MINE! HAHA. Not really proud.
        const constraintPropString = constraintProperty.toString();
        const pattern = '/' + Object.keys(vArgs.object).join('|') + '/';
        const match = constraintPropString.match(pattern);
        
        return `Does not match with ${match}`;
    }
}