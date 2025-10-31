import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";

test("hola", async ({ page }) => {
  test.slow();
  await page.goto("https://www.saucedemo.com/");

  const loginPage = new LoginPage(page);

  await loginPage.loginWithCredentials();
  await loginPage.checkSuccessfullLogin();

  // await page.getByRole("textbox", { name: "Username" }).fill("standard_user");
  // await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce");
  // await page.getByRole("button", { name: "Login" }).click();

  const items = await page
    .locator("#inventory_container .inventory_item")
    .all();

  const randomIndex = Math.floor(Math.random() * items.length);

  const randomItem = items[randomIndex];

  const expectedName = await randomItem
    .locator(".inventory_item_name")
    .innerText();
  const expectedDescription = await randomItem
    .locator(".inventory_item_desc")
    .innerText();
  const expectedPrice = await randomItem
    .locator(".inventory_item_price")
    .innerText();

  console.log(expectedName);
  console.log(expectedDescription);
  console.log(expectedPrice);

  await randomItem.getByRole("button", { name: "Add to cart" }).click();
  await page.locator("a.shopping_cart_link").click();
  // await page.waitForTimeout(2000);

  const actualName = await page.locator(".inventory_item_name").innerText();
  const actualDesc = await page.locator(".inventory_item_desc").innerText();
  const actualPrice = await page.locator(".inventory_item_price").innerText();

  expect(expectedName).toBe(actualName);
  expect(expectedDescription).toEqual(actualDesc);
  expect(expectedPrice).toBe(actualPrice);
});
