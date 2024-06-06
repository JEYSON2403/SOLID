/*public interface IOad {
    void Insert(Object entity);
    void Update(Object id, Object entity);
    void Delete(Object id);
    Object[] GetAll();
    Object GetById(Object id);
}

public class FacturaOad implements IOad {
    public void Insert(Object entity) {
        // se inserta una comprobante
    }

    public void Update(Object id, Object entity) {
        // se actualiza un comprobante
    }

    public void Delete(Object id) {
        // se elimina un comprobante
    }

    public Object[] GetAll() {
        // se obtienen todas los comprobantes
    }

    public Object GetById(Object id) {
        // se obtiene un comprobante por id
    }
}

public class FacturaOadDatosReadOnly implements IOad {
    public void Insert(Object entity) {
        throw new ObjAccDatosReadOnlyException();
    }

    public void Update(Object id, Object entity) {
        throw new ObjAccDatosReadOnlyException();
    }

    public void Delete(Object id) {
        throw new ObjAccDatosReadOnlyException();
    }

    public Object[] GetAll() {
        // se obtienen todas las facturas
    }

    public Object GetById(Object id) {
        // se obtiene una factura por id
    }
}*/



// Definición de la interfaz ICreate
class ICreate {
    insert(entity) {
        throw new Error("Method 'insert()' must be implemented.");
    }
}

// Definición de la interfaz IUpdate
class IUpdate {
    update(id, entity) {
        throw new Error("Method 'update()' must be implemented.");
    }
}

// Definición de la interfaz IDelete
class IDelete {
    delete(id) {
        throw new Error("Method 'delete()' must be implemented.");
    }
}

// Definición de la interfaz IRead
class IRead {
    getAll() {
        throw new Error("Method 'getAll()' must be implemented.");
    }

    getById(id) {
        throw new Error("Method 'getById()' must be implemented.");
    }
}

// Definición de la interfaz ICrud
class ICrud extends ICreate {
    constructor() {
        super();
        if (this.constructor === ICrud) {
            throw new Error("Cannot instantiate interface ICrud directly.");
        }
    }
}

Object.assign(ICrud.prototype, IUpdate.prototype, IDelete.prototype, IRead.prototype);

// Definición de la clase Factura
class Factura {
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }
}

// Implementación de la clase FacturaOad que implementa ICrud
class FacturaOad extends ICrud {
    constructor() {
        super();
        this.facturas = [];
    }

    insert(entity) {
        this.facturas.push(entity);
        console.log("Insertando factura");
    }

    update(id, entity) {
        const index = this.facturas.findIndex(factura => factura.id === id);
        if (index !== -1) {
            this.facturas[index] = entity;
            console.log("Actualizando factura");
        }
    }

    delete(id) {
        const index = this.facturas.findIndex(factura => factura.id === id);
        if (index !== -1) {
            this.facturas.splice(index, 1);
            console.log("Eliminando factura");
        }
    }

    getAll() {
        console.log("Obteniendo todas las facturas");
        return this.facturas;
    }

    getById(id) {
        console.log("Obteniendo factura por ID");
        return this.facturas.find(factura => factura.id === id);
    }
}

// Implementación de la clase FacturaOadDatosReadOnly que implementa IRead
class FacturaOadDatosReadOnly extends IRead {
    constructor() {
        super();
        this.facturas = [
            new Factura(1, "Factura 1"),
            new Factura(2, "Factura 2")
        ];
    }

    getAll() {
        console.log("Obteniendo todas las facturas (solo lectura)");
        return this.facturas;
    }

    getById(id) {
        console.log("Obteniendo factura por ID (solo lectura)");
        return this.facturas.find(factura => factura.id === id);
    }
}

// Creación de instancias y uso
const facturaOad = new FacturaOad();
facturaOad.insert(new Factura(1, "Nueva Factura"));

const facturas = facturaOad.getAll();
facturas.forEach(factura => {
    console.log(`Factura: ${factura.id}, ${factura.data}`);
});

const facturaReadOnly = new FacturaOadDatosReadOnly();
const facturasReadOnly = facturaReadOnly.getAll();
facturasReadOnly.forEach(factura => {
    console.log(`Factura (solo lectura): ${factura.id}, ${factura.data}`);
});
