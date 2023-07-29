import { deepCopy } from '../src/main.js';

describe('deepCopy function', () => {
  const originalArray: Array<object> = [
    { a: 1 },
    { b: 2},
    { user: { fullname: 'Jon Snow', age: 30, family: {sister: 'Arya', girlFriend: 'Ygritte'}} },
    ['Lorem', 'Ipsum', [3, 4, 5]],
    { first: Symbol('foo') }
  ];
  let copiedArray: Array<object>;

  beforeAll(() => {
    copiedArray = deepCopy(originalArray);
  });

  it('creates a deep copy of an array', () => {
    expect(copiedArray).toEqual(originalArray);
    expect(copiedArray).not.toBe(originalArray);
  });

  it('creates a deep copy and find out if the changes of one affects the other one', () => {
    copiedArray[0]['a'] = 5;
    copiedArray[2]['user'].fullname = 'Aegon Targaryen';
    copiedArray[2]['user'].family.girlFriend = 'Daenerys';
    copiedArray[3][0] = 'Sit';
    copiedArray[3][1] = 'Amet';
    copiedArray[3][2][1] = null;
    copiedArray[4]['first'] = Symbol('bar');

    expect(copiedArray).not.toEqual(originalArray);

    expect(originalArray[0]['a']).toBe(1);
    expect(copiedArray[0]['a']).toBe(5);
    expect(originalArray[2]['user'].fullname).toBe('Jon Snow');
    expect(copiedArray[2]['user'].fullname).toBe('Aegon Targaryen');
    expect(originalArray[2]['user'].family.girlFriend).toBe('Ygritte');
    expect(copiedArray[2]['user'].family.girlFriend).toBe('Daenerys');
    expect(originalArray[3][0]).toBe('Lorem');
    expect(copiedArray[3][0]).toBe('Sit');
    expect(originalArray[3][1]).toBe('Ipsum');
    expect(copiedArray[3][1]).toBe('Amet');
    expect(originalArray[3][2][1]).toBe(4);
    expect(copiedArray[3][2][1]).toBe(null);
    expect(originalArray[4]['first']).not.toBe(copiedArray[4]['first']);
  });
});
