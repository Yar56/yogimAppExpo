import React, { FunctionComponent, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import DocumentPicker, { isCancel, isInProgress, types } from 'react-native-document-picker';
import { Avatar } from 'react-native-paper';

import { PROFILE_DEFAULT_AVATAR } from '../../../../shared/constants/resourses';
import { supabase } from '../../../../shared/lib/baas/supabase';

interface AvatarProps {
    size?: number;
    url: string | null;
    onUpload: (filePath: string) => void;
}

export const AvatarComponent: FunctionComponent<AvatarProps> = ({ url, onUpload, size }) => {
    const [uploading, setUploading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const avatarSize = { height: size, width: size };

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
            formData.append('file', photo);

            const fileExt = file?.name?.split('.').pop();
            const filePath = `${Math.random()}.${fileExt}`;

            const { error } = await supabase.storage.from('avatars').upload(filePath, formData);

            if (error) {
                throw error;
            }

            onUpload(filePath);
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
        <View>
            {avatarUrl ? (
                <Avatar.Image
                    size={size}
                    source={{ uri: avatarUrl }}
                    accessibilityLabel="Avatar"
                    style={[avatarSize]}
                />
            ) : (
                <Avatar.Image
                    // style={{ backgroundColor: theme === 'dark' ? '#323D5F' : '#6E4066' }}
                    source={PROFILE_DEFAULT_AVATAR}
                />
            )}
            {/*<View style={styles.buttonUpload}>*/}
            {/*    <IconButton*/}
            {/*        disabled={uploading}*/}
            {/*        icon={() => {*/}
            {/*            return <MaterialIcons name="add-a-photo" size={20} color="#E7E1E5" />;*/}
            {/*        }}*/}
            {/*        style={{ backgroundColor: '#00A4F9' }}*/}
            {/*        size={23}*/}
            {/*        onPress={uploadAvatar}*/}
            {/*    />*/}
            {/*</View>*/}
        </View>
    );
};
