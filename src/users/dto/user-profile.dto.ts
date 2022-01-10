import { UserRole } from '../entities/role.entity';

export class UserProfileDto {
  id: number;
  username: string;
  active: boolean;
  createdDate: Date;
  role: UserRole;
}
