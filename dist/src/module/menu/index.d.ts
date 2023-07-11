/**
 * @description menu entry
 * @author itxve
 */
import UploadAudio from './UploadAudio';
import InsertAudio from './InsertAudio';
import EditAudio from './EditAudio';
export declare const uploadAudioMenuConf: {
    key: string;
    factory(): UploadAudio;
    config: import("./config").IUploadConfigForAudio;
};
export declare const insertAudioMenuConf: {
    key: string;
    factory(): InsertAudio;
    config: import("./config").InsertConfigForAudio;
};
export declare const editAudioMenuConf: {
    key: string;
    factory(): EditAudio;
};
