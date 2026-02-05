import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // Lista de locais suportados
  locales: ['pt', 'en'],
 
  // Usado quando não há correspondência de local
  defaultLocale: 'pt'
});
 
// Wrappers para os hooks de navegação do Next.js
export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);