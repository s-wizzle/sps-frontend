import debug from 'debug';

debug.enable('SPS*');

export const log = debug('SPS');

export const createSpsLogger = (namespace: string) => log.extend(namespace);

export const gameManagementLogger = createSpsLogger('game-management');
export const gameManagementError = gameManagementLogger.extend('error');
export const gameManagementTrace = gameManagementLogger.extend('trace');

export const gameplayLogger = createSpsLogger('gameplay');
export const gameplayError = gameManagementLogger.extend('error');
export const gameplayTrace = gameManagementLogger.extend('trace');

export const gameApiLogger = createSpsLogger('gameApi');
export const gameApiError = gameApiLogger.extend('error');
export const gameApiTrace = gameApiLogger.extend('trace');