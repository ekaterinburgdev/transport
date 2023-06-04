import React, { useState } from 'react';

export enum ModalPosition {
    FullOpen = 'fullOpen',
    HalfOpen = 'halfOpen',
    Hidden = 'hidden',
}

export const MODAL_POSITIONS = [
    ModalPosition.FullOpen,
    ModalPosition.HalfOpen,
    ModalPosition.Hidden,
];
export const CHANGE_POSITION_DELTA = 60;

export function useModalSheet(
    startPosition = ModalPosition.FullOpen,
): [ModalPosition, React.TouchEventHandler, React.TouchEventHandler] {
    const [currentPositionIndex, setCurrentPositionIndex] = useState(
        MODAL_POSITIONS.findIndex((pos) => pos === startPosition),
    );
    const [currentPosition, setCurrentPosition] = useState(startPosition);
    let dragStartPosition: null | number = null;
    let isDragFinished = false;

    function nextPosition(scrollElement?: HTMLElement) {
        const newPositionIndex = Math.min(currentPositionIndex + 1, MODAL_POSITIONS.length - 1);
        setCurrentPositionIndex(newPositionIndex);
        setCurrentPosition(MODAL_POSITIONS[newPositionIndex]);

        if (scrollElement && newPositionIndex === MODAL_POSITIONS.length - 1) {
            scrollElement.scrollTo({
                top: 0,
            });
        }
    }

    function prevPosition() {
        const newPositionIndex = Math.max(currentPositionIndex - 1, 0);
        setCurrentPositionIndex(newPositionIndex);
        setCurrentPosition(MODAL_POSITIONS[newPositionIndex]);
    }

    function onDragEnd(event: React.TouchEvent) {
        event.preventDefault();
        event.stopPropagation();

        isDragFinished = false;
        dragStartPosition = null;
    }

    function onDrag(event: React.TouchEvent) {
        event.preventDefault();

        if (isDragFinished) {
            return;
        }

        if (dragStartPosition === null) {
            dragStartPosition = event.touches.item(0).clientY;
        }

        const currentDragPosition = event.touches.item(0).clientY;

        if (currentDragPosition - dragStartPosition > CHANGE_POSITION_DELTA) {
            isDragFinished = true;

            const modalElement = (event.target as HTMLElement).parentElement;
            nextPosition(modalElement);
        }

        if (currentDragPosition - dragStartPosition < -CHANGE_POSITION_DELTA) {
            isDragFinished = true;
            prevPosition();
        }
    }

    return [currentPosition, onDragEnd, onDrag];
}