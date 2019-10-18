export interface IExampleDataReadOnly {
  id: string;
}

export interface IExampleDataEditable {
  name: string;
  website?: string;
  description: string | null;
}

type IExampleData = IExampleDataReadOnly & IExampleDataEditable;

export default IExampleData;
