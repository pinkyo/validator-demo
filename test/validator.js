import test from 'ava';
import _ from 'lodash';
import sinon from 'sinon';
import createValidator from '@pinkyo/validatorjs';

const id = 'test.id';
const group = 'test.group';
const invalidGroup = "test.group.invalid";
const groups = [group];
const name = 'test.name';
const getter =() => 5;
const tip = 'value must less than 5.';
const validationChain = [({name, value}) => value < 5? '': tip];
const field = {id, groups, getter, name};

test.beforeEach(t => {
  t.context.warn = sinon.spy(global.console, "warn");
  t.context.info = sinon.spy(global.console, "info");
  t.context.validator = createValidator();
});

test.afterEach.always(t => {
  const {info, warn} = t.context;
  info.restore();
  warn.restore();
})

test('validate with group success.', t => {
  const {validator} = t.context;
  let callbackInvoked = false;
  validator.register(field, validationChain);
  const result = validator.validate([group, invalidGroup], () => {
    callbackInvoked = true;
  });
  
  t.true(callbackInvoked);
  t.deepEqual(result[id], [tip]);
});

test('validate without group success.', t => {
  const {validator} = t.context;
  let callbackInvoked = false;
  validator.register(field, validationChain);
  const result = validator.validate(null, () => {
    callbackInvoked = true;
  });
  
  t.true(callbackInvoked);
  t.deepEqual(result[id], [tip]);
});