import UserDataEntity from '../UserDataEntity';
import { Validate, validate } from 'class-validator';
import IsChangePasswordPair from '../validationClasses/isChangePasswordPair';

const getNameFieldCheck = (field: string) => [
  [
    field,
    '@%#^@$#',
    'Name format is invalid, there are some unexpected characters'
  ],
  [field, "Mc'Millian", undefined],
  [
    field,
    't'.repeat(127),
    field + ' must be shorter than or equal to 126 characters'
  ]
];

describe('PatchRegistrationClass', () => {
  it('should not get any error on empty object', async () => {
    const entity = new UserDataEntity();
    const err = await validate(entity);
    expect(err).toHaveLength(0);
  });

  it('should check that not whitelisted property is not allowed', async () => {
    const ent = new UserDataEntity();
    ent['test'] = 'test';
    ent['firstName'] = 'test';
    const res = await validate(ent, {
      whitelist: true,
      forbidNonWhitelisted: true
    });

    expect(res.length).toBe(1);
    expect(res[0].constraints).toStrictEqual({
      whitelistValidation: 'property test should not exist'
    });
  });

  it.each([
    ...getNameFieldCheck('firstName'),
    ['firstName', '', 'firstName' + ' should not be empty'],
    ...getNameFieldCheck('lastName'),
    ['username', '', ''],
    [
      'username',
      '$fsz-31$6^^$',
      'Username has bad format, please stick to the format'
    ],
    ['username', 'test-user', undefined],
    ['username', 'test.user', undefined],
    ['age', 14, undefined],
    ['age', -1, 'age must be a positive number'],
    ['email', 'email', 'email does not look like email'],
    ['email', 'email@', 'email does not look like email'],
    ['email', 'email@mail', 'email does not look like email'],
    ['email', 'email@email.', 'email does not look like email'],
    ['email', 'email@mail.ru', undefined],
    [
      'password',
      'password',
      'It should be defined both new password and current'
    ],
    [
      'currentPassword',
      'password',
      'It should be defined both new password and current'
    ]
  ])(
    'should validate %s field with %s value and give %s as result',
    async (fieldName, value, error) => {
      const entity = new UserDataEntity();
      entity[fieldName] = value;
      if (error) {
        expect(
          Object.values((await validate(entity))[0].constraints)
        ).toStrictEqual(error ? [error] : []);
      } else {
        expect(await validate(entity)).toHaveLength(0);
      }
    }
  );
});
