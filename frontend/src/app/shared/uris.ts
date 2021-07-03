import { environment } from '../../environments/environment';
export const API_OLD = `${location.protocol}//firulais.net.ar:${(location.protocol === 'https:' ? 3443 : 4400)}/api`;
export const AUTH_OLD = `${location.protocol}//firulais.net.ar:${(location.protocol === 'https:' ? 3443 : 4400)}`;
//export const API_URI = `${location.protocol}//localhost:${(location.protocol === 'https:' ? 3443 : 4400)}/api`;
//export const AUTH_URI = `${location.protocol}//localhost:${(location.protocol === 'https:' ? 3443 : 4400)}`;
// export const API_URI = `${location.protocol}//firulais.net.ar:${(location.protocol == 'https:' ? 3443 : 3000)}/api`
// export const AUTH_URI = `${location.protocol}//firulais.net.ar:${(location.protocol == 'https:' ? 3443 : 3000)}`
export const API_URI = environment.API_URI;
export const AUTH_URI = environment.AUTH_URI;
console.log(API_URI);
console.log(AUTH_URI);
