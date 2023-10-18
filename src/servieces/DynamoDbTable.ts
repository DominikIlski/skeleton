import { DynamoDB } from 'aws-sdk';

class DynamoDBTable<T> {
  private static instance: DynamoDBTable<any>;
  private readonly tableName: string;
  private readonly dynamoDB: DynamoDB.DocumentClient;

  private constructor(tableName: string) {
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

  async read(id: string): Promise<T | null> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };

    try {
      const data = await this.dynamoDB.get(params).promise();
      return data.Item as T;
    } catch (error) {
      throw new Error(`Failed to read item: ${error}`);
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

  async delete(id: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };

    try {
      await this.dynamoDB.delete(params).promise();
    } catch (error) {
      throw new Error(`Failed to delete item: ${error}`);
    }
  }
}

export default DynamoDBTable;
