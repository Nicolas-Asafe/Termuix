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

    runAndRender() {
        const objs = this.currentObject

        objs.forEach(o => {
            o.x = this.group.indexPositionX + o.initialX
            o.y = this.group.indexPositionY + o.initialY
        })

        this.group.Objects = objs
    }
}


class DrawUI {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.staticGroups = []
        this.dynamicGroups = []
    }

    render() {
        console.clear()
        drawMap(this.width, this.height, this.staticGroups, this.dynamicGroups)
    }
}

export {
    DrawUI,
    StaticComponent,
    DynamicComponent
}
