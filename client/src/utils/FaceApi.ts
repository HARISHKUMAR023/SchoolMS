export const loadModels = async () => {
    const MODEL_URL = process.env.PUBLIC_URL + '/models';
    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
};

export const getFullFaceDescription = async (image) => {
    const img = await faceapi.bufferToImage(image);
    const fullDesc = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
    return fullDesc ? [fullDesc] : [];
};