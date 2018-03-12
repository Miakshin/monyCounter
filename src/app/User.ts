export class User {
  login: string;
  password: string;
  name: string;
  registered: number;
  setings:{
    activCells: object[];
    activeCurancy: [
      {name: string;
      checked: boolean;}
    ]
  }
}
