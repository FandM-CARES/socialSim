import React from 'react';
import './Prompts.css';

function Prompts({ promptLabel }) {

    const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus, mi mattis tempor pretium, leo metus laoreet risus, quis molestie arcu massa nec orci. Vivamus tincidunt purus sit amet dolor ullamcorper molestie. Phasellus felis ex, bibendum non consequat in, convallis ut lacus. Ut congue, mauris at bibendum imperdiet, odio odio volutpat lacus, aliquet laoreet elit mauris vel arcu. Ut egestas neque et feugiat ornare. Sed eu magna ut dolor aliquam consequat. Vestibulum pulvinar non nunc in fringilla. Morbi et dictum ligula.\n Ut gravida consequat risus id eleifend. Etiam ullamcorper turpis ac vestibulum congue. Fusce dignissim consectetur volutpat. Sed mattis sem nec velit dignissim mollis. Donec a mauris mi. Phasellus et orci ultricies, porttitor lectus quis, faucibus massa. Maecenas diam nibh, hendrerit at magna quis, consequat egestas turpis. Ut tempus bibendum accumsan. Duis nec posuere sapien, ac pharetra magna. Morbi congue, metus sit amet euismod malesuada, erat odio consequat turpis, at porttitor nisi orci pretium ipsum. Nulla facilisi. Sed vehicula enim sed volutpat malesuada. Maecenas vel nulla commodo, scelerisque nulla eget, fringilla nisl. Quisque malesuada augue ac congue laoreet.\n";

    const informationHeader = <h2 className="informationHeader">Our Study</h2>;
    const studyInfoPrompt = <div className="studyInfoPrompt">{informationHeader}{loremText}</div>;

    // Prompt for when participants need to start a new game for the first time
    const loremText2 = "Sed nec iaculis libero, eget ornare dolor. Phasellus vitae rutrum felis. Curabitur sed purus enim. In sit amet convallis orci. Mauris mauris lectus, ullamcorper eu lectus nec, tincidunt vehicula ante. Proin sapien diam, ornare sit amet egestas et, cursus in massa. Donec eu posuere augue. Maecenas sed lobortis nunc. Integer a nulla fermentum, aliquam augue vel, venenatis ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vehicula nibh libero, sed sagittis erat molestie in. Vestibulum id tellus eu neque euismod ornare eu ac ipsum.\n";

    const gamePrompt = <div className="gamePrompt">{loremText2}</div>;

    // Prompt for when participants finish the game
    const loremText3 = "Sed tempus lacus sem, non dapibus velit aliquam eu. Curabitur id ultricies risus, non elementum magna. Nunc tincidunt leo eget est pretium aliquam. Vestibulum sed suscipit nibh, quis scelerisque ipsum. Nullam venenatis nibh vitae scelerisque aliquam. Nulla in arcu tempus, finibus metus at, lobortis mauris. Quisque blandit nec lorem eu blandit. Nam ut turpis in mi finibus varius.\n";

    const finishedPrompt = <div className="finishedPrompt">{loremText3}</div>;

    let displayPrompt = <div/>;

    switch(promptLabel){
        case "gamePrompt":
            displayPrompt = gamePrompt;
            break;
        case "studyInfoPrompt":
            displayPrompt = studyInfoPrompt;
            break;
        case "finishedPrompt":
            displayPrompt = finishedPrompt;
            break;
        default:
            displayPrompt = <div/>;
    }

    return (
        <div className="prompt">
            {displayPrompt}
        </div>
    );
}

export default Prompts
