import { IUserRepository, User } from '.';
import { DynamoDBTable } from '../services/DynamoDbTable';

export class UserRepository
  extends DynamoDBTable<User>
  implements IUserRepository
{
  async readByEmail(email: string): Promise<User | null> {
    const params = {
      TableName: this.tableName,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :value',
      ExpressionAttributeValues: {
        ':value': email,
      },
    };
    try {
      const data = await this.dynamoDB.query(params).promise();
      const users = data.Items as User[] | null;
      return users?.[0] || null;
    } catch (error) {
      throw new Error(`Failed to read item: ${error}`);
    }
  }
}
