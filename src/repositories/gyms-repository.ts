import { User } from '@prisma/client'

export interface GymsRepository {
  findById(id: string): Promise<User | null>
}
