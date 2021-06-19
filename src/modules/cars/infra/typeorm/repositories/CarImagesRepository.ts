import { getRepository, Repository } from 'typeorm';

import { ICreateCarImagesDTO } from '@modules/cars/dtos/ICreateCarImagesDTO';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';

import { CarImage } from '../entities/CarImage';

class CarImagesRepository implements ICarImagesRepository {
  private ormRepository: Repository<CarImage>;

  constructor() {
    this.ormRepository = getRepository(CarImage);
  }

  async create({ car_id, image_name }: ICreateCarImagesDTO): Promise<CarImage> {
    const carImage = this.ormRepository.create({
      car_id,
      image_name,
    });

    await this.ormRepository.save(carImage);

    return carImage;
  }
}

export { CarImagesRepository };
