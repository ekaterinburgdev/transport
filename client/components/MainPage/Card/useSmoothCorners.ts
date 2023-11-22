import type { MutableRefObject } from "react";
import { useEffect } from "react";
import { getSvgPath } from "figma-squircle";

function setCorners(entry: ResizeObserverEntry) {
    const element = entry.target as HTMLElement;
    const styles = window.getComputedStyle(element);
    const { width, height, top, right, bottom, left } = entry.contentRect;
    
    const clipPath = getSvgPath({
        width: left + width + right,
        height: top + height + bottom,
        cornerRadius: parseInt(styles.borderRadius, 10),
        cornerSmoothing: Number(styles.getPropertyValue('--smooth-corners')),
        preserveSmoothing: true
    });

    element.style.clipPath = `path('${clipPath}')`;
}

let smoothCornersObserver = null;

if ('ResizeObserver' in globalThis) {
    smoothCornersObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            setCorners(entry);
        }
    });
}

export function useSmoothCorners(cardRef: MutableRefObject<HTMLElement>) {
    useEffect(() => {
        smoothCornersObserver.observe(cardRef.current);

        return () => {
            smoothCornersObserver.unobserve(cardRef.current);
        };
    }, []);
}
