import TrackPlayer, { AppKilledPlaybackBehavior, Capability, RepeatMode } from 'react-native-track-player';
import { AddTrack } from 'react-native-track-player/src/interfaces';

export async function setupPlayer() {
    let isSetup = false;
    try {
        await TrackPlayer.getActiveTrack();
        isSetup = true;
    } catch {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            android: {
                appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
            },
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.SeekTo,
            ],
            compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
            progressUpdateEventInterval: 2,
        });

        isSetup = true;
    } finally {
        return isSetup;
    }
}

export async function addTracks(track: AddTrack) {
    await TrackPlayer.add([track]);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function playbackService() {
    // TODO: Attach remote event handlers
}
