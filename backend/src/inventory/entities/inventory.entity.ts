import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: 'inventory' })
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({  type: 'uuid', nullable: false})
    user_id: string;

    @Column()
    product_name: string;

    @Column()
    quantity: number;

    @Column()
    price: number;
    
    @Column()
    supplier_name: string;

    @Column()
    category: string;

    @ManyToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'user_id'})
    user: User;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}