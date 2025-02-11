const express = require('express')
const app = express()
const path = require('path');
const moduloOrdenador = require('./models/ordenador');
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send('index')
})


app.get('/insertar', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'insertar.html'));
});

app.use(express.json());


app.listen(3001)
// Datos de ejemplo (simulando una base de datos)
//let items = [
//    { id: 1, name: "Item 1" },
//    { id: 2, name: "Item 2" },
//    { id: 3, name: "Item 3" },
//  ];
  
  
  // Obtener todos los ítems
  app.get("/items", (req, res) => {
    moduloOrdenador.buscarTodos()
    .then(ordenadores=>res.json(ordenadores))
    .catch(err=>res.status(500).json({"error":err}))
  });
  
  
  // Obtener un ítem por ID
  app.get("/items/:id", (req, res) => {
    const itemId = req.params.id;
    moduloOrdenador.buscarPorId(itemId)
    .then(ordenador=>res.json(ordenador))
    .catch(err=>res.status(500).json({"error":err}))
  });

  // Crear un nuevo ítem
app.post("/items", (req, res) => {
marca = req.body.marca;
precio = req.body.precio;
moduloOrdenador.crearNuevoOrdenador(marca,precio)
.then(ordenador=>res.json(ordenador))
.catch(err=>res.status(500).json({"error":err}))
});




// Actualizar un ítem existente
app.put("/items/:id", (req, res) => {
  const itemId = req.params.id;
  marca = req.body.marca;
  precio = req.body.precio;
});

// Eliminar un ítem
app.delete("/items/:id", (req, res) => {
  const itemId = req.params.id;
  moduloOrdenador.borrarOrdenador(itemId)
  .then(ordenador=>res.status(200).json(ordenador))
  .catch(err=>res.status(500).send("Error"))
});
