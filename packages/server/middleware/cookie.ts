import cookieParserMiddleware from 'cookie-parser'
import type { RequestHandler } from 'express'

const cookieParser: RequestHandler = cookieParserMiddleware()

export default cookieParser
