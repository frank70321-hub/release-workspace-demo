export function createCheckoutController(gateway) {
  const inFlightByCart = new Map();

  return {
    submit(payload) {
      const existing = inFlightByCart.get(payload.cartId);
      if (existing) return existing;

      const request = Promise.resolve()
        .then(() => gateway.charge(payload))
        .finally(() => inFlightByCart.delete(payload.cartId));

      inFlightByCart.set(payload.cartId, request);
      return request;
    },
  };
}
