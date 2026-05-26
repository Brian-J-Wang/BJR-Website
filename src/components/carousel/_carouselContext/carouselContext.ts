import { createContext, type SetStateAction } from "react";

type CarouselContextProps = {
    offset: number;
    setOffset: (number: number | ((prev: number) => number)) => void;
    slideCount: number;
};

export const CarouselContext = createContext<CarouselContextProps>({
    offset: 0,
    setOffset: () => {
        throw new Error("Not Implemented");
    },
    slideCount: 0,
});
