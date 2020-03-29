import { Request, Response } from 'express';
const connection = require('../database/connection');

const SessionController = {
  async create(request: Request, response: Response) {
    const { id } = request.body;

    const ong = await connection('ongs').where('id', id).select('name').first();

    if (!ong) {
      return response.status(400).json({ error: 'No ONG found with this ID. ' });
    }

    return response.json(ong);
  }
};

export default SessionController;