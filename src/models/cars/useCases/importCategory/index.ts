import CategoriesRepository from '../../repositories/CategoriesRepository';
import ImportCategoryController from './ImportCategoryController';
import ImportCategoryUseCase from './ImportCategoryUseCase';

const categoriesRepository = null;
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
const importCateogryController = new ImportCategoryController(
    importCategoryUseCase,
);

export default importCateogryController;
