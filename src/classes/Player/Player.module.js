import Object2D from '../../libs/Object2D/Object2D.module.js';
import { getStaticPath } from '../../utils/static.module.js';
const LOCAL_FACE_POSITION = [-5, -28];
const LOCAL_HEAD_POSITION = [3, -40];
const LOCAL_BODY_POSITION = [0, 20];
const LOCAL_ARM_POSITION = [16, 7];
const LOCAL_HAND_POSITION = [-3, 13];
class Player extends Object2D {
    constructor(props) {
        super({
            name: 'player',
            position: props.position,
            width: 90,
            height: 110,
            // imageSources: [
            //   getStaticPath('/assets/character/body/stand2/0/body.png'),
            //   getStaticPath('/assets/character/body/stand2/1/body.png'),
            //   getStaticPath('/assets/character/body/stand2/2/body.png'),
            // ],
            collision: {
                type: 'box',
            },
        });
        this.velocity = [0, 0];
        this.direction = 1; // 1: left, 2: right
        this.state = 'idle';
        this.obstacles = [];
        this.platforms = [];
        this.moveForce = 4;
        this.jumpForce = 18;
        this.horizontalPressed = 0; // 0: none, 1: left, 2: right
        this.verticalPressed = 0; // 0: none, 1: up, 2: down
        this.isJumping = 0;
        this.isBelowJumping = false;
        this.bodyObject = new Object2D({
            name: 'body',
            position: LOCAL_BODY_POSITION,
            width: 40,
            imageSources: [
                getStaticPath('/assets/character/body/stand2/0/body.png'),
                getStaticPath('/assets/character/body/stand2/1/body.png'),
                getStaticPath('/assets/character/body/stand2/2/body.png'),
            ],
        });
        this.armObject = new Object2D({
            name: 'arm',
            position: LOCAL_ARM_POSITION,
            width: 20,
            // height: 60,
            imageSources: [
                getStaticPath('/assets/character/body/stand2/0/arm.png'),
                getStaticPath('/assets/character/body/stand2/1/arm.png'),
                getStaticPath('/assets/character/body/stand2/2/arm.png'),
            ],
        });
        this.handObject = new Object2D({
            name: 'hand',
            position: LOCAL_HAND_POSITION,
            width: 40,
            // height: 60,
            imageSources: [
                getStaticPath('/assets/character/body/stand2/0/hand.png'),
                getStaticPath('/assets/character/body/stand2/1/hand.png'),
                getStaticPath('/assets/character/body/stand2/2/hand.png'),
            ],
        });
        this.headObject = new Object2D({
            name: 'head',
            position: LOCAL_HEAD_POSITION,
            width: 80,
            imageSources: [
                getStaticPath('/assets/character/head/stand2/0/head.png'),
                getStaticPath('/assets/character/head/stand2/1/head.png'),
                getStaticPath('/assets/character/head/stand2/2/head.png'),
            ],
        });
        this.faceObject = new Object2D({
            name: 'face',
            position: LOCAL_FACE_POSITION,
            width: 55,
            imageSources: [
                getStaticPath('/assets/character/face/00020000.img/default/face.png'),
            ],
        });
        this.add(this.bodyObject);
        this.add(this.armObject);
        this.add(this.handObject);
        this.add(this.headObject);
        this.add(this.faceObject);
        this.gravity = props.gravity;
        this.maxFallSpeed = props.maxFallSpeed;
        this.maxWidth = props.maxWidth;
        this.maxHeight = props.maxHeight;
    }
    // setSprite(key: string) {
    //   const sprite = this.sprites[key]
    //   if (this.image === sprite) return
    //   this.image.resetFrame()
    //   this.object.setImage(sprite)
    // }
    horizontalMove(direction) {
        if (direction === 1) {
            this.isFlipX = false;
        }
        else {
            this.isFlipX = true;
        }
        this.horizontalPressed = direction;
    }
    verticalMove(direction) {
        this.verticalPressed = direction;
    }
    horizontalStop() {
        this.horizontalPressed = 0;
    }
    verticalStop() {
        this.verticalPressed = 0;
    }
    jump() {
        if (this.isJumping)
            return;
        this.velocity[1] = -this.jumpForce;
    }
    belowJump() {
        if (this.isJumping)
            return;
        this.velocity[1] = -5;
        this.isBelowJumping = true;
        setTimeout(() => {
            this.isBelowJumping = false;
        }, 600);
    }
    draw(ctx) {
        ctx.save();
        // flip horizontally if direction is right
        // console.log(this.direction)
        ctx.scale(this.direction === 1 ? 1 : -1, 1);
        super.draw(ctx);
        ctx.restore();
    }
    update(delta) {
        super.update(delta);
        this.applyGravity(delta);
        this.updateVerticalPosition(delta);
        this.updateHorizontalPosition(delta);
    }
    applyGravity(delta) {
        this.velocity[1] += this.gravity * (delta / 17);
        if (this.velocity[1] > this.maxFallSpeed) {
            this.velocity[1] = this.maxFallSpeed;
        }
    }
    updateVerticalPosition(delta) {
        this.position[1] += this.velocity[1] * (delta / 17);
        this.isJumping = 1;
        // Check if player is out of boundary
        if (this.position[1] > this.maxHeight) {
            this.position[1] = 0;
            this.velocity[1] = 0;
            return;
        }
        // Check if player is colliding with obstacles
        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i].collisionBlock;
            if (this.collisionBlock.collide(obstacle)) {
                if (this.velocity[1] < 0) {
                    this.position[1] =
                        obstacle.position[1] +
                            obstacle.offset[1] +
                            obstacle.height / 2 +
                            this.height / 2 +
                            0.01;
                    this.velocity[1] = 0;
                    return;
                }
                if (this.velocity[1] > -1) {
                    this.position[1] =
                        obstacle.position[1] +
                            obstacle.offset[1] -
                            obstacle.height / 2 -
                            this.height / 2 -
                            0.01;
                    this.velocity[1] = 0;
                    this.isJumping = 0;
                    return;
                }
            }
        }
        // Check if player is colliding with platforms
        if (this.velocity[1] < 0 || this.isBelowJumping)
            return;
        for (let i = 0; i < this.platforms.length; i++) {
            const platform = this.platforms[i].collisionBlock;
            if (this.collisionBlock.collide(platform)) {
                this.position[1] =
                    platform.position[1] +
                        platform.offset[1] -
                        platform.height / 2 -
                        this.height / 2 -
                        0.01;
                this.velocity[1] = 0;
                this.isJumping = 0;
                return;
            }
        }
    }
    updateHorizontalPosition(delta) {
        if (this.horizontalPressed === 0)
            return;
        if (this.horizontalPressed === 1) {
            this.position[0] -= this.moveForce * (delta / 17);
        }
        else {
            this.position[0] += this.moveForce * (delta / 17);
        }
        // Check if player is out of boundary
        if (this.position[0] > this.maxWidth) {
            this.position[0] = 0;
            this.velocity[0] = 0;
            return;
        }
        // Check if player is out of boundary
        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i].collisionBlock;
            if (this.collisionBlock.collide(obstacle)) {
                if (this.horizontalPressed == 1) {
                    this.position[0] =
                        obstacle.position[0] +
                            obstacle.offset[0] +
                            obstacle.width / 2 +
                            this.width / 2 +
                            0.01;
                    return;
                }
                if (this.horizontalPressed == 2) {
                    this.position[0] =
                        obstacle.position[0] +
                            obstacle.offset[0] -
                            obstacle.width / 2 -
                            this.width / 2 -
                            0.01;
                    return;
                }
            }
        }
    }
}
export default Player;
//# sourceMappingURL=Player.module.js.map