
export class RankingModel {
  public lastModifiedAt?: number;
  public completionTime?: number;

  constructor(self?: RankingModel) {
    if (self) {
      this.lastModifiedAt = self.lastModifiedAt;
      this.completionTime = self.completionTime;
    }
  }
}
