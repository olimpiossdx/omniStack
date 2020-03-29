import { Request, Response } from 'express';
import generateUniqueId from '../utils/generateUniqueId';
import connection from '../database/connection';

const OngController = {
  async index(request: Request, response: Response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  },

  async create(request: Request, response: Response) {
    const { name, email, whatsapp, city, uf } = request.body;
    const id = generateUniqueId();

    await connection('ongs').insert({ id, name, email, whatsapp, city, uf });

    return response.json({ id });
  }
}
export default OngController;