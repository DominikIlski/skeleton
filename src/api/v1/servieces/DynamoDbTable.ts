import { config, DynamoDB } from 'aws-sdk';
import DatabaseCompatible from '../interfaces/database.interface';


class DynamoDBTable<T> implements DatabaseCompatible<T> {
  private static instance: DynamoDBTable<any>;
  private readonly tableName: string;
  private readonly dynamoDB: DynamoDB.DocumentClient;

  private constructor(tableName: string) {
    config.update({
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
      region: process.env.region,
    });
    console.log(config);
    this.tableName = tableName;
    this.dynamoDB = new DynamoDB.DocumentClient();
  }

  public static getInstance<T>(tableName: string): DynamoDBTable<T> {
    if (!DynamoDBTable.instance) {
      DynamoDBTable.instance = new DynamoDBTable<T>(tableName);
    }
    return DynamoDBTable.instance;
  }

  async create(item: T): Promise<T> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: item as DynamoDB.DocumentClient.PutItemInputAttributeMap,
    };

    try {
      await this.dynamoDB.put(params).promise();
      return item;
    } catch (error) {
      throw new Error(`Failed to create item: ${error}`);
    }
  }
  async read(): Promise<T[] | null>;
  async read(id: string): Promise<T | null>;
  async read(id?: string): Promise<T[] | T | null> {
    if (id) {
      return this.readSingleItem(id);
    } else {
      console.log('readd all items');
      return this.readAllItems();
    }
  }

  async update(id: string, item: T): Promise<T> {
    const params = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: 'SET :data',
      ExpressionAttributeValues: { ':data': item },
      ReturnValues: 'ALL_NEW',
    };

    try {
      const updatedData = await this.dynamoDB.update(params).promise();
      return updatedData.Attributes as T;
    } catch (error) {
      throw new Error(`Failed to update item: ${error}`);
    }
  }

  async delete(id: string): Promise<T | null> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };
    const entity = await this.read(id);

    try {
      await this.dynamoDB.delete(params).promise();
      return entity;
    } catch (error) {
      throw new Error(`Failed to delete item: ${error}`);
    }
  }

  private async readSingleItem(id: string): Promise<T | null> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };

    try {
      const data = await this.dynamoDB.get(params).promise();
      return data.Item as T | null;
    } catch (error) {
      throw new Error(`Failed to read item: ${error}`);
    }
  }

  private async readAllItems(): Promise<T[]> {
    const params = {
      TableName: this.tableName,
    };

    try {
      console.log('table name', this.tableName);
      const data = await this.dynamoDB.scan(params).promise();
      return data.Items as T[];
    } catch (error) {
      throw new Error(`Failed to read items: ${error}`);
    }
  }
}

export default DynamoDBTable;
