interface APIResponse<T> {
    isSuccessful: boolean;
    data: T
}