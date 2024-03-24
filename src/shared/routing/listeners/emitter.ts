import { createNanoEvents } from 'nanoevents';

interface RoutingNanoEvents {
    moveToTargetScreen(targetScreen: keyof RootStackParamList, params: Record<string, unknown>): void;
}

const routingEmitter = createNanoEvents<RoutingNanoEvents>();

export default routingEmitter;
