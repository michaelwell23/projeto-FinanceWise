import { EntityRepository, Repository } from 'typeorm';
import { Suggestion } from '../entities/Suggestion';

@EntityRepository(Suggestion)
export class SuggestionRepository extends Repository<Suggestion> {}
