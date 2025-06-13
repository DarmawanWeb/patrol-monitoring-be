import helmet from 'helmet';
import compression from 'compression';

export const securityConfig: {
  helmet: ReturnType<typeof helmet>;
  compression: ReturnType<typeof compression>;
} = {
  helmet: helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  }),
  compression: compression(),
};
