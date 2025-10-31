import { test, expect } from "@playwright/test";

test("test env", async ({ page }) => {
  await page.goto(process.env.URL!);
});

test("test 1", async ({ page }) => {
  await page.goto("https://www.mercadolibre.com.co/");

  await page.getByRole("link", { name: "Mis compras", exact: true }).click();

  await page.waitForTimeout(2000);
});

test("test 3", async ({ page }) => {
  await page.goto("https://www.mercadolibre.com.co/");

  await page.locator("input[id='cb1-edit']").fill("iphone");

  await page.keyboard.press("Enter");

  await expect(
    page.locator("//ol[contains(@class, 'ui-search-layout')]")
  ).toBeVisible();

  const titles = await page
    .locator("//ol[contains(@class, 'ui-search-layout')]//li//h3")
    .allInnerTexts();

  console.log("SE ENCONTRARON: ", titles.length, " RESULTADOS");

  for (let title of titles) {
    console.log(title);
  }
  // titles.map((title) => {
  //   console.log(title);
  // });

  // await page.waitForTimeout(3000);
});
