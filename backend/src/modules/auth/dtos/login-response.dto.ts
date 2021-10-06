export interface LoginResponseDto {
    accessToken: string;
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        profileImageUrl?: string;
    };
}
