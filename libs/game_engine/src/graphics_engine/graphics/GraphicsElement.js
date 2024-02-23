import { GraphicsContextFactory } from "../factories/GraphicsContextFactory";
/**
 * Класс для создания нового графического элемента и взаимодействия с ним
 */
export class GraphicsElement {
    /**
     * Конструктор для создания объекта графического элемента в родительском элементе
     * @param parentElement родительский элемент
     */
    constructor(parentElement) {
        this.parentElement = parentElement;
        this.canvasElement = document.createElement("canvas"); //создание вэб элемента canvas
        this.canvasElement.style.display = "block";
        this.canvasElement.style.width = "100%";
        this.canvasElement.style.height = "100%";
        //запрет на получение контекст меню при нажатии на правую кнопку мыши, так как права кнопка мыши может быть использована для вращения камерой
        this.canvasElement.oncontextmenu = function () {
            return false;
        };
        this.graphicsContext = GraphicsContextFactory.createContext(this.canvasElement);
    }
    /**
     * Проверка на то что графического элемента уже не существует
     */
    notExist() {
        return this.canvasElement.offsetParent == null;
    }
    /**
     * Инициализация графического элемента
     */
    init() {
        this.embedToElement();
        this.graphicsContext.init();
    }
    /**
     * Отрисовка графического элемента
     */
    render() {
    }
    /**
     * Получение объекта графического контекста
     */
    getGraphicsContext() {
        return this.graphicsContext;
    }
    /**
     * Получение ширины графического элемента
     */
    getWidth() {
        return this.canvasElement.width;
    }
    /**
     * Получение высоты графического элемента
     */
    getHeight() {
        return this.canvasElement.height;
    }
    /**
     * Обновление графического элемента
     */
    update() {
    }
    /**
     * Уничтожение графического элемента
     */
    destroy() {
        this.canvasElement.remove();
    }
    getCanvasElement() {
        return this.canvasElement;
    }
    /**
     * Встраивание графического элемента (canvas) в родительский элемент
     * @private
     */
    embedToElement() {
        this.parentElement.append(this.canvasElement); //встраивание canvas элемента внутрь родительского
        this.resize(); //заполнение canvas элемента под размер родительского
    }
    /**
     * Обновление области просмотра
     * @private
     */
    updateViewport() {
        this.graphicsContext.setViewport(0, 0, this.canvasElement.width, this.canvasElement.height);
    }
    /**
     * Обновление размеров canvas элемента
     */
    resize() {
        this.canvasElement.width = this.parentElement.offsetWidth; //задание длины для canvas элемента таким же как у родительского, таким образом canvas всегда будет занимать все пространство родительского элемента
        this.canvasElement.height = this.parentElement.offsetHeight; //задание высоты для canvas элемента таким же как у родительского, таким образом canvas всегда будет занимать все пространство родительского элемента
        this.updateViewport();
    }
}
