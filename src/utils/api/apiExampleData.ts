import _ from 'lodash';
import { delay } from '../commonUtils';
import IExampleData, { IExampleDataEditable } from '../../types/IExampleData';

const IExampleDataStore: { [id: string]: IExampleDataEditable } = {
  existing123: {
    name: 'Ang Lee',
    website: 'https://anglee.info',
    description: `I am.`,
  },
};

const generateNewId = () => _.uniqueId('ExampleData_');

const exampleDataApi = {
  fetch: async (id: string): Promise<IExampleData> => {
    await delay(_.random(100, 700));
    const data = IExampleDataStore[id];
    if (!data) {
      throw new Error(`Example data with id=${id} was not found.`);
    }
    return { id, ...data };
  },
  create: async (data: IExampleDataEditable): Promise<IExampleData> => {
    await delay(_.random(700, 1500));
    const id = generateNewId();
    IExampleDataStore[id] = data;
    // eslint-disable-next-line no-console
    console.log('exampleDataApi create completed', IExampleDataStore);
    return { id, ...data };
  },
  update: async (id: string, data: Partial<IExampleDataEditable>): Promise<IExampleData> => {
    await delay(_.random(1000, 1500));
    const existingData = IExampleDataStore[id];
    if (!existingData) {
      throw new Error(`Example data with id=${id} was not found.`);
    }
    const updatedData = { ...existingData, ...data };
    IExampleDataStore[id] = updatedData;
    // eslint-disable-next-line no-console
    console.log('exampleDataApi update completed', IExampleDataStore);
    return { id, ...updatedData };
  },
};

export default exampleDataApi;
