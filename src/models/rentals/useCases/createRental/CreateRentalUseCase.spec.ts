import dayjs from 'dayjs';
import RentalsRepositoryInMemory from '@models/rentals/repositories/inmemory/RentalsRepositoryInMemory';
import IRentalsRepository from '@models/rentals/repositories/IRentalsRepository';
import AppError from '@shared/errors/AppError';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';
import DayJsProvider from '@shared/container/providers/DateProvider/implementations/DayjsProvider';
import CreateRentalUseCase from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: IRentalsRepository;
let dateProvider: IDateProvider;

describe('CreateRental', () => {
    const returnDate24Hours = dayjs().add(1, 'day').toDate();

    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMemory();
        dateProvider = new DayJsProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepository,
            dateProvider,
        );
    });

    it('should be able to create a new rental', async () => {
        const rental = await createRentalUseCase.execute({
            car_id: '123',
            user_id: '987',
            expected_return_date: returnDate24Hours,
        });

        expect(rental).toHaveProperty('id');
    });

    it('should not be able to create a new rental with a unvailable car', async () => {
        await createRentalUseCase.execute({
            car_id: 'same_car',
            user_id: '123',
            expected_return_date: returnDate24Hours,
        });

        await expect(
            createRentalUseCase.execute({
                car_id: 'same_car',
                user_id: '987',
                expected_return_date: returnDate24Hours,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new rental if there is another open to the same user', async () => {
        await createRentalUseCase.execute({
            car_id: '123',
            user_id: 'same_user',
            expected_return_date: returnDate24Hours,
        });

        await expect(
            createRentalUseCase.execute({
                car_id: '987',
                user_id: 'same_user',
                expected_return_date: returnDate24Hours,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new rental with invalid return time', async () => {
        await expect(
            createRentalUseCase.execute({
                car_id: '123',
                user_id: '987',
                expected_return_date: new Date(),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
