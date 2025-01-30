const express = require('express')
const app = express()
const moduloOrdenador = require('./models/ordenador');
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send('index')
})

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
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Actualizar un ítem existente
app.put("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === itemId);
  if (itemIndex !== -1) {
    items[itemIndex].name = req.body.name;
    res.json(items[itemIndex]);
  } else {
    res.status(404).json({ message: "Ítem no encontrado" });
  }
});

// Eliminar un ítem
app.delete("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === itemId);
  if (itemIndex !== -1) {
    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
  } else {
    res.status(404).json({ message: "Ítem no encontrado" });
  }
});

  
  
  