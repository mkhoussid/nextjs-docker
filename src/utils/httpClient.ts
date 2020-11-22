import axios, { AxiosResponse } from 'axios';

export enum EMethodTypes {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
}

type TParams = any;

type TBody = any;

type THeaders = any;

export type TRequest = {
	url: string;
	method?: EMethodTypes;
	params?: TParams;
	body?: TBody;
	headers?: THeaders;
	stringify?: boolean;
	onUploadProgress?: (...params: any[]) => void;
};

type TResult<Result> = Result & Record<string, unknown>;

export const httpClient = async <Result>({
	url,
	method = EMethodTypes.GET,
	params = {},
	body = {},
	headers = {
		'Content-Type': 'application/json',
	},
	stringify = true,
	onUploadProgress = () => undefined,
}: TRequest): Promise<AxiosResponse<TResult<Result>>> =>
	await axios({
		url,
		method,
		params,
		data: stringify ? JSON.stringify(body) : body,
		headers,
		onUploadProgress,
		withCredentials: true,
	});
