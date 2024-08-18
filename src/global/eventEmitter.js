import { EventEmitter } from 'node:events';

class MyEmitter extends EventEmitter {}

export const emitterImageControllerToSocket = new MyEmitter();

 