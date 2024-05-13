import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  name: string;

  @Column()
  mobile: number;

  @Column()
  age: number;

  @Column()
  address: number;

  @Column()
  country: number;

  @Column()
  state: number;



  @Column()
  password: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: true })
  isStatus: boolean;
}