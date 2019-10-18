import { defaultValues, formName, validate } from './ExampleForm';

describe('ExampleForm', () => {
  describe('formName', () => {
    it(`should be 'ExampleForm'`, () => {
      expect(formName).toBe('ExampleForm');
    });
  });

  describe('validate', () => {
    it('should check if name is empty', () => {
      expect(validate({ ...defaultValues, name: '' })).toMatchSnapshot();
    });
  });
});
