export const isColliding = (block1, block2) => {
    return (block1.position[0] - block1.width / 2 <
        block2.position[0] + block2.width / 2 &&
        block1.position[0] + block1.width / 2 >
            block2.position[0] - block2.width / 2 &&
        block1.position[1] - block1.height / 2 <
            block2.position[1] + block2.height / 2 &&
        block1.position[1] + block1.height / 2 >
            block2.position[1] - block2.height / 2);
};
//# sourceMappingURL=collision.module.js.map