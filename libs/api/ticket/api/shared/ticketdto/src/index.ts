import { Prisma } from '@prisma/client';
export * from './lib/api-ticket-api-shared-ticketdto';

export declare type JsonValue =
  | string
  | number
  | boolean
  | null
  | Prisma.InputJsonArray
  | Prisma.InputJsonObject