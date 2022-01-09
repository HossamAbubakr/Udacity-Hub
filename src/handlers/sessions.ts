import { SessionModel } from "../models/sessions";
import express, { Request, Response } from "express";
const sessions = new SessionModel();

const index = async (req: Request, res: Response) => {
  try {
    const users = await sessions.index();
    res.send(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { date, title, sl_id } = req.body;
    const newLead = await sessions.create(date, title, sl_id);
    res.send(newLead);
  } catch (error) {
    res.status(500).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const lead = await sessions.show(id);
    res.send(lead);
  } catch (error) {
    res.status(500).json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id, date, title, sl_id } = req.body;
    const updatedLead = await sessions.update(id, date, title, sl_id);
    res.send(updatedLead);
  } catch (error) {
    res.status(500).json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const deletedLead = await sessions.delete(id);
    res.send(deletedLead);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addStudent = async (req: Request, res: Response) => {
  try {
    const sessionId = Number(req.params.id);
    const studentId = req.body.student_id;
    const session = await sessions.addStudent(studentId, sessionId);
  } catch (error) {
    res.status(500).json(error);
  }
};
