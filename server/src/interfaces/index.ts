export interface Categorie {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: Date;
  categoriesId: string;
  type: string;
  accountCpf: string;
}

export interface Account {
  name: string;
  email: string;
  cpf: string;
  transactions?: Transaction[];
}
