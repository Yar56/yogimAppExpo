import { Ionicons } from '@expo/vector-icons';
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import DocumentPicker, { isCancel, isInProgress, types } from 'react-native-document-picker';
import { Avatar, IconButton } from 'react-native-paper';
import styles from './AvatarStylesheet';
import { supabase } from '../../../../shared/lib/baas/supabase';
import { useAppTheme } from '../../../../app/providers/MaterialThemeProvider';
import { useAppSelector } from '../../../../app/store/hooks';
import ReactNiceAvatar, { AvatarFullConfig, genConfig } from '@zamplyy/react-native-nice-avatar';
import { UserSex } from '../../../../shared/api/supaBase/models';

interface AvatarProps {
    size?: number;
    url?: string | null;
    onUpload?: (filePath: string) => void;
}
const staticConfig: AvatarFullConfig = {
    faceColor: '#FFC7B3',
    earSize: 'big',
    hairColor: 'brown',
    noseStyle: 'short',
    mouthStyle: 'smile',
    shirtColor: '#9487FF',
    shirtStyle: 'polo',
    glassesStyle: 'none',
    hatStyle: 'none',
    eyeStyle: 'oval',
};
export const AvatarComponent: FunctionComponent<AvatarProps> = ({ url, onUpload, size = 72 }) => {
    const theme = useAppTheme();
    const [uploading, setUploading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const avatarSize = { height: size, width: size };
    const profile = useAppSelector((state) => state.userState.profile);

    const config = useMemo(() => {
        if (profile?.sex) {
            return genConfig({
                sex: profile.sex === UserSex.MALE ? 'man' : 'woman',
                bgColor: theme.colors.colorLevel4,
                hairStyle: profile.sex === UserSex.MALE ? 'thick' : 'womanLong',
                ...staticConfig,
            });
        }
    }, [profile, theme.colors.colorLevel4]);

    useEffect(() => {
        if (url) {
            downloadImage(url);
        }
    }, [url]);
    async function downloadImage(path: string) {
        try {
            const [, originalpath] = path.split('avatars/');

            const { data, error } = await supabase.storage.from('avatars').download(originalpath);

            if (error) {
                throw error;
            }

            // eslint-disable-next-line no-undef
            const fr = new FileReader();
            fr.readAsDataURL(data);
            fr.onload = () => {
                setAvatarUrl(fr.result as string);
            };
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error downloading image: ', error.message);
            }
        }
    }

    const unknownAvatar = useMemo(
        () =>
            profile && profile.sex ? (
                <ReactNiceAvatar size={avatarSize.width} {...config} />
            ) : (
                <Avatar.Image
                    size={avatarSize.width}
                    source={{
                        uri: `https://ui-avatars.com/api/?name=${profile?.username}&bold=true&size${avatarSize.width}`,
                    }}
                />
            ),
        [avatarSize.width, config, profile]
    );

    async function uploadAvatar() {
        try {
            setUploading(true);

            const file = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
                type: types.images,
                mode: 'open',
            });

            const photo = {
                uri: file.fileCopyUri,
                type: file.type,
                name: file.name,
            };

            const formData = new FormData();
            // @ts-ignore
            formData.append('file', photo);

            const fileExt = file?.name?.split('.').pop();
            const filePath = `${Math.random()}.${fileExt}`;

            const { error, data } = await supabase.storage.from('avatars').upload(filePath, formData);

            const response = supabase.storage.from('avatars').getPublicUrl(data?.path ?? '');

            if (error) {
                throw error;
            }

            onUpload?.(response.data.publicUrl);
        } catch (error) {
            if (isCancel(error)) {
                console.warn('cancelled');
                // User cancelled the picker, exit any dialogs or menus and move on
            } else if (isInProgress(error)) {
                console.warn('multiple pickers were opened, only the last will be considered');
            } else if (error instanceof Error) {
                Alert.alert(error.message);
            } else {
                throw error;
            }
        } finally {
            setUploading(false);
        }
    }

    return (
        <View style={{ width: avatarSize.width, position: 'relative' }}>
            {avatarUrl ? (
                <Avatar.Image
                    size={size}
                    source={{ uri: avatarUrl }}
                    accessibilityLabel="Avatar"
                    style={[avatarSize]}
                />
            ) : (
                unknownAvatar
            )}
            {onUpload && (
                <View style={styles.buttonUpload}>
                    <IconButton
                        disabled={uploading}
                        icon={() => {
                            return (
                                <Ionicons
                                    name="camera-outline"
                                    size={20}
                                    color={theme.dark ? '#E7E1E5' : theme.colors.secondary}
                                />
                            );
                        }}
                        containerColor={theme.colors.colorLevel4}
                        // style={{ backgroundColor: '#156392' }}
                        size={13}
                        onPress={uploadAvatar}
                    />
                </View>
            )}
        </View>
    );
};
