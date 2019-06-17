export class CardModel {
  public error?: boolean;
  public fixed?: boolean;
  public value?: number;

  constructor(self?: CardModel) {
    if (self) {
      this.error = self.error;
      this.fixed = self.fixed;
      this.value = self.value;
    }
  }
}
