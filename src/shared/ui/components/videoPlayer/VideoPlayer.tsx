import { Video } from 'expo-av';
import { ResizeMode } from 'expo-av/src/Video.types';
import React, { FunctionComponent, useRef } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import styles from './VideoPlayerStylesheet';

interface VideoPlayerProps {
    url: string;
}
export const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({ url }) => {
    const video = useRef<Video>(null);
    // const [status, setStatus] = useState<AVPlaybackStatusSuccess & AVPlaybackStatus>();
    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={{ uri: url }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
            />
            <View style={styles.buttons}>
                <Button onPress={() => video?.current?.playFromPositionAsync(5000)}>play form 5s</Button>
                {/*<Button onPress={() => video?.current?.setIsLoopingAsync(!status?.isLooping)}>*/}
                {/*    /!*{status?.isLooping ? 'not' : 'set to loop'}*!/*/}
                {/*</Button>*/}
            </View>
        </View>
    );
};
