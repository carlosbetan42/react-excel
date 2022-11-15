// @ts-check
import { expect, test } from '@playwright/test';

const gotoPage = page => {
  const { URL = 'http://localhost:5173/' } = process.env;
  return page.goto(URL);
};

test('react excel should work as expected', async ({ page }) => {
  // compruebas que se levanta
  // await page.goto('http://localhost:5173/');
  await gotoPage(page);

  // Compruebas que se renderiza
  const cellA0 = page.getByTestId('span-0-0');
  await cellA0.click();

  // Compruebas que al hacer click se convierte en input
  const inputA0 = page.getByTestId('input-0-0');
  // Compruebas que es editable
  await inputA0.fill('2');

  const cellB0 = page.getByTestId('span-0-1');
  await cellB0.click();

  const inputB0 = page.getByTestId('input-0-1');
  // Comprobando las evaluaciones y las referencias
  await inputB0.fill('=A0+2');

  await cellA0.click();

  // Comprobando que se recomputan los valores de otras celdas
  const inputA0Again = page.getByTestId('input-0-0');
  await inputA0Again.fill('4');

  const cellC0 = page.getByTestId('span-0-2');
  await cellC0.click();

  // compruebas que el resultado es el esperado
  const result = await cellB0.innerText();
  expect(result).toBe('6');
});
