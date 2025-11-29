import { create } from 'zustand'
import { ResOAuth } from '@/interface/responseData/interfaceOAuth'

interface State_ResOAuth {
    resOAuth: ResOAuth | undefined;
    setResOAuth: (data: ResOAuth) => void;
}

export const useState_ResOAuth = create<State_ResOAuth>((set) => ({
    resOAuth: undefined,
    setResOAuth: (data) => set({ resOAuth: data })
}))