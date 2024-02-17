import {GameEngine} from "#game_engine/src/namespace/game_engine";

class Game extends GameEngine.Engine {

	public constructor(parentElement: HTMLElement) {
		super(parentElement);
	}

}

export default Game;