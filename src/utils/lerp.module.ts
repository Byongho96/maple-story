/**
 * Linearly interpolates between two values.
 */
export const lerp = (current: number, target: number, amount: number) => {
  if (amount < 0 || amount > 1) {
    throw new Error('Amount must be between 0 and 1')
  }

  return current + (target - current) * amount
}
