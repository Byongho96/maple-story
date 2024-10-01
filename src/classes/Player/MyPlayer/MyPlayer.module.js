import Player from '../Player.module.js';
class MyPlayer extends Player {
    constructor(props) {
        super(props);
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }
    handleKeyDown(event) {
        switch (event.code) {
            case 'ArrowLeft':
                event.preventDefault();
                this.horizontalMove(1);
                break;
            case 'ArrowRight':
                event.preventDefault();
                this.horizontalMove(2);
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.verticalMove(1);
                break;
            case 'ArrowDown':
                event.preventDefault();
                this.verticalMove(2);
                break;
            case 'AltLeft':
                event.preventDefault();
                this.verticalPressed == 2 ? this.belowJump() : this.jump();
                break;
        }
    }
    handleKeyUp(event) {
        switch (event.code) {
            case 'ArrowLeft':
                this.horizontalPressed === 1 && this.horizontalStop();
                break;
            case 'ArrowRight':
                this.horizontalPressed === 2 && this.horizontalStop();
                break;
            case 'ArrowUp':
                this.verticalPressed === 1 && this.verticalStop();
                break;
            case 'ArrowDown':
                this.verticalPressed === 2 && this.verticalStop();
                break;
        }
    }
}
export default MyPlayer;
//# sourceMappingURL=MyPlayer.module.js.map