import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";

test.skip("cancelar requests", async ({ page }) => {
  // monitoreamos todas las requests que se hacen en la pagina
  await page.on("request", (req) => {
    console.log(req.url());
  });

  //   bloqueamos imagenes y css para que el test cargue mas rapido
  await page.route("**/*.{jpg,png}", (route) => route.abort());
  await page.route("**/*.{css}", (route) => route.abort());

  await page.goto("https://www.saucedemo.com/");

  const loginPage = new LoginPage(page);

  await loginPage.loginWithCredentials();
  await loginPage.checkSuccessfullLogin();
  await page.waitForTimeout(1000);
});

test("modificar requests", async ({ page }) => {
  // monitoreamos todas las requests que se hacen en la pagina
  await page.on("request", (req) => {
    console.log(req.url());
  });

  await page.route("https://demoqa.com/BookStore/v1/Books", (route) => {
    route.fulfill({
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: `{
    "books": [
        {
            "isbn": "9781449325862",
            "title": "OMG SOY UN LIBROOOOOOO",
            "subTitle": "A Working Introduction",
            "author": "Richard E. Silverman",
            "publish_date": "2020-06-04T08:48:39.000Z",
            "publisher": "O'Reilly Media",
            "pages": 0,
            "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
            "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
        }
    ]
}`,
    });
  });

  await page.goto("https://demoqa.com/books");
});
