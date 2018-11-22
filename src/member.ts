import { Address, CommonQueryOptions, Stateful } from './types'
import { of, Observable } from 'rxjs'
import { Reward } from './reward'
import {
  Proposal,
  ProposalQueryOptions,
  Stake,
  Vote,
  StakeQueryOptions,
  VoteQueryOptions
} from './proposal'
import { DAO } from './dao'

interface MemberState {
  address: Address
  dao: string
  eth: number
  reputation: number
  tokens: number
  gen: number
  approvedGen: number
}

/**
 * Represents a user of a DAO
 */

export class Member implements Stateful<MemberState> {
  state: Observable<MemberState> = of()

  /**
   * [constructor description]
   * @param address address of the user
   * @param dao     address of the DAO
   */
  constructor(private address: string, private dao: string) {}

  rewards(): Observable<Reward[]> {
    throw new Error('not implemented')
  }

  proposals(options: ProposalQueryOptions = {}): Observable<Proposal[]> {
    const dao = new DAO(this.dao)
    return dao.proposals(options)
  }

  stakes(options: StakeQueryOptions = {}): Observable<Stake[]> {
    const dao = new DAO(this.dao)
    return dao.stakes(options)
  }

  votes(options: VoteQueryOptions = {}): Observable<Vote[]> {
    const dao = new DAO(this.dao)
    return dao.votes(options)
  }
}

export interface MemberQueryOptions extends CommonQueryOptions {
  address?: Address
  dao?: Address
}