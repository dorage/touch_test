import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
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

function App() {
    const startRef = useRef();
    const endRef = useRef();
    const cancelRef = useRef();
    const moveRef = useRef();

    useEffect(() => {}, []);

    const touchstart = (e) => {
        console.log('touchstart', e.touches);
        startRef.current.textContent = [...e.touches]
            .map(
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
                ) => {
                    return `[${idx}] : ${identifier} | ${clientX} ${clientY} | ${screenX} ${screenY} | ${pageX} ${pageY} | ${radiusX} ${radiusY} | ${force} | ${rotationAngle} | `;
                }
            )
            .join('\n');
    };
    const touchend = (e) => {
        console.log('touchend', e);
        endRef.current.textContent = [...e.changedTouches]
            .map(
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
                ) => {
                    return `[${idx}] : ${identifier} | ${clientX} ${clientY} | ${screenX} ${screenY} | ${pageX} ${pageY} | ${radiusX} ${radiusY} | ${force} | ${rotationAngle} | `;
                }
            )
            .join('\n');
    };
    const touchcancel = (e) => {
        console.log('touchcancel', e);
        cancelRef.current.textContent = [...e.touches]
            .map(
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
                ) => {
                    return `[${idx}] : ${identifier} | ${clientX} ${clientY} | ${screenX} ${screenY} | ${pageX} ${pageY} | ${radiusX} ${radiusY} | ${force} | ${rotationAngle} | `;
                }
            )
            .join('\n');
    };
    const touchmove = (e) => {
        console.log('touchmove', e);
        moveRef.current.textContent = [...e.touches]
            .map(
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
                ) => {
                    return `[${idx}] : ${identifier} | ${clientX} ${clientY} | ${screenX} ${screenY} | ${pageX} ${pageY} | ${radiusX} ${radiusY} | ${force} | ${rotationAngle} | `;
                }
            )
            .join('\n');
    };

    return (
        <Container
            onTouchStart={touchstart}
            onTouchEnd={touchend}
            onTouchCancel={touchcancel}
            onTouchMove={touchmove}
            className='App'
        >
            <Block>
                <Text ref={startRef}>
                    {
                        'idx | identifier | clientX | clientY | screenX | screenY | pageX | pageY | radiusX | radiusY | force | rotationAngle'
                    }
                </Text>
            </Block>
            <Block>
                <Head>Touch Start</Head>
                <Text ref={startRef}></Text>
            </Block>
            <Block>
                <Head>Touch Move</Head>
                <Text ref={moveRef}></Text>
            </Block>
            <Block>
                <Head>Touch End</Head>
                <Text ref={endRef}></Text>
            </Block>
            <Block>
                <Head>Touch Cancel</Head>
                <Text ref={cancelRef}></Text>
            </Block>
        </Container>
    );
}

export default App;
