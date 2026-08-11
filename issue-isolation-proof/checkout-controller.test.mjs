import assert from 'node:assert/strict';
import test from 'node:test';

import { createCheckoutController } from './checkout-controller.mjs';

test('concurrent submissions for the same cart create one charge', async () => {
  let chargeCount = 0;
  const gateway = {
    async charge(payload) {
      chargeCount += 1;
      await new Promise((resolve) => setTimeout(resolve, 10));
      return { chargeId: 'ch_042', cartId: payload.cartId };
    },
  };
  const checkout = createCheckoutController(gateway);

  const first = checkout.submit({ cartId: 'cart_42', paymentToken: 'tok_test' });
  const duplicate = checkout.submit({ cartId: 'cart_42', paymentToken: 'tok_test' });
  const [firstResult, duplicateResult] = await Promise.all([first, duplicate]);

  assert.equal(chargeCount, 1);
  assert.deepEqual(duplicateResult, firstResult);
});

test('a failed charge releases the cart for a clean retry', async () => {
  let attemptCount = 0;
  const gateway = {
    async charge(payload) {
      attemptCount += 1;
      if (attemptCount === 1) throw new Error('gateway timeout');
      return { chargeId: 'ch_retry', cartId: payload.cartId };
    },
  };
  const checkout = createCheckoutController(gateway);

  await assert.rejects(
    checkout.submit({ cartId: 'cart_retry', paymentToken: 'tok_test' }),
    /gateway timeout/,
  );
  const result = await checkout.submit({ cartId: 'cart_retry', paymentToken: 'tok_test' });

  assert.equal(attemptCount, 2);
  assert.equal(result.chargeId, 'ch_retry');
});
