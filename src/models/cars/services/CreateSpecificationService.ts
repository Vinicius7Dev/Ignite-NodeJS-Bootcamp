import Specification from '../model/Specification';
import ISpecificationsRepository from '../repositories/ISpecificationsRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationService {
    private specificationsRepository: ISpecificationsRepository;

    constructor(specificationsRepository: ISpecificationsRepository) {
        this.specificationsRepository = specificationsRepository;
    }

    public execute({ name, description }: IRequest): Specification {
        const specificationAlreadyExists = this.specificationsRepository.findByName(
            name,
        );

        if (specificationAlreadyExists) {
            throw new Error('Specification already exists.');
        }

        const specification = this.specificationsRepository.create({
            name,
            description,
        });

        return specification;
    }
}

export default CreateSpecificationService;
