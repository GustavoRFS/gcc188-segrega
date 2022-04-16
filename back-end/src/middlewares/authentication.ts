import express from "express";
import jwt from "jsonwebtoken";
import authConfig from '../config/auth'

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "jwt") {
        let token = request.headers.authorization ? request.headers.authorization.split(' ')[1] : null;
        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new Error("No token provided"));
            }
            jwt.verify(token, authConfig.secret, function (err: any, decoded: any) {
                if (err) {
                    reject(err);
                } else {
                    if (decoded.nivel && (decoded.nivel === 'admin' || scopes[0] === decoded.nivel)) {
                        resolve(decoded);
                    } else {
                        reject(new Error('Usuário não possui as permissões necessárias'))
                    }
                }
            });
        });
    }
}