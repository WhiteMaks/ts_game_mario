import { GraphicsElement } from "./GraphicsElement";
/**
 * Класс графического приложения
 */
export class GraphicsApplication {
    /**
     * Конструктор для создания объекта графического приложения
     */
    constructor(parentElement) {
        this.graphicElement = new GraphicsElement(parentElement);
        this.frame = 0;
        this.shouldBeClosed = false;
    }
    /**
     * Запуск графического приложения
     */
    start() {
        this.init();
        this.startNewFrame();
    }
    /**
     * Остановка графического приложения
     */
    stop() {
        this.shouldBeClosed = true;
    }
    /**
     * Инициализация графического приложения внутри родительского вэб элемента
     */
    init() {
        this.graphicElement.init();
    }
    /**
     * Отправить запрос на отрисовку нового кадра
     * @private
     */
    startNewFrame() {
        if (this.graphicElement.notExist() || this.shouldBeClosed) {
            window.cancelAnimationFrame(this.frame);
            this.clean();
            return;
        }
        this.frame = window.requestAnimationFrame((timestamp) => this.loop(timestamp));
    }
    /**
     * Цикл рендеринга
     * @param timestamp времени с момента старта цикла
     * @private
     */
    loop(timestamp) {
        this.input();
        this.update(timestamp);
        this.render();
        this.endFrame();
        this.startNewFrame();
    }
    /**
     * Обработка ввода
     */
    input() {
    }
    /**
     * Обновление кадра
     * @param timestamp времени с момента старта цикла
     */
    update(timestamp) {
        this.graphicElement.update();
    }
    /**
     * Отрисовка кадра
     */
    render() {
        this.graphicElement.render();
    }
    /**
     * Завершить отрисовку кадра
     * @private
     */
    endFrame() {
    }
    /**
     * Отчистка ресурсов графического приложения
     */
    clean() {
        this.graphicElement.destroy();
    }
    getGraphicsElement() {
        return this.graphicElement;
    }
}
