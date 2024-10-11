import { getCustomRepository } from 'typeorm';
import { SuggestionRepository } from '../../repositories/SuggestionRepository';

export class SuggestionGetAllService {
  public async getAllSuggestions(userId: string): Promise<any> {
    const suggestionRepository = getCustomRepository(SuggestionRepository);

    const suggestions = await suggestionRepository.find({
      where: { emotion: { user: { id: userId } } },
      relations: ['emotion'],
    });

    return suggestions;
  }
}
