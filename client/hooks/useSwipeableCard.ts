import React, { useState } from 'react';

export enum CardPosition {
    FullOpen = 'fullOpen',
    HalfOpen = 'halfOpen',
    TinyOpen = 'tinyOpen',
    Hidden = 'hidden',
}

export const CARD_POSITIONS = [
    CardPosition.FullOpen,
    CardPosition.HalfOpen,
    CardPosition.TinyOpen,
    CardPosition.Hidden,
];
export const CHANGE_POSITION_DELTA = 60;

export function useSwipeableCard(
    startPosition = CardPosition.FullOpen,
): [CardPosition, React.TouchEventHandler, React.TouchEventHandler] {
    const [currentPositionIndex, setCurrentPositionIndex] = useState(
        CARD_POSITIONS.findIndex((pos) => pos === startPosition),
    );
    const [currentPosition, setCurrentPosition] = useState(startPosition);
    let dragStartPosition: null | number = null;
    let isDragFinished = false;

    function nextPosition(scrollElement?: HTMLElement) {
        const newPositionIndex = Math.min(currentPositionIndex + 1, CARD_POSITIONS.length - 1);
        setCurrentPositionIndex(newPositionIndex);
        setCurrentPosition(CARD_POSITIONS[newPositionIndex]);

        if (scrollElement && newPositionIndex === CARD_POSITIONS.length - 1) {
            scrollElement.scrollTo({
                top: 0,
            });
        }
    }

    function prevPosition() {
        const newPositionIndex = Math.max(currentPositionIndex - 1, 0);
        setCurrentPositionIndex(newPositionIndex);
        setCurrentPosition(CARD_POSITIONS[newPositionIndex]);
    }

    function onDragEnd(event: React.TouchEvent) {
        event.stopPropagation();

        isDragFinished = false;
        dragStartPosition = null;
    }

    function onDrag(event: React.TouchEvent) {
        if (isDragFinished) {
            return;
        }

        if (dragStartPosition === null) {
            dragStartPosition = event.touches.item(0).clientY;
        }

        const currentDragPosition = event.touches.item(0).clientY;

        if (currentDragPosition - dragStartPosition > CHANGE_POSITION_DELTA) {
            isDragFinished = true;

            const cardElement = (event.target as HTMLElement).parentElement;
            nextPosition(cardElement);
        }

        if (currentDragPosition - dragStartPosition < -CHANGE_POSITION_DELTA) {
            isDragFinished = true;
            prevPosition();
        }
    }

    return [currentPosition, onDragEnd, onDrag];
}
