interface ICreateCarDTO {
  name: string;
  category_id: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
}

export { ICreateCarDTO };
