import { Guid } from '@shared/domain/valueObjects/guid/guid';

describe('Guid value object tests', () => {
  it('Should create value object', () => {
    const request = '214237be-a216-44a1-8788-c4e7baf146d0';

    const guid = Guid.build(request);

    expect(guid).toBeInstanceOf(Guid);
    expect(guid.value).toBe(request);
  });

  it('Should create value object with new value', () => {
    const guid = Guid.newId();

    expect(guid).toBeInstanceOf(Guid);
    expect(guid.value).toBeDefined();
  });

  it('Should return true when two value objects are equal', () => {
    const guid1 = Guid.build('214237be-a216-44a1-8788-c4e7baf146d0');
    const guid2 = Guid.build('214237be-a216-44a1-8788-c4e7baf146d0');

    const result = guid1.equals(guid2);

    expect(result).toBeTruthy();
  });

  it('Should return false when two value objects are not equal', () => {
    const guid1 = Guid.build('bf316b79-13d8-4484-8bda-c08a88b7fa89');
    const guid2 = Guid.build('214237be-a216-44a1-8788-c4e7baf146d0');

    const result = guid1.equals(guid2);

    expect(result).toBeFalsy();
  });
});
