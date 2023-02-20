import { buildCheckFunction } from 'express-validator'

export const expressValidator = () => buildCheckFunction(['body', 'params', 'query'])('*').escape()
