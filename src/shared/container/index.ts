import { container } from 'tsyringe';

import './providers';

import CategoriesRepository from '@models/cars/infra/typeorm/repositories/CategoriesRepository';
import ICategoriesRepository from '@models/cars/repositories/ICategoriesRepository';
import ISpecificationsRepository from '@models/cars/repositories/ISpecificationsRepository';
import SpecificationsRepository from '@models/cars/infra/typeorm/repositories/SpecificationsRepository';
import IUsersRepository from '@models/accounts/repositories/IUsersRepository';
import UsersRepository from '@models/accounts/infra/typeorm/repositories/UsersRepository';
import ICarsRepository from '@models/cars/repositories/ICarsRepository';
import CarsRepository from '@models/cars/infra/typeorm/repositories/CarsRepository';
import ICarImagesRepository from '@models/cars/repositories/ICarImagesRepository';
import CarImagesRepository from '@models/cars/infra/typeorm/repositories/CarImagesRepository';
import IRentalsRepository from '@models/rentals/repositories/IRentalsRepository';
import RentalsRepository from '@models/rentals/infra/typeorm/repositories/RentalsRepository';
import IUsersTokensRepository from '@models/accounts/repositories/IUsersTokensRepository';
import UsersTokensRepository from '@models/accounts/infra/typeorm/repositories/UsersTokensRepository';

container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
    'SpecificationsRepository',
    SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarImagesRepository>(
    'CarImagesRepository',
    CarImagesRepository,
);

container.registerSingleton<IRentalsRepository>(
    'RentalsRepository',
    RentalsRepository,
);

container.registerSingleton<IUsersTokensRepository>(
    'UsersTokensRepository',
    UsersTokensRepository,
);
