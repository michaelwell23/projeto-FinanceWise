import cron from 'node-cron';
import { ReminderService } from '../../services/Remider/RemiderService';

const reminderService = new ReminderService();

// Agendamento para executar todos os dias às 9:00 da manhã
cron.schedule('0 9 * * *', async () => {
  console.log('Executando job de lembretes de vencimento...');
  try {
    await reminderService.sendReminders();
    console.log('Lembretes enviados com sucesso.');
  } catch (error) {
    console.error('Erro ao enviar lembretes:', error);
  }
});
