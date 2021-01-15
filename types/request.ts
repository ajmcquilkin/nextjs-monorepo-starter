export interface SingleRequestState {
  isLoading: boolean,
  message?: string,
  code?: number | string | null
}

export interface RequestState {
  [requestName: string]: SingleRequestState
}
