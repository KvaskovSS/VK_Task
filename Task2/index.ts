import { EventEmitter } from './EventEmitter';

const emitter = new EventEmitter();
const logData = (data: { message: string }) => console.log(data);

emitter.on('data', logData);

emitter.emit('data', { message: 'Hello, world!' });

emitter.off('data', logData);

emitter.emit('data', { message: 'This will not be logged' });
