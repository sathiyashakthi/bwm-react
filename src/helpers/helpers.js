import titelize from 'titelize';

export const rentalType = isShared =>isShared ?'shared':'entire';

export const toUppercase= value=> value ? titelize(value) :'';

