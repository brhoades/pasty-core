import Paste from '../pastes/paste';
import { PasteShape } from '../pastes/shapes';


interface PasteParserI {
  parse(name: string, key: string, paste: PasteShape): Paste;
};

export default PasteParserI;
