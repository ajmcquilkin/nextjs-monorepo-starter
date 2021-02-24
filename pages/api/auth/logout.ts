import { Empty } from 'types/generic';
import { createDefaultHandler } from 'utils/api';
import { casInstance } from 'utils/auth';

const handler = createDefaultHandler<Empty>({ requireAuth: false })
  .use(casInstance.logout)
  .get((req, res) => req.session.destroy((error) => {
    if (error) throw error;
    return res.status(200).json({ data: {}, meta: { message: 'Session destroyed', success: true } });
  }));

export default handler;
