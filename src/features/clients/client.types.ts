import type { Paginated } from "@shared/types/paginated";

export type Client = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
  vehicleType: string;
  vehicleModel: string;
  vehicleManufacturer: string;
};

export type GetAllClientsParams = { page?: number; perPage?: number };
export type GetAllClientsResponse = Paginated<Client>;
