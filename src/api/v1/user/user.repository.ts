import { IUserRepository, User } from '.';
import { DynamoDBTable } from '../services/DynamoDbTable';

export class UserRepository
  extends DynamoDBTable<User>
  implements IUserRepository
{
  async readByEmail(email: string): Promise<User | null> {
    const params = {
      TableName: this.tableName,
      Key: { email },
    };

    try {
      const data = await this.dynamoDB.get(params).promise();
      return data.Item as User | null;
    } catch (error) {
      throw new Error(`Failed to read item: ${error}`);
    }
  }
}
