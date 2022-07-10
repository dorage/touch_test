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
            `[${idx}] : ${identifier} | ${clientX} ${clientY} | ${screenX} ${screenY} | ${pageX} ${pageY} | ${radiusX} ${radiusY} | ${force} | ${rotationAngle} | `
    );

const GESTURE = {
    IDLE: 'Idle',
    TAP: 'Tap',
    SWIPE: 'Swipe',
    PINCH: 'Pinch',
    ZOOM: 'Zoom',
    ROTATE: 'Rotate',
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

    useEffect(() => {
        if (!touches.length) {
            setGesture(GESTURE.IDLE);
            setOldTouches([]);
            return;
        }
        if (touches.length === 1) {
            if (!oldTouches.length) setGesture(GESTURE.TAP);
            else setGesture(GESTURE.SWIPE);
        }
        if (touches.length > 1) {
        }
    }, [touches]);

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
            end: extractData([...e.changedTouches]),
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
            cancel: extractData([...e.changedTouches]),
        });

        setOldTouches(touches);
        setTouches(
            touches.filter(({ identifier }) =>
                [...e.changedTouches].every((e) => e.identifier !== identifier)
            )
        );
    };

    return (
        <Container
            onTouchStart={touchstart}
            onTouchEnd={touchend}
            onTouchCancel={touchcancel}
            onTouchMove={touchmove}
        >
            <Block>
                <Head>Gesture: {gesture}</Head>
                <Text>
                    {
                        'idx | identifier | clientX | clientY | screenX | screenY | pageX | pageY | radiusX | radiusY | force | rotationAngle'
                    }
                </Text>
            </Block>
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
