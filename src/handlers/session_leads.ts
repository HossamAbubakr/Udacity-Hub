import { LeadModel } from "../models/session_leads";
import express, { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import Authorize from "../helpers/jwtAuthorizer";
const sessionLeads = new LeadModel();

const index = async (req: Request, res: Response) => {
  try {
    Authorize(req);
  } catch (err) {
    res.status(401);
    return res.json("Access denied, invalid token");
  }
  try {
    const users = await sessionLeads.index();
    res.send(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const newLead = await sessionLeads.create(name, email, password);
    const token = sign(
      { user: { userId: newLead.id } },
      process.env.TOKEN_SECRET as string
    );
    res.send(token);
  } catch (error) {
    res.status(500).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const lead = await sessionLeads.show(id);
    res.send(lead);
  } catch (error) {
    res.status(500).json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id, name } = req.body;
    const updatedLead = await sessionLeads.update(id, name);
    res.send(updatedLead);
  } catch (error) {
    res.status(500).json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const deletedLead = await sessionLeads.delete(id);
    res.send(deletedLead);
  } catch (error) {
    res.status(500).json(error);
  }
};

const leads_routes = (app: express.Application) => {
  app.get("/leads", index);
  app.get("/leads/:id", show);
  app.post("/leads", create);
  app.put("/leads", update);
  app.delete("/leads", destroy);
};

export default leads_routes;
