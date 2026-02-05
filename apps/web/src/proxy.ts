import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);
 
export const config = {
  // Ignore all paths that start with "api", "_next", "_vercel" or contain a dot (for static files)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};