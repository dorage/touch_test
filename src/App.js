import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: none;
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    touch-action: none;
`;
const Block = styled.div`
    margin-bottom: 2rem;
`;
const Head = styled.h1`
    font-size: 1.2rem;
    font-weight: 700;
`;
const Text = styled.div`
    font-size: 1rem;
`;

/*

clientX
clientY
force
identifier
pageX
pageY
radiusX
radiusY
rotationAngle
screenX
screenY


*/

const extractData = (touches) =>
    touches.map(
        (
            {
                clientX,
                clientY,
                force,
                identifier,
                pageX,
                pageY,
                radiusX,
                radiusY,
                rotationAngle,
                screenX,
                screenY,
            },
            idx
        ) =>
            `[${idx}] : ${identifier} | ${clientX} ${clientY} | ${screenX} ${screenY} | ${pageX} ${pageY} | ${radiusX} ${radiusY} | ${force} | ${rotationAngle}`
    );

const GESTURE = {
    IDLE: 'Idle',
    TAP: 'Tap',
    SWIPE: 'Swipe',
    DOUBLE_TAP: 'DoubleTap',
    MOVE: 'Move',
    PINCH: 'Pinch',
    ZOOM: 'Zoom',
    ROTATE: 'Rotate',
};

const getDistance = (x1, y1, x2, y2) =>
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

/**
 * 두 좌표 중간을 pivot으로 잡고 각도를 구한다.
 * @param {*} x1
 * @param {*} y1
 * @param {*} x2
 * @param {*} y2
 * @returns
 */
const getRotations = (x1, y1, x2, y2) => {
    const [px, py] = [(x2 + x1) / 2, (y2 + y1) / 2];

    const radians1 = Math.atan2(y1 - py, x1 - px);
    const degree1 = radians1 * (180 / Math.PI) + 180;
    const radians2 = Math.atan2(y2 - py, x2 - px);
    const degree2 = radians2 * (180 / Math.PI) + 180;

    return [degree1 / 360, degree2 / 360];
};

function App() {
    const [touchesRecord, setTouchesRecord] = useState({
        start: [],
        move: [],
        end: [],
        cancel: [],
    });

    // 한손으로 끌다가 다른 손가락이 올라와도 핀치, 줌, 로테이션 가능
    const [gesture, setGesture] = useState(GESTURE.IDLE);
    const [oldTouches, setOldTouches] = useState([]);
    const [touches, setTouches] = useState([]);

    const noTouch = () => {
        setGesture(GESTURE.IDLE);
    };
    const singleTouch = () => {
        if (!oldTouches.length) setGesture(GESTURE.TAP);
        else setGesture(GESTURE.SWIPE);
    };
    const doubleTouch = () => {
        if (oldTouches.length < 2) {
            setGesture(GESTURE.DOUBLE_TAP);
            return;
        }
        // distance (pinch, zoom)
        const oldDist = getDistance(oldTouches[0], oldTouches[1]);
        const currDist = getDistance(touches[0], touches[1]);

        if (oldDist > currDist) {
            setGesture(GESTURE.PINCH);
        } else if (oldDist < currDist) {
            setGesture(GESTURE.ZOOM);
        }
    };
    useEffect(() => {
        if (touches.length === 0) {
            noTouch();
        }
        if (touches.length === 1) {
            singleTouch();
        }
        if (touches.length >= 2) {
            doubleTouch();
        }
        setOldTouches(touches);
    }, [touches]);

    //#region event

    const touchstart = (e) => {
        console.log('touchstart', e);
        setTouchesRecord({
            ...touchesRecord,
            start: extractData([...e.touches]),
        });

        setOldTouches(touches);
        setTouches([...e.touches]);
    };
    const touchmove = (e) => {
        console.log('touchmove', e);
        setTouchesRecord({
            ...touchesRecord,
            move: extractData([...e.touches]),
        });

        setOldTouches(touches);
        setTouches([...e.touches]);
    };
    const touchend = (e) => {
        e.preventDefault();
        console.log('touchend', e);
        setTouchesRecord({
            ...touchesRecord,
            end: extractData([...e.touches]),
        });

        setOldTouches(touches);
        setTouches(
            touches.filter(({ identifier }) =>
                [...e.changedTouches].every((e) => e.identifier !== identifier)
            )
        );
    };
    const touchcancel = (e) => {
        e.preventDefault();
        console.log('touchcancel', e);
        setTouchesRecord({
            ...touchesRecord,
            cancel: extractData([...e.touches]),
        });

        setOldTouches(touches);
        setTouches(
            touches.filter(({ identifier }) =>
                [...e.changedTouches].every((e) => e.identifier !== identifier)
            )
        );
    };

    //#endregion

    return (
        <Container
            onTouchStart={touchstart}
            onTouchEnd={touchend}
            onTouchCancel={touchcancel}
            onTouchMove={touchmove}
        >
            <Block>
                <Head>Gesture: {gesture}</Head>
            </Block>
            <Text>
                {`identifier | clientX clientY | screenX screenY | pageX pageY | radiusX radiusY | force | rotationAngle`}
            </Text>
            <PrintBlock title='Touch Start' list={touchesRecord.start} />
            <PrintBlock title='Touch Move' list={touchesRecord.move} />
            <PrintBlock title='Touch End' list={touchesRecord.end} />
            <PrintBlock title='Touch Cancel' list={touchesRecord.cancel} />
        </Container>
    );
}

const PrintBlock = ({ title, list }) => (
    <Block>
        <Head>{title}</Head>
        {list.map((e) => (
            <Text key={e}>{e}</Text>
        ))}
    </Block>
);

export default App;
