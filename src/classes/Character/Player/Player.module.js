import Sprite from '../../Sprite/SpriteImpl.module.js';
import { isColliding, isPlatformColliding } from '../../../utils/collision.module.js';
export default class Player extends Sprite {
    // animations: {
    //   [key in CharacterAnimationKey]: {
    //     image: HTMLImageElement
    //     frame: SpriteFrame
    //   }
    // }
    constructor(props) {
        super(props);
        this.gravity = 0;
        this.maxFallVelocity = 0;
        this.leftPressed = false;
        this.rightPressed = false;
        this.isGrounded = false;
        this.startPosition = Object.assign({}, props.position);
        this.canvas = props.canvas;
        this.gravity = props.gravity;
        this.maxFallVelocity = props.maxFallVelocity;
        this.direction = 'RIGHT';
        this.velocity = { x: 5, y: 5 };
        this.collisions = props.collisions;
        this.platforms = props.platforms;
        // this.animations = props.animations
        // for (let key in this.animations) {
        //   const image = new Image()
        //   image.src = this.animations[key].imageSrc
        //   this.animations[key].image = image
        // }
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }
    handleKeyDown(event) {
        switch (event.code) {
            case 'ArrowLeft':
            case 'KeyA':
                event.preventDefault();
                this.leftPressed = true;
                this.direction = 'LEFT';
                break;
            case 'ArrowRight':
            case 'KeyD':
                event.preventDefault();
                this.rightPressed = true;
                this.direction = 'RIGHT';
                break;
            case 'AltLeft':
                event.preventDefault();
                if (this.isGrounded)
                    this.velocity.y = -15;
                break;
        }
    }
    handleKeyUp(event) {
        switch (event.code) {
            case 'ArrowLeft':
            case 'KeyA':
                this.leftPressed = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                this.rightPressed = false;
                break;
        }
    }
    update(delta) {
        // console.log('frame')
        this.applyGravity(delta);
        this.updateVerticalPosition(delta);
        this.updateHorizontalPosition(delta);
        // this.checkForVerticalCollisions()
        // this.checkForHorizontalCollisions()
    }
    draw(ctx) {
        // super.draw(ctx)
        // draw hitBox
        ctx.fillStyle = 'green';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    applyGravity(delta) {
        this.velocity.y += this.gravity * (delta / 17);
        if (this.velocity.y > this.maxFallVelocity) {
            this.velocity.y = this.maxFallVelocity;
        }
    }
    updateVerticalPosition(delta) {
        this.position.y += this.velocity.y * (delta / 17);
        this.isGrounded = false;
        if (this.position.y + this.height > this.canvas.height) {
            this.position = Object.assign({}, this.startPosition);
            this.velocity.y = 0;
            this.isGrounded = true;
            return;
        }
        for (let i = 0; i < this.collisions.length; i++) {
            const collision = this.collisions[i];
            if (isColliding(this, collision)) {
                this.position.y = collision.position.y - this.height - 0.01;
                this.velocity.y = 0;
                this.isGrounded = true;
                return;
            }
        }
        if (this.velocity.y < 0)
            return;
        for (let i = 0; i < this.platforms.length; i++) {
            const platform = this.platforms[i];
            if (isPlatformColliding(this, platform)) {
                this.position.y -= this.velocity.y * (delta / 17);
                this.velocity.y = 0;
                this.isGrounded = true;
                return;
            }
        }
    }
    updateHorizontalPosition(delta) {
        if (this.leftPressed)
            this.position.x -= this.velocity.x * (delta / 17);
        else if (this.rightPressed)
            this.position.x += this.velocity.x * (delta / 17);
        if (this.position.x < 0) {
            this.position.x = 0;
            return;
        }
        if (this.position.x + this.width > this.canvas.width) {
            this.position.x = this.canvas.width - this.width;
            return;
        }
        for (let i = 0; i < this.collisions.length; i++) {
            const collision = this.collisions[i];
            if (isColliding(this, collision)) {
                if (this.leftPressed) {
                    this.position.x = collision.position.x + collision.width + 0.01;
                    return;
                }
                if (this.rightPressed) {
                    this.position.x = collision.position.x - this.width - 0.01;
                    return;
                }
            }
        }
    }
}
//# sourceMappingURL=Player.module.js.map