import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileService } from '@/repositories/profile'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (req.method === 'GET') {
    try {
      const profiles = await ProfileService.getListProfileByUserId(Number(userId));
      if (!profiles || profiles.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy hồ sơ cho userId này' });
      }
      res.status(200).json(profiles);
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy danh sách hồ sơ bệnh nhân' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Phương thức ${req.method} không được phép`);
  }
}
