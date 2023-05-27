import React, { createContext, ReactNode, useState } from 'react';

interface Main {
    isGlobalLoading: boolean;
    setIsGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MainProvider {
    children: ReactNode;
}

const MainContext = createContext<Main>({} as Main);

const MainProvider: (props: MainProvider) => any = ({ children }: MainProvider) => {
    const [isGlobalLoading, setIsGlobalLoading] = useState<boolean>(false);

    return (
        <MainContext.Provider
            value={
                {
                    isGlobalLoading,
                    setIsGlobalLoading,
                }}
        >
            {children}
        </MainContext.Provider>
    );
};

const useMain = () => {
    const context = React.useContext(MainContext);
    if (context === undefined) {
        throw new Error('useMain must be used within a MainProvider');
    }
    return context;
};

export { MainContext, MainProvider, useMain };