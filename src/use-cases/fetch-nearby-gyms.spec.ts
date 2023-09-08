import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Cases', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  // deveria poder fazer o check-in
  it('should be able to fetch nearby for gyms', async () => {
    await gymsRepository.create({
      title: 'HD Studio',
      description: null,
      phone: null,
      latitudde: -11.1874467,
      longitude: -37.9937972,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitudde: -11.095301,
      longitude: -37.8024707,
    })

    const { gyms } = await sut.execute({
      userLatitude: -11.1874467,
      userLongitude: -37.9937972,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'HD Studio' })])
  })
})
