declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user: {
        id: string;
      };
    }
  }
}
