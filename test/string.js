import test from 'ava';
import _ from 'lodash';
import {lenBetween, lenGT, lenLT} from '@pinkyo/validatorjs/lib/tools/string';

const name = "test.name";
const stringValue = 'test';
const stringField = {name, value: stringValue};

test('length is between 4 and 4', t => {
  const result = lenBetween(4, 4)(stringField);
  t.falsy(result);
});
