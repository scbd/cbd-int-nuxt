export interface drupalToken {
    "token_type": string,
    "expires_in": number,
    "access_token": string,
    "refresh_token": string,
    "timeout"?: number,
}