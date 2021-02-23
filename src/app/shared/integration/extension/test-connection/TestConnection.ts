import { IResponseProps } from "../../../interfaces";
import { ApiConfig } from "../../ApiConfigs";
import { TResult } from "../../../types";

interface ISystemInformation {
    systemVersion?: string,
    connected: boolean;
    platform?: string,
}

export const TestConnection = {
    async test(): Promise<TResult<ISystemInformation>> {
        try {
            const { data: { data } } = await ApiConfig.get<IResponseProps<ISystemInformation>>('/test-connection');

            if (!data) {
                return {
                    result: {
                        connected: false,
                    }
                };
            }

            return { result: data };
        } catch (e) {
            return {
                result: {
                    connected: false,
                }
            };
        }
    }
}
