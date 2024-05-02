import { Router } from "express";

export interface IHttpHandler {
    registerRoutes(): Router
}