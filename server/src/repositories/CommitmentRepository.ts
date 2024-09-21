import { EntityRepository, Repository } from 'typeorm';
import { Commitment } from '../entities/Commitment';

@EntityRepository(Commitment)
export class CommitmentRepository extends Repository<Commitment> {}
