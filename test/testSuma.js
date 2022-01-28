var assert = require('assert');
const suma = require('../suma');

describe('Test Suma',() => {
    it('Resultado debe ser 3', () =>{
        let result = suma(1,2);
        assert.equal(result,3);
    });
});