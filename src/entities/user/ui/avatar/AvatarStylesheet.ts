import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    avatarWrapper: {
        position: 'relative',
    },
    avatar: {
        borderRadius: 5,
        overflow: 'hidden',
        maxWidth: '100%',
    },
    image: {
        objectFit: 'cover',
        paddingTop: 0,
    },
    noImage: {
        backgroundColor: '#323D5F',
        border: '1px solid rgb(200, 200, 200)',
    },
    buttonUpload: {
        position: 'absolute',
        right: -20,
        bottom: -25,
    },
});
