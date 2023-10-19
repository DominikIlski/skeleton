import { Router } from "express";

export interface IBasicRouter {
    readonly router : Router;
    setupRouter() : Router;
}