import * as Crypto from 'expo-crypto';

export const getHashedFileName = async (url) => {
    const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, url);
    return `${hash}.mp4`;
};
