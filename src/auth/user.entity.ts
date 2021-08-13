import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcyrpt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  salt: string;

  async validatePasswor(password: string): Promise<boolean> {
    const hash = await bcyrpt.hash(password, this.salt);
    return hash === this.password;
  }
}
