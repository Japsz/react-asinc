import {suma} from './utils'

describe('Verificar Suma', () => {
  test('suma', () => {
    expect(suma(5, 9)).toEqual(14)
  })
})