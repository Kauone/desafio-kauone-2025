import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar animal duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,OSSINHO', 'RATO,BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,CAIXA', 'RATO,BOLA', 'Bola');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Gatos não dividem brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER,RATO', '', 'Mimi,Fofo');
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Mimi - pessoa 1');
  });

  test('Ninguém fica com animal se ambos podem adotar', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
  });

  test('Pessoa não pode levar mais de três animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'LASER,RATO,BOLA,CAIXA,NOVELO,SKATE', '', 'Rex,Bola,Bebe,Loco');
    expect(resultado.lista).toContain('Loco - abrigo');
    expect(resultado.lista.filter(l => l.endsWith('pessoa 1')).length).toBe(3);
  });

  test('Loco só vai se tiver outro animal como companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO', '', 'Loco');
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    const resultado2 = new AbrigoAnimais().encontraPessoas('SKATE,RATO,BOLA', '', 'Rex,Loco');
    expect(resultado2.lista).toContain('Loco - pessoa 1');
  });

  test('Ordem dos brinquedos deve ser respeitada', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,RATO', '', 'Rex');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
    const resultado2 = new AbrigoAnimais().encontraPessoas('RATO,BOLA', '', 'Rex');
    expect(resultado2.lista[0]).toBe('Rex - pessoa 1');
  });

});


