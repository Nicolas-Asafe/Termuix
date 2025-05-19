function drawMap(width, height, staticGroups, dynamicGroups) {
    const staticObjects = staticGroups.flatMap(group => group.Objects)
    const dynamicObjects = dynamicGroups.flatMap(group => group.Objects)

    for (let r = 0; r < height; r++) {
        const row = []
        for (let c = 0; c < width; c++) {
            const obj =
                dynamicObjects.find(o => o.x === r && o.y === c) ||
                staticObjects.find(o => o.x === r && o.y === c)
            row.push(obj ? obj.symbol : "::")
        }
        console.log(row.join(""))
    }
}

class StaticComponent {
    constructor(name, ui) {
        const exists = ui.staticGroups.find(g => g.NameGroup === name)
        if (exists) throw new Error("Esse nome está em uso. Escolhe outro.")

        this.group = { NameGroup: name, Objects: [] }
        ui.staticGroups.push(this.group)
    }

    add(objects = []) {
        this.group.Objects = objects
    }

    addObject(obj) {
        this.group.Objects.push(obj)
    }
}

class DynamicComponent {
    constructor(name, ui) {
        const exists = ui.dynamicGroups.find(g => g.NameGroup === name)
        if (exists) throw new Error("Esse nome de dinâmico já existe. Usa outro.")

        this.group = {
            NameGroup: name,
            indexPositionX: 0,
            indexPositionY: 0,
            Objects: []
        }

        ui.dynamicGroups.push(this.group)
        this.currentObject = []
        this.checkCollision = null
    }

    connect(obj) {
        const objs = Array.isArray(obj) ? obj : [obj]

        const minX = Math.min(...objs.map(o => o.x))
        const minY = Math.min(...objs.map(o => o.y))

        objs.forEach(o => {
            o.initialX = o.x - minX
            o.initialY = o.y - minY
        })

        this.currentObject = objs
    }

    ChangeIndexPositionX(x) {
        this.group.indexPositionX = x
    }

    ChangeIndexPositionY(y) {
        this.group.indexPositionY = y
    }

    move(dx, dy) {
        this.group.indexPositionX += dx
        this.group.indexPositionY += dy
    }

    setSymbol(newSymbol) {
        this.currentObject.forEach(o => o.symbol = newSymbol)
    }

    hasCollisionWith(otherGroup) {
        const thisObjs = this.group.Objects
        const otherObjs = otherGroup.group.Objects

        return thisObjs.some(a =>
            otherObjs.some(b => a.x === b.x && a.y === b.y)
        )
    }

    setCollisionChecker(fn) {
        this.checkCollision = fn
    }

    runAndRender() {
        const objs = this.currentObject

        objs.forEach(o => {
            o.x = this.group.indexPositionX + o.initialX
            o.y = this.group.indexPositionY + o.initialY
        })

        this.group.Objects = objs
    }

    // Versão safe de movimentar com checagem de colisão
    moveWithCollision(dx, dy) {
        let newX = this.group.indexPositionX + dx
        let newY = this.group.indexPositionY + dy

        // Limita dentro do UI
        newX = Math.max(0, Math.min(newX, this.group.ui.height - 1))
        newY = Math.max(0, Math.min(newY, this.group.ui.width - 1))

        // Checa colisão se tiver função
        if (!this.checkCollision || !this.checkCollision(newX, newY)) {
            this.ChangeIndexPositionX(newX)
            this.ChangeIndexPositionY(newY)
            this.runAndRender()
            return true
        }
        return false
    }
}

class DrawUI {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.staticGroups = []
        this.dynamicGroups = []
    }

    saveState() {
        return JSON.parse(JSON.stringify({
            staticGroups: this.staticGroups,
            dynamicGroups: this.dynamicGroups
        }))
    }

    loadState(state) {
        this.staticGroups = JSON.parse(JSON.stringify(state.staticGroups))
        this.dynamicGroups = JSON.parse(JSON.stringify(state.dynamicGroups))
    }

    render() {
        console.clear()
        drawMap(this.width, this.height, this.staticGroups, this.dynamicGroups)
    }

    clear() {
        this.staticGroups = []
        this.dynamicGroups = []
    }

    createBorder(symbol = "##") {
        const top = []
        const bottom = []
        const sides = []

        for (let c = 0; c < this.width; c++) {
            top.push({ x: 0, y: c, symbol })
            bottom.push({ x: this.height - 1, y: c, symbol })
        }

        for (let r = 1; r < this.height - 1; r++) {
            sides.push({ x: r, y: 0, symbol })
            sides.push({ x: r, y: this.width - 1, symbol })
        }

        const border = new StaticComponent("border", this)
        border.add([...top, ...bottom, ...sides])
    }
}

class InputHandler {
    constructor() {
        this.key = null
        process.stdin.setRawMode(true)
        process.stdin.resume()
        process.stdin.setEncoding("utf8")
        process.stdin.on("data", key => {
            if (key === "\u0003") process.exit()
            this.key = key
        })
    }

    getKey() {
        const k = this.key
        this.key = null
        return k
    }
}

export {
    DrawUI,
    StaticComponent,
    DynamicComponent,
    InputHandler
}
