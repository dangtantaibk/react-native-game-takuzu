import {CardModel} from "./CardModel";

export class MatrixModel {
  public matrix?: CardModel[][];
  public timeCount?: number;

  constructor(self?: MatrixModel) {
    if (self) {
      this.timeCount = self.timeCount;
      this.matrix = self.matrix;
    }
  }
}
