import { Request, Response } from 'express';
import { AccountReportService } from '../../services/Account/AccountReportService';

export class AccountReportController {
  public async getMonthlyReport(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { userId } = request;
    const { month, year } = request.query;

    if (!userId) {
      return response.status(400).json({ error: 'User ID is required' });
    }

    const reportService = new AccountReportService();

    try {
      const report = await reportService.getMonthlyReport(
        userId,
        Number(month),
        Number(year)
      );
      return response.status(200).json(report);
    } catch (error) {
      return response.status(400).json({
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }
}
