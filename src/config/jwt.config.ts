import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    };
  },
};