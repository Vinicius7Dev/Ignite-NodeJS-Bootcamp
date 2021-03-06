import Car from '@models/cars/infra/typeorm/entities/Car';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('rentals')
class Rental {
    @PrimaryColumn('uuid')
    public id: string;

    @Column('uuid')
    public car_id: string;

    @ManyToOne(() => Car)
    @JoinColumn({ name: 'car_id' })
    car: Car;

    @Column('uuid')
    public user_id: string;

    @Column('timestamp')
    public start_date: Date;

    @Column('timestamp')
    public end_date: Date;

    @Column('timestamp')
    public expected_return_date: Date;

    @Column('numeric')
    public total: number;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export default Rental;
