const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Función para manejar conversiones
const convert = (input) => {
  // Lógica de conversión (simplificada para este ejemplo)
  if (/^\d+L$/.test(input)) {
    return { string: `${input} es igual a X litros` }; // Reemplaza X con la conversión real
  }
  return null;
};

// Ruta para conversiones
app.get('/api/convert', (req, res) => {
  const input = req.query.input;

  if (!input) {
    return res.status(400).json({ error: 'Entrada no válida' });
  }

  const result = convert(input);
  
  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({ error: 'Entrada no válida' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
