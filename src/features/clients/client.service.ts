import { httpClient } from "@shared/lib/http-client";
import type { Paginated } from "@shared/types/paginated";
import type { Client } from "./client.types";

export class ClientService {
  static async getAll({ page = 1, perPage = 8 }: ClientService.ListAllParams) {
    const { data } = await httpClient.get<ClientService.ListAllResponse>("/clients", {
      params: {
        _page: page,
        _per_page: perPage,
      },
    });

    return data;
  }
}

export namespace ClientService {
  export type ListAllParams = { page?: number; perPage?: number };
  export type ListAllResponse = Paginated<Client>;
}
