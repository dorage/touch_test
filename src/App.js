import { useEffect, useRef, useState } from 'react';
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

function App() {
    const [start, setStart] = useState([]);
    const [end, setEnd] = useState([]);
    const [cancel, setCancel] = useState([]);
    const [move, setMove] = useState([]);

    const touchstart = (e) => {
        console.log('touchstart', e);
        setStart(extractData([...e.touches]));
    };
    const touchend = (e) => {
        console.log('touchend', e);
        setEnd(extractData([...e.changedTouches]));
    };
    const touchcancel = (e) => {
        console.log('touchcancel', e);
        setCancel(extractData([...e.touches]));
    };
    const touchmove = (e) => {
        console.log('touchmove', e);
        setMove(extractData([...e.touches]));
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
                <Text>
                    {
                        'idx | identifier | clientX | clientY | screenX | screenY | pageX | pageY | radiusX | radiusY | force | rotationAngle'
                    }
                </Text>
            </Block>
            <PrintBlock title='Touch Start' list={start} />
            <PrintBlock title='Touch Move' list={move} />
            <PrintBlock title='Touch End' list={end} />
            <PrintBlock title='Touch Cancel' list={cancel} />
        </Container>
    );
}

const PrintBlock = ({ title, list }) => (
    <Block>
        <Head>{title}</Head>
        {list.map((e) => (
            <Text>{e}</Text>
        ))}
    </Block>
);

export default App;
