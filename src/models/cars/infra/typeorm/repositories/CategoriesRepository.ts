import { getRepository, Repository } from 'typeorm';
import ICreateCategoryDTO from '@models/cars/dtos/ICreateCategoryDTO';
import ICategoriesRepository from '@models/cars/repositories/ICategoriesRepository';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    public async findByName(name: string): Promise<Category> {
        const findedCategory = await this.repository.findOne({ name });

        return findedCategory;
    }

    public async list(): Promise<Category[]> {
        const categories = await this.repository.find();

        return categories;
    }

    public async create({
        name,
        description,
    }: ICreateCategoryDTO): Promise<Category> {
        const category = this.repository.create({
            name,
            description,
        });

        await this.repository.save(category);

        return category;
    }
}

export default CategoriesRepository;
