/**
 * Класс обертка над стандартными методами WebGL
 */
export class WebGLExt {
    /**
     * Конструктор создания объекта WebGL
     * @param context выбранный контекст для работы с WebGL
     */
    constructor(context) {
        this.context = context; //сохранение контекста
        this.clearColor(0, 0, 0, 1);
        const debugInfo = this.context.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            this.vendor = this.context.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
            this.renderer = this.context.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
        else {
            this.vendor = "HIDDEN";
            this.renderer = "HIDDEN";
        }
    }
    /**
     * Включение тесты глубины
     */
    enableDepthTest() {
        this.context.enable(this.context.DEPTH_TEST);
    }
    /**
     * Включение смешивания пикселей
     */
    enableBlend() {
        this.context.enable(this.context.BLEND);
    }
    /**
     * Выключение смешивания пикселей
     */
    disableBlend() {
        this.context.disable(this.context.BLEND);
    }
    /**
     * Включение прозрачности пикселей
     */
    blendFuncSrcAlphaOneMinusSrcAlpha() {
        //Функция для математического преобразования цвета для получения итогового цвета смешивания
        this.context.blendFunc(this.context.SRC_ALPHA, //SRC; Канал для математических преобразований (в данном случае канал отвечающий за прозрачность (A) в RGBA)
        this.context.ONE_MINUS_SRC_ALPHA //DEST: для получения правильного цвета смешивания нужно из единицы вычесть канал A
        );
        //R = (R(SCR) * SRC) + (R(DEST) * (1 - DEST))
        //G = (G(SCR) * SRC) + (G(DEST) * (1 - DEST))
        //B = (B(SCR) * SRC) + (B(DEST) * (1 - DEST))
        //A = (A(SCR) * SRC) + (A(DEST) * (1 - DEST))
        //
        //К примеру есть цветовой вектор красного цвета на половину прозрачный (канал A = 0.5) (1.0, 0.0, 0.0, 0.5)
        //SRC(red) = 0.5
        //DEST(red) = 1.0 - 0.5 = 0.5
        //И есть цветовой вектор синего цвета не прозрачный (канал A = 1.0) (0.0, 0.0, 1.0, 1.0)
        //Тогда итоговый цвет будет равен
        //R = ((1.0 * 0.5) + (0.0 * (1 - 0.5))) = 0.5
        //G = ((0.0 * 0.5) + (0.0 * (1 - 0.5))) = 0.0
        //B = ((0.0 * 0.5) + (1.0 * (1 - 0.5))) = 0.5
        //A = ((0.5 * 0.5) + (1.0 * (1 - 0.5))) = 0.75
    }
    /**
     * Заливка экрана выбранным цветом с прозрачностью
     * @param red значение красного цвета
     * @param green значение зеленого цвета
     * @param blue значение синего цвета
     * @param alpha значение прозрачности цвета
     */
    clearColor(red, green, blue, alpha) {
        this.context.clearColor(red, green, blue, alpha);
    }
    /**
     * Отчистка буфера цвета
     */
    clearColorBuffer() {
        this.context.clear(this.context.COLOR_BUFFER_BIT);
    }
    /**
     * Отчистка буфера глубины
     */
    clearDepthBuffer() {
        this.context.clear(this.context.DEPTH_BUFFER_BIT);
    }
    /**
     * Установка новой области просмотра
     * @param x значение x левого нижнего угла
     * @param y значение y левого нижнего угла
     * @param width значение ширины окна
     * @param height значение высоты окна
     */
    setViewport(x, y, width, height) {
        this.context.viewport(0, 0, width, height);
    }
    /**
     * Создание объекта для хранения вершинного шейдера
     */
    createVertexShader() {
        let result = this.context.createShader(this.context.VERTEX_SHADER);
        //если возникла ошибка во время создания шейдера, то Exception
        if (!result) {
            throw new Error("Ошибка создания вершинного шейдера");
        }
        return result;
    }
    /**
     * Создание объекта для хранения фрагментного шейдера
     */
    createFragmentShader() {
        let result = this.context.createShader(this.context.FRAGMENT_SHADER);
        //если возникла ошибка во время создания шейдера, то Exception
        if (!result) {
            throw new Error("Ошибка создания фрагментного шейдера");
        }
        return result;
    }
    /**
     * Удаление шейдера
     * @param shader
     */
    deleteShader(shader) {
        this.context.deleteShader(shader);
    }
    /**
     * Установка исходного кода для шейдера
     * @param shader шейдер в котором необходимо установить исходный код
     * @param sourceCode исходный код для шейдера
     */
    setShaderSource(shader, sourceCode) {
        this.context.shaderSource(shader, sourceCode);
        this.context.compileShader(shader);
        //если возникла ошибка при компиляции шейдера, то подсказка будет в консоли
        if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
            const shaderLog = this.context.getShaderInfoLog(shader);
            this.deleteShader(shader);
            throw new Error(shaderLog !== null && shaderLog !== void 0 ? shaderLog : "Ошибка компиляции шейдера");
        }
    }
    /**
     * Создание программы
     */
    createProgram() {
        let result = this.context.createProgram();
        //если возникла ошибка во время создания программы, то Exception
        if (!result) {
            throw new Error("Ошибка создания программы");
        }
        return result;
    }
    /**
     * Удаление программы
     */
    deleteProgram(program) {
        this.context.deleteProgram(program);
    }
    /**
     * Прикрепление шейдера к программе
     * @param program шейдерная программа
     * @param shader шейдер для прикрепления к программе
     */
    attachShader(program, shader) {
        this.context.attachShader(program, shader);
    }
    /**
     * Связывание программы с шейдерами
     * @param program
     */
    linkProgram(program) {
        this.context.linkProgram(program);
        //если возникла ошибка при связывании шейдеров с программой, то подсказка будет в консоли
        if (!this.context.getProgramParameter(program, this.context.LINK_STATUS)) {
            const programLog = this.context.getProgramInfoLog(program);
            throw new Error(programLog !== null && programLog !== void 0 ? programLog : "Ошибка связывания программы с шейдерами");
        }
    }
    /**
     * Установка программы как часть текущего состояния рендеринга
     * @param program программа для использования
     */
    useProgram(program) {
        this.context.useProgram(program);
    }
    /**
     * Удаление программы из текущего состояния рендеринга
     */
    removeProgram() {
        this.context.useProgram(null);
    }
    /**
     * Создание VAO
     */
    createVertexArray() {
        let result = this.context.createVertexArray();
        //если возникла ошибка во время создания VAO, то Exception
        if (!result) {
            throw new Error("Ошибка создания VAO");
        }
        return result;
    }
    /**
     * Удаление VAO
     * @param vao
     */
    deleteVertexArray(vao) {
        this.context.deleteVertexArray(vao);
    }
    /**
     * Связывание VAO с массивом имен
     * @param vao
     */
    bindVertexArray(vao) {
        this.context.bindVertexArray(vao);
    }
    /**
     * Отвязывание VAO от массива имен
     */
    unbindVertexArray() {
        this.context.bindVertexArray(null);
    }
    /**
     * Создание текстуры
     */
    createTexture() {
        const result = this.context.createTexture();
        //если возникла ошибка во время создания текстуры, то Exception
        if (!result) {
            throw new Error("Ошибка создания текстуры");
        }
        return result;
    }
    /**
     * Создание буфера кадров
     */
    createFrameBuffers() {
        const result = this.context.createFramebuffer();
        //если возникла ошибка во время создания буфера, то Exception
        if (!result) {
            throw new Error("Ошибка создания буфера кадра");
        }
        return result;
    }
    textImage2DRGBA8Ubyte(level, width, height, border, pixels) {
        this.context.texImage2D(this.context.TEXTURE_2D, level, this.context.RGBA8, width, height, border, this.context.RGBA, this.context.UNSIGNED_BYTE, pixels);
    }
    textImage2DDepth24Stencil8Uint24_8(level, width, height, border, pixels) {
        this.context.texImage2D(this.context.TEXTURE_2D, level, this.context.DEPTH24_STENCIL8, width, height, border, this.context.DEPTH_STENCIL, this.context.UNSIGNED_INT_24_8, pixels);
    }
    /**
     * Удаление буфера кадров
     * @param frameBuffer
     */
    deleteFrameBuffer(frameBuffer) {
        this.context.deleteFramebuffer(frameBuffer);
    }
    /**
     * Связать буфер кадров с целью буфера кадров
     */
    bindFrameBuffer(frameBuffer) {
        this.context.bindFramebuffer(this.context.FRAMEBUFFER, frameBuffer);
    }
    /**
     * Отвязать буфер кадров от цели буфера кадров
     */
    unbindFrameBuffer() {
        this.context.bindFramebuffer(this.context.FRAMEBUFFER, null);
    }
    checkFrameBufferStatusComplete() {
        if (this.context.checkFramebufferStatus(this.context.FRAMEBUFFER) !== this.context.FRAMEBUFFER_COMPLETE) {
            throw new Error("Буфер кадров не готов");
        }
    }
    frameBufferTexture2DColorAttachment0(texture, level) {
        this.context.framebufferTexture2D(this.context.FRAMEBUFFER, this.context.COLOR_ATTACHMENT0, this.context.TEXTURE_2D, texture, level);
    }
    frameBufferTexture2DDepthStencilAttachment(texture, level) {
        this.context.framebufferTexture2D(this.context.FRAMEBUFFER, this.context.DEPTH_STENCIL_ATTACHMENT, this.context.TEXTURE_2D, texture, level);
    }
    texStorage2DDepth24Stencil8(levels, width, height) {
        this.context.texStorage2D(this.context.TEXTURE_2D, levels, this.context.DEPTH24_STENCIL8, width, height);
    }
    /**
     * Удаление текстуры
     */
    deleteTexture(texture) {
        this.context.deleteTexture(texture);
    }
    /**
     * Отвязывание текстуры от цели текстурирования
     */
    unbindTexture2D() {
        this.context.bindTexture(this.context.TEXTURE_2D, null);
    }
    /**
     * Связывание текстуры к цели текстурирования
     * @param texture текстура для связывания
     */
    bindTexture2D(texture) {
        this.context.bindTexture(this.context.TEXTURE_2D, texture);
    }
    /**
     * Установка параметра для текстуры
     */
    tex2DParameteriMinFilterLinear() {
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MIN_FILTER, this.context.LINEAR);
    }
    /**
     * Установка параметра для текстуры
     */
    tex2DParameteriMagFilterLinear() {
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MAG_FILTER, this.context.LINEAR);
    }
    /**
     * Установка параметра для текстуры
     */
    tex2DParameteriMagFilterNearest() {
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MAG_FILTER, this.context.NEAREST);
    }
    /**
     * Установка параметра для текстуры
     */
    tex2DParameteriWrapSClampToEdge() {
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_S, this.context.CLAMP_TO_EDGE);
    }
    /**
     * Установка параметра для текстуры
     */
    tex2DParameteriWrapTClampToEdge() {
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_T, this.context.CLAMP_TO_EDGE);
    }
    texImage2DRGBAUbyteWithPixels(level, texture, pixels) {
        this.context.texImage2D(this.context.TEXTURE_2D, level, this.context.RGBA8, texture.width, texture.height, 0, this.context.RGBA, this.context.UNSIGNED_BYTE, pixels);
    }
    /**
     * Установка 2D изображение текстуры
     * @param level уровень детализации
     * @param texture изображение текстуры
     */
    texImage2DRGBAUbyte(level, texture) {
        this.context.texImage2D(this.context.TEXTURE_2D, level, this.context.RGBA8, texture.width, texture.height, 0, this.context.RGBA, this.context.UNSIGNED_BYTE, texture);
    }
    /**
     * Установка 2D изображение текстуры
     * @param level уровень детализации
     * @param texture изображение текстуры
     */
    texImage2DRGBUbyte(level, texture) {
        this.context.texImage2D(this.context.TEXTURE_2D, level, this.context.RGB8, texture.width, texture.height, 0, this.context.RGB, this.context.UNSIGNED_BYTE, texture);
    }
    /**
     * Генерация MIM карты для указанной цели текстурирования
     */
    generateMipmap2D() {
        this.context.generateMipmap(this.context.TEXTURE_2D);
    }
    /**
     * Создание буфера
     */
    createBuffer() {
        const result = this.context.createBuffer();
        //если возникла ошибка во время создания буфера, то Exception
        if (!result) {
            throw new Error("Ошибка создания буфера");
        }
        return result;
    }
    /**
     * Удаление буфера
     * @param buffer буфер для удаления
     */
    deleteBuffer(buffer) {
        this.context.deleteBuffer(buffer);
    }
    /**
     * Связывание объекта буфера с атрибутами вершин
     * @param vbo буфер который необходимо связать
     */
    bindArrayBuffer(vbo) {
        this.context.bindBuffer(this.context.ARRAY_BUFFER, vbo);
    }
    /**
     * Отвязывание объекта буфера от атрибутов вершин
     */
    unbindArrayBuffer() {
        this.context.bindBuffer(this.context.ARRAY_BUFFER, null);
    }
    /**
     * Связывание объекта буфера с элементами атрибутов вершин
     * @param vbo буфер который необходимо связать
     */
    bindElementArrayBuffer(vbo) {
        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, vbo);
    }
    /**
     * Создание нового динамического хранилища данных для буфера
     * @param size размер буфера
     */
    arrayBufferDynamicData(size) {
        this.context.bufferData(this.context.ARRAY_BUFFER, size, this.context.DYNAMIC_DRAW);
    }
    /**
     * Размер используемого буфера
     */
    getArrayBufferSize() {
        return this.context.getBufferParameter(this.context.ARRAY_BUFFER, this.context.BUFFER_SIZE);
    }
    /**
     * Обновление хранилища данных
     * @param data
     */
    arrayBufferSubData(data) {
        this.context.bufferSubData(this.context.ARRAY_BUFFER, 0, data);
    }
    /**
     * Создание нового статического хранилища данных для буфера с атрибутами вершин
     * @param data массив данных
     */
    arrayBufferStaticData(data) {
        this.context.bufferData(this.context.ARRAY_BUFFER, data, this.context.STATIC_DRAW);
    }
    /**
     * Создание нового статического хранилища данных для буфера с элементами атрибутов вершин
     * @param data массив данных
     */
    elementArrayBufferStaticData(data) {
        this.context.bufferData(this.context.ELEMENT_ARRAY_BUFFER, data, this.context.STATIC_DRAW);
    }
    /**
     * Включение массива атрибутов вершин по указанному индексу
     * @param index индекс для включения
     */
    enableVertexAttribArray(index) {
        this.context.enableVertexAttribArray(index);
    }
    /**
     * Выключение массива атрибутов вершин по указанному индексу
     * @param index индекс для выключения
     */
    disableVertexAttribArray(index) {
        this.context.disableVertexAttribArray(index);
    }
    vertexAttribDivisor(index, divisor) {
        this.context.vertexAttribDivisor(index, divisor);
    }
    /**
     * Определение массива данных типа Float атрибутов вершин
     * @param index индекс на котором будет расположен массив данных
     * @param size количество компонентов на компонент (если в массиве на одну точку приходиться координаты x, y, z, то size должен быть равен 3)
     * @param normalized
     * @param stride шаг от одного атрибута к другом (если все идет по порядку (x1, y1, z1, x2, y2, z2, ...), то stride должен быть равен 0)
     * @param offset смещение первого компонента
     */
    vertexAttribPointerFloat(index, size, normalized, stride, offset) {
        this.context.vertexAttribPointer(index, size, this.context.FLOAT, normalized, stride, offset);
    }
    /**
     * Определение массива данных типа UNSIGNED_INT атрибутов вершин
     * @param index индекс на котором будет расположен массив данных
     * @param size количество компонентов на компонент (если в массиве на одну точку приходиться координаты x, y, z, то size должен быть равен 3)
     * @param normalized
     * @param stride шаг от одного атрибута к другом (если все идет по порядку (x1, y1, z1, x2, y2, z2, ...), то stride должен быть равен 0)
     * @param offset смещение первого компонента
     */
    vertexAttribPointerUint(index, size, normalized, stride, offset) {
        this.context.vertexAttribPointer(index, size, this.context.UNSIGNED_INT, normalized, stride, offset);
    }
    /**
     * Визуализация треугольников из VAO
     * @param first начальный индекс
     * @param count количество треугольников для визуализации
     */
    drawTriangleArrays(first, count) {
        this.context.drawArrays(this.context.TRIANGLES, first, count);
    }
    /**
     * Визуализация треугольников из элементов VAO
     * @param count количество треугольников для визуализации
     * @param offset смещение
     */
    drawTriangleElementsUshort(count, offset) {
        this.context.drawElements(this.context.TRIANGLES, count, this.context.UNSIGNED_SHORT, offset);
    }
    /**
     * Визуализация треугольников из элементов VAO
     * @param count количество треугольников для визуализации
     * @param offset смещение
     */
    drawTriangleElementsUint(count, offset) {
        this.context.drawElements(this.context.TRIANGLES, count, this.context.UNSIGNED_INT, offset);
    }
    /**
     * Визуализация линий из элементов VAO
     * @param count количество линий для визуализации
     * @param offset смещение
     */
    drawLineElementsUshort(count, offset) {
        this.context.drawElements(this.context.LINES, count, this.context.UNSIGNED_SHORT, offset);
    }
    /**
     * Получение местоположения униформы в программе
     * @param program программа
     * @param name имя униформы
     */
    getUniformLocation(program, name) {
        const result = this.context.getUniformLocation(program, name);
        //если возникла ошибка во время получение униформы, то Exception
        if (!result) {
            throw new Error("Ошибка получения униформы с именем [ " + name + " ]");
        }
        return result;
    }
    /**
     * Установка данных в униформу для текущего объекта программы
     * @param location положение униформы
     * @param transpose нужно ли транспонировать матрицу
     * @param data данные для установки в униформу
     */
    uniformMatrix4fv(location, transpose, data) {
        this.context.uniformMatrix4fv(location, transpose, data);
    }
    /**
     * Установка данных в униформу для текущего объекта программы
     * @param location положение униформы
     * @param vector вектор с тремя компонентами
     */
    uniform3f(location, vector) {
        this.context.uniform3f(location, vector.getX(), vector.getY(), vector.getZ());
    }
    /**
     * Установка данных в униформу для текущего объекта программы
     * @param location положение униформы
     * @param vector вектор с четырьмя компонентами
     */
    uniform4f(location, vector) {
        this.context.uniform4f(location, vector.getX(), vector.getY(), vector.getZ(), vector.getW());
    }
    /**
     * Установка данных на заданную позицию
     * @param location положение униформы
     * @param values позиции
     */
    uniform1iv(location, values) {
        this.context.uniform1iv(location, new Int32Array(values));
    }
    /**
     * Установка данных на заданную позицию
     * @param location положение униформы
     * @param value позиция
     */
    uniform1i(location, value) {
        this.context.uniform1i(location, value);
    }
    /**
     * Установка данных на заданную позицию
     * @param location положение униформы
     * @param value позиция
     */
    uniformF(location, value) {
        this.context.uniform1f(location, value);
    }
    /**
     * Использование текстурного регистра в слоте
     * @param slot слот который необходимо использовать
     */
    activeTexture(slot) {
        this.context.activeTexture(this.context.TEXTURE0 + slot);
    }
    getVendor() {
        return this.vendor;
    }
    getRenderer() {
        return this.renderer;
    }
}
