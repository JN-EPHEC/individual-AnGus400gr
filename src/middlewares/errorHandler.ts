import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Affiche l’erreur complète dans la console
    console.error(err)

    // Récupère le status (par défaut 500)
    const status = err.status || 500

    // Récupère le message (par défaut message générique)
    const message = err.message || 'Erreur interne du serveur'

    res.status(status).json({
        error: message
    })
}
