import Game from "./game/Game";
import GameLayer from "./game/GameLayer";
const parentElement = document.getElementById("game");
if (!parentElement) {
    throw new Error("Game element nof found");
}
const game = new Game(parentElement);
game.pushLayer(new GameLayer(game.getGraphicsElement()));
game.init2DRenderer();
game.start();
