import { getCustomRepository } from 'typeorm';
import { AccountRepository } from '../../repositories/AccountRepository';
import { EmailService } from '../../services/Notification/EmailService';

export class ReminderService {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async sendReminders(): Promise<void> {
    const accountRepository = getCustomRepository(AccountRepository);

    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 5);

    const accountsDueSoon = await accountRepository
      .createQueryBuilder('account')
      .where('account.dueDate BETWEEN :today AND :futureDate', {
        today,
        futureDate,
      })
      .leftJoinAndSelect('account.user', 'user')
      .getMany();

    for (const account of accountsDueSoon) {
      if (account.user?.email) {
        const emailText = `Olá ${account.user.name},
        Sua conta "${account.name}" com o valor de ${account.amount} está com vencimento em ${account.dueDate}.
        Não se esqueça de efetuar o pagamento para evitar problemas!`;

        await this.emailService.sendEmail(
          account.user.email,
          'Lembrete de Vencimento de Conta',
          emailText
        );
      }
    }
  }
}
