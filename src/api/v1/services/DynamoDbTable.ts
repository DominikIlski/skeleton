import { config, DynamoDB } from 'aws-sdk';
import { IBasicRepository } from '../basicInterfaces';

export class DynamoDBTable<T> implements IBasicRepository<T> {
  readonly tableName: string;
  protected readonly dynamoDB: DynamoDB.DocumentClient;

  constructor(tableName: string) {
    config.update({
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
      region: process.env.region,
    });

    this.tableName = tableName;
    this.dynamoDB = new DynamoDB.DocumentClient();
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
      const data = await this.dynamoDB.scan(params).promise();
      return data.Items as T[];
    } catch (error) {
      throw new Error(`Failed to read items: ${error}`);
    }
  }
}

