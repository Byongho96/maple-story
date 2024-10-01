/**
 * Linearly interpolates between two values.
 */
export const lerp = (current, target, amount) => {
    if (amount < 0 || amount > 1) {
        throw new Error('Amount must be between 0 and 1');
    }
    return current + (target - current) * amount;
};
//# sourceMappingURL=lerp.module.js.map