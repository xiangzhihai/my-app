import Square from './square'
export default function Board(props) {
    const renderRow = (i) => {
        return (
            <div key={i} className="board-row">
                {[...new Array(15).keys()].map(num =>
                    <Square key={num + i}
                        value={props.squares[num + i]}
                        onClick={() => props.onClick(num + i)} />)}
            </div>
        );
    };

    return (
        <div>
            {[...new Array(15).keys()].map(num => renderRow(num * 15))}
        </div>
    );
}
