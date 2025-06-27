const chai = require('chai');
const expect = chai.expect;
const ConvertHandler = require('../convertHandler'); // Asegúrate de que la ruta sea correcta

describe('ConvertHandler', () => {
  let convertHandler;

  before(() => {
    convertHandler = new ConvertHandler();
  });

  // Prueba para número entero
  it('debería leer correctamente una entrada de número entero', () => {
    const input = '5kg';
    const result = convertHandler.getNum(input);
    expect(result).to.equal(5);
  });

  // Prueba para número decimal
  it('debería leer correctamente una entrada de número decimal', () => {
    const input = '3.5L';
    const result = convertHandler.getNum(input);
    expect(result).to.equal(3.5);
  });

  // Prueba para entrada fraccional
  it('debería leer correctamente una entrada fraccional', () => {
    const input = '1/2mi';
    const result = convertHandler.getNum(input);
    expect(result).to.equal(0.5);
  });

  // Prueba para entrada fraccional con un decimal
  it('debería leer correctamente una entrada fraccional con un decimal', () => {
    const input = '3.5/2kg';
    const result = convertHandler.getNum(input);
    expect(result).to.equal(1.75);
  });

  // Prueba para fracción doble
  it('debería devolver correctamente un error en una fracción doble (i.e. 3/2/3)', () => {
    const input = '3/2/3';
    expect(() => convertHandler.getNum(input)).to.throw('Entrada no válida');
  });

  // Predeterminar entrada numérica de 1
  it('debería predeterminar correctamente una entrada numérica de 1 cuando no se proporciona ninguna entrada numérica', () => {
    const input = 'kg';
    const result = convertHandler.getNum(input);
    expect(result).to.equal(1);
  });

  // Leer unidades válidas
  it('debería leer correctamente cada unidad de las entradas válidas', () => {
    const input = '10gal';
    const result = convertHandler.getUnit(input);
    expect(result).to.equal('gal');
  });

  // Error por unidad no válida
  it('debería devolver correctamente un error por cada unidad de entrada no válida', () => {
    const input = '10invalid';
    expect(() => convertHandler.getUnit(input)).to.throw('Unidad no válida');
  });

  // Devolver unidad de retorno correcta
  it('debería devolver la unidad de retorno correcta para cada unidad de entrada válida', () => {
    expect(convertHandler.getReturnUnit('gal')).to.equal('L');
    expect(convertHandler.getReturnUnit('L')).to.equal('gal');
  });

  // Devolver unidad de cadena deletreada
  it('debería devolver correctamente la unidad de cadena deletreada para cada unidad de entrada válida', () => {
    expect(convertHandler.spellOutUnit('gal')).to.equal('galones');
    expect(convertHandler.spellOutUnit('L')).to.equal('litros');
  });

  // Conversión de gal a L
  it('debe convertir correctamente gal a L', () => {
    const result = convertHandler.convert(1, 'gal');
    expect(result).to.be.closeTo(3.78541, 0.0001); // 1 gal = 3.78541 L
  });

  // Conversión de L a gal
  it('debe convertir correctamente L a gal', () => {
    const result = convertHandler.convert(1, 'L');
    expect(result).to.be.closeTo(0.264172, 0.0001); // 1 L = 0.264172 gal
  });

  // Conversión de mi a km
  it('debería convertir correctamente mi a km', () => {
    const result = convertHandler.convert(1, 'mi');
    expect(result).to.be.closeTo(1.60934, 0.0001); // 1 mi = 1.60934 km
  });

  // Conversión de km a mi
  it('debería convertir correctamente km a mi', () => {
    const result = convertHandler.convert(1, 'km');
    expect(result).to.be.closeTo(0.621371, 0.0001); // 1 km = 0.621371 mi
  });

  // Conversión de lbs a kg
  it('debería convertir correctamente lbs a kg', () => {
    const result = convertHandler.convert(1, 'lbs');
    expect(result).to.be.closeTo(0.453592, 0.0001); // 1 lbs = 0.453592 kg
  });

  // Conversión de kg a lbs
  it('debería convertir correctamente kg a lbs', () => {
    const result = convertHandler.convert(1, 'kg');
    expect(result).to.be.closeTo(2.20462, 0.0001); // 1 kg = 2.20462 lbs
  });

});
