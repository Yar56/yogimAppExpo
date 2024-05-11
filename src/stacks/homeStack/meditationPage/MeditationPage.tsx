import { FontAwesome } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Slider } from 'react-native-awesome-slider';
import { HapticModeEnum } from 'react-native-awesome-slider/src/slide';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FastImage from 'react-native-fast-image';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { ActivityIndicator, IconButton, Text } from 'react-native-paper';
import Animated, { convertToRGBA, Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { rgbaArrayToRGBAColor } from 'react-native-reanimated/src';
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player';
import { AddTrack } from 'react-native-track-player/src/interfaces';

import styles from './MeditationPageStylesheet';
import { useAppTheme } from '../../../app/providers/MaterialThemeProvider';
import { useAppSelector } from '../../../app/store/hooks';
import { addTracks, setupPlayer } from '../../../shared/lib/audio/trackPlayerServices';
import { HomeScreen } from '../../../shared/routing/NavigationEntities';
import { Spacer } from '../../../shared/ui/components/Spacer';
import CommonLayout from '../../../shared/ui/layouts/CommonLayout';

type Props = NativeStackScreenProps<RootStackParamList, HomeScreen.MEDITATION>;

// @ts-ignore
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};

function format(seconds: number) {
    const mins = (seconds / 60).toString().padStart(2, '0');

    return parseInt(mins, 10);
}

const MeditationPage: FunctionComponent<Props> = ({ route }) => {
    const theme = useAppTheme();
    const meditationId = route.params.meditationId;

    const meditation = useAppSelector(
        (state) => state.meditationState.meditations?.find((meditation) => meditation.id === meditationId)
    );

    const scaleDownAnimation = useSharedValue(1);
    const handlePlayAnimation = (state: 'pause' | 'play') => {
        scaleDownAnimation.value = withTiming(state === 'play' ? 1.1 : 1, { duration: 2000, easing });
    };

    const imageAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scaleDownAnimation.value }],
    }));

    const playerState = usePlaybackState();
    const { position, duration, buffered } = useProgress(50);

    const progress = useSharedValue(format(position));
    const cached = useSharedValue(format(buffered));
    const min = useSharedValue(0);
    const max = useSharedValue(format(duration));

    useEffect(() => {
        if (position) {
            progress.value = position;
        }
        if (duration) {
            max.value = duration;
        }
        if (buffered) {
            cached.value = buffered;
        }
    }, [position, duration, buffered]);

    async function handlePlayPress() {
        if ((await TrackPlayer.getPlaybackState()).state === State.Playing) {
            TrackPlayer.pause();
            handlePlayAnimation('pause');
        } else {
            TrackPlayer.play();
            handlePlayAnimation('play');
        }
    }

    const [isPlayerReady, setIsPlayerReady] = useState(false);

    useEffect(() => {
        async function setup(track: AddTrack) {
            const isSetup = await setupPlayer();

            const queue = await TrackPlayer.getQueue();
            if (isSetup && queue.length <= 0) {
                await addTracks(track);
            }

            setIsPlayerReady(isSetup);
        }

        if (!meditation) {
            return;
        }
        setup({ url: meditation.audioUrl, title: meditation.title });
        TrackPlayer.pause();

        return () => {
            TrackPlayer.reset();
        };
    }, []);

    const progressFillPercent = (progress.value / max.value) * 100;

    const animateSyntheticRef: Record<string, AnimatedCircularProgress | null> = {
        circularProgress: null,
    };

    useEffect(() => {
        animateSyntheticRef.circularProgress?.reAnimate(
            progressFillPercent,
            progressFillPercent,
            800,
            Easing.inOut(Easing.ease)
        );
    }, [progressFillPercent]);

    if (!meditation) {
        return (
            <CommonLayout externalStyles={styles.container} edges={['top', 'bottom']}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text variant="titleMedium">Медитация не найдена! Смахните приложение</Text>
                </View>
            </CommonLayout>
        );
    }

    if (!isPlayerReady) {
        return (
            <CommonLayout externalStyles={styles.container} edges={['top', 'bottom']}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#6483CB" />
                </View>
            </CommonLayout>
        );
    }

    const rgba = convertToRGBA(meditation.color);
    const cacheColor = rgbaArrayToRGBAColor([rgba[0], rgba[1], rgba[2], 0.5]);
    const maximumColor = rgbaArrayToRGBAColor([rgba[0], rgba[1], rgba[2], 0.35]);

    return (
        <CommonLayout externalStyles={styles.container} edges={['top', 'bottom']}>
            <View style={styles.audioStateWrapper}>
                <AnimatedCircularProgress
                    ref={(ref) => (animateSyntheticRef.circularProgress = ref)}
                    rotation={0}
                    size={350}
                    width={9}
                    easing={Easing.inOut(Easing.ease)}
                    fill={progressFillPercent}
                    tintColor={meditation.color}
                    lineCap="round"
                    backgroundColor={maximumColor}
                    children={() => {
                        return (
                            <AnimatedFastImage
                                source={{ uri: meditation.photoUrl as string, priority: FastImage.priority.normal }}
                                style={[styles.image, imageAnimatedStyle]}
                            />
                        );
                    }}
                />
            </View>
            <Spacer size={50} />
            <Text variant="headlineMedium" style={{ ...styles.title, color: meditation.color }}>
                {meditation.title}
            </Text>
            <Spacer size={50} />

            <View style={styles.playerWrapper}>
                <View style={styles.controlsWrapper}>
                    <IconButton
                        disabled
                        icon={() => <FontAwesome name="step-backward" size={30} color={cacheColor} disabled />}
                    />
                    <IconButton
                        icon={() => (
                            <FontAwesome
                                name={playerState.state === State.Playing ? 'pause' : 'play'}
                                size={30}
                                color={meditation.color}
                            />
                        )}
                        onPress={handlePlayPress}
                        size={30}
                        style={{ alignSelf: 'center' }}
                    />
                    <IconButton
                        disabled
                        icon={() => <FontAwesome name="step-forward" size={30} color={cacheColor} disabled />}
                    />
                </View>

                <View style={styles.sliderWrapper}>
                    <Slider
                        style={styles.slider}
                        cache={cached}
                        progress={progress}
                        minimumValue={min}
                        maximumValue={max}
                        disable={!isPlayerReady || !meditation}
                        hapticMode={HapticModeEnum.BOTH}
                        onValueChange={(value) => {
                            TrackPlayer.seekTo(value);
                        }}
                        theme={{
                            // disableMinTrackTintColor: '#fff',
                            maximumTrackTintColor: maximumColor,
                            minimumTrackTintColor: meditation.color,
                            cacheTrackTintColor: cacheColor,
                            bubbleBackgroundColor: cacheColor,
                            // heartbeatColor: '#999',
                        }}
                        onHapticFeedback={() => {
                            ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
                        }}
                    />
                </View>
            </View>

            <Text
                variant="titleMedium"
                style={{ ...styles.description, color: theme.dark ? cacheColor : meditation.color }}
            >
                {meditation.description}
            </Text>
        </CommonLayout>
    );
};

export default MeditationPage;
