import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  private readonly usernameTextbox: Locator;
  private readonly passwordTextbox: Locator;
  private readonly loginButton: Locator;
  private readonly shoppingCartLink: Locator;

  constructor(public readonly page: Page) {
    this.usernameTextbox = this.page.getByRole("textbox", { name: "Username" });
    this.passwordTextbox = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.shoppingCartLink = page.locator("a.shopping_cart_link");
  }

  async loginWithCredentials(
    username: string = "standard_user",
    password: string = "secret_sauce"
  ) {
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.loginButton.click();
  }

  async checkSuccessfullLogin() {
    await expect(this.shoppingCartLink).toBeVisible();
  }
}
