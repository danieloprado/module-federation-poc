export interface IAppConfig {
  NODE_ENV: 'production' | 'development';
  VERSION: string;
  PORT: number;

  IS_DEV: boolean;
  IS_PROD: boolean;
  IS_HOMOLOG: boolean;
  IS_TEST: boolean;

  SENTRY: {
    ENV: 'production' | 'development' | 'homolog';
    DSN: string;
  };

  ACCOUNTS: {
    ENDPOINT_API: string;
    PARTNER_ID: string;
    PARTNER_SECRET: string;
  };

  AUTH: {
    TIMEOUT: number;
    SECRET: string;
  };

  DATABASE: {
    HOST: string;
    PORT: number;
    DATABASE: string;
    USER: string;
    PASSWORD: string;
  };
}

const secrets = JSON.parse(process.env.EDUZZ_FIDIC_AGREEMENT_SECRETS || '{}');
function env(name: string, defaultValue?: string) {
  return (secrets[name] || process.env[name] || defaultValue || '').trim() || null;
}

export function loadConfig(): IAppConfig {
  const NODE_ENV = env('NODE_ENV', 'production');
  const SENTRY_ENV = env('SENTRY_ENV', NODE_ENV);

  return {
    NODE_ENV,
    VERSION: env('VERSION', 'dev'),
    PORT: env('PORT', '5000'),

    IS_DEV: NODE_ENV !== 'production' && NODE_ENV !== 'test',
    IS_PROD: NODE_ENV === 'production',
    IS_HOMOLOG: SENTRY_ENV === 'homolog',
    IS_TEST: NODE_ENV === 'test',

    SENTRY: {
      ENV: SENTRY_ENV,
      DSN: env('SENTRY_DSN')
    },

    ACCOUNTS: {
      ENDPOINT_API: env('ACCOUNTS_ENDPOINT_API', 'https://accounts-api.eduzz.com'),
      PARTNER_ID: env('ACCOUNTS_PARTNER_ID', 'f19475c2-4090-482a-8532-da34eb946dd7'),
      PARTNER_SECRET: env('ACCOUNTS_PARTNER_SECRET')
    },

    AUTH: {
      TIMEOUT: 480, // 20 minutos
      SECRET: Buffer.from('yd7w8uOayGdAQ3jt2PDuwqaODOtAWSjmJbyyX0LKnDRM8QORSS', 'base64').toString('utf8')
    },

    DATABASE: {
      HOST: env('DB_MAXYALLPROD_HOST'),
      PORT: Number(env('DB_MAXYALLPROD_PORT')),
      DATABASE: env('DB_MAXYALLPROD_DATABASE'),
      USER: env('DB_MAXYALLPROD_USER'),
      PASSWORD: env('DB_MAXYALLPROD_PASSWORD')
    }
  };
}
