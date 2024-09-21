var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Sprite from '../Sprite/SpriteImpl.module.js';
import { isColliding, isPlatformColliding } from '../../utils/collision.module.js';
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    // animations: {
    //   [key in CharacterAnimationKey]: {
    //     image: HTMLImageElement
    //     frame: SpriteFrame
    //   }
    // }
    function Player(props) {
        var _this = _super.call(this, props) || this;
        _this.gravity = 0;
        _this.maxFallVelocity = 0;
        _this.leftPressed = false;
        _this.rightPressed = false;
        _this.isGrounded = false;
        _this.canvas = props.canvas;
        _this.gravity = props.gravity;
        _this.maxFallVelocity = props.maxFallVelocity;
        _this.direction = 'RIGHT';
        _this.velocity = { x: 5, y: 5 };
        _this.collisions = props.collisions;
        _this.platforms = props.platforms;
        // this.animations = props.animations
        // for (let key in this.animations) {
        //   const image = new Image()
        //   image.src = this.animations[key].imageSrc
        //   this.animations[key].image = image
        // }
        window.addEventListener('keydown', _this.handleKeyDown.bind(_this));
        window.addEventListener('keyup', _this.handleKeyUp.bind(_this));
        return _this;
    }
    Player.prototype.handleKeyDown = function (event) {
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
    };
    Player.prototype.handleKeyUp = function (event) {
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
    };
    Player.prototype.update = function (delta) {
        // console.log('frame')
        this.updateVerticalPosition(delta);
        this.updateHorizontalPosition(delta);
        this.checkForVerticalCollisions();
        this.checkForHorizontalCollisions();
        this.applyGravity(delta);
    };
    Player.prototype.draw = function (ctx) {
        // super.draw(ctx)
        // draw hitBox
        ctx.fillStyle = 'green';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
    Player.prototype.applyGravity = function (delta) {
        this.velocity.y += this.gravity * (delta / 17);
        if (this.velocity.y > this.maxFallVelocity) {
            this.velocity.y = this.maxFallVelocity;
        }
    };
    Player.prototype.updateVerticalPosition = function (delta) {
        this.position.y += this.velocity.y * (delta / 17);
        this.isGrounded = false;
    };
    Player.prototype.updateHorizontalPosition = function (delta) {
        if (this.leftPressed)
            this.position.x -= this.velocity.x * (delta / 17);
        else if (this.rightPressed)
            this.position.x += this.velocity.x * (delta / 17);
    };
    Player.prototype.checkForHorizontalCollisions = function () {
        // check for collisions with canvas
        if (this.position.x < 0) {
            this.position.x = 0.01;
            // console.log('collided with left wall')
            return;
        }
        if (this.position.x + this.width > this.canvas.width) {
            this.position.x = this.canvas.width - this.width - 0.01;
            // console.log('collided with right wall')
            return;
        }
        // check for collisions with collisions
        for (var i = 0; i < this.collisions.length; i++) {
            var collision = this.collisions[i];
            if (isColliding(this, collision)) {
                if (this.rightPressed) {
                    // console.log('collided with collision1')
                    this.position.x = collision.position.x - this.width - 0.01;
                    return;
                }
                if (this.leftPressed) {
                    this.position.x = collision.position.x + collision.width + 0.01;
                    return;
                }
            }
        }
    };
    Player.prototype.checkForVerticalCollisions = function () {
        // check for collisions with canvas
        if (this.position.y + this.height > this.canvas.height) {
            this.velocity.y = 0;
            this.isGrounded = true;
            this.position.y = this.canvas.height - this.height - 0.01;
            return;
        }
        // check for collisions with collisions
        for (var i = 0; i < this.collisions.length; i++) {
            var collision = this.collisions[i];
            if (isColliding(this, collision)) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.isGrounded = true;
                    this.position.y = collision.position.y - this.height - 0.01;
                    return;
                }
                if (this.velocity.y < 0 && !this.leftPressed && !this.rightPressed) {
                    this.velocity.y = 0;
                    this.position.y = collision.position.y + collision.height + 0.01;
                    return;
                }
            }
        }
        // check for collisions with platforms
        for (var i = 0; i < this.platforms.length; i++) {
            var platform = this.platforms[i];
            if (isPlatformColliding(this, platform)) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.isGrounded = true;
                    this.position.y = platform.position.y - this.height - 0.01;
                    return;
                }
            }
        }
    };
    return Player;
}(Sprite));
export default Player;
//# sourceMappingURL=Player.module.js.map