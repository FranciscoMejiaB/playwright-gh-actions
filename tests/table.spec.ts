import { test, expect } from "@playwright/test";

test("test web table", async ({ page }) => {
  await page.goto("https://cosmocode.io/automation-practice-webtable/");

  //   a partir de este container yo comienzo a buscar //table[@id='countries']

  const tableContainer = page.locator("//table[@id='countries']");
  const rows = await tableContainer.locator("//tr").all();
  console.log(rows.length);

  const countries: Country[] = [];
  for (let row of rows) {
    const country: Country = {
      name: await row.locator("//td[2]").innerText(),
      capital: await row?.locator("//td[3]").innerText(),
      currency: await row?.locator("//td[4]").innerText(),
      primaryLanguage: await row?.locator("//td[5]").innerText(),
    };

    countries.push(country);
  }

  await page.screenshot({ path: "screenshot/table.png", fullPage: true });

  console.log(countries);
});

interface Country {
  name: string;
  capital: string;
  currency: string;
  primaryLanguage: string;
}
