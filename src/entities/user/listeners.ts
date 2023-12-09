import { createNanoEvents } from 'nanoevents';

interface UserEmitterNanoEvents {
    setUserToDb(): void;
}

export const userEmitter = createNanoEvents<UserEmitterNanoEvents>();
