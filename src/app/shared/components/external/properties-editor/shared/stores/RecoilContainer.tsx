import React from 'react';
import { MutableSnapshot, RecoilRoot } from 'recoil';

interface RecoilContainerProps {

}
export const RecoilContainer: React.FC<RecoilContainerProps> = ({ children }) => {

    const handleInitializaState = ({ set }: MutableSnapshot) => {

    }

    return (
        <RecoilRoot initializeState={handleInitializaState}>
            {children}
        </RecoilRoot>
    );
}
