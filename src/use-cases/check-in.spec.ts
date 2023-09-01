import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckinUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckinUseCase

describe('Check-In Use Cases', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckinUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitudde: new Decimal(-11.1874467),
      longitude: new Decimal(-37.9937972),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  // deveria poder fazer o check-in
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -11.1874467,
      userLongitude: -37.9937972,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  // não deve ser possível fazer check-in duas vezes no mesmo dia
  it('should not be able to check in twice in  the same day', async () => {
    vi.setSystemTime(new Date(2023, 8, 22, 14, 18, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -11.1874467,
      userLongitude: -37.9937972,
    })

    expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -11.1874467,
        userLongitude: -37.9937972,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
  // não deve ser possível fazer check-in duas vezes, mas em dias diferentes
  it('should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 8, 22, 14, 18, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -11.1874467,
      userLongitude: -37.9937972,
    })

    vi.setSystemTime(new Date(2023, 8, 23, 14, 18, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -11.1874467,
      userLongitude: -37.9937972,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant of gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitudde: new Decimal(-11.1711371),
      longitude: new Decimal(-37.9846761),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -11.1874467,
        userLongitude: -37.9937972,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
