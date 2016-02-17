import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | load spritesheet');

test('it combines the given SVGs into a spritesheet', function(assert) {
  visit('/load-spritesheet');

  andThen(function() {
    assert.equal(find('symbol#mustaches').length, 1);
    assert.equal(find('symbol#whisk').length, 1);
  });
});
