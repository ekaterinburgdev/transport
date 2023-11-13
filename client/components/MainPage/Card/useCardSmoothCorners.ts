import { useEffect } from "react";
import type { MutableRefObject } from "react";
import { getSvgPath } from "figma-squircle";

export function useCardSmoothCorners(cardRef: MutableRefObject<HTMLAnchorElement>) {
    useEffect(() => {
        const setCorners = (entry: ResizeObserverEntry) => {
            const { width, height } = entry.contentRect;
            const cornerRadius = parseInt(window.getComputedStyle(entry.target).borderRadius, 10);
            const clipPath = getSvgPath({ width, height, cornerRadius, cornerSmoothing: 0.8 });
            cardRef.current.style.clipPath = `path('${clipPath}')`;
        }

        const resizeObserver = new ResizeObserver(([entry]) => {
            setCorners(entry);
        });

        resizeObserver.observe(cardRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);
};
