export const TYPE_DELAY_MEAN = 120 // ms
export const TYPE_DELAY_STDDEV = 30 // ms

export const keyboardNeighbors = {
	'1': ['2', 'q', '!', '3'],
	'2': ['1', 'q', 'w', '!', '3'],
	'3': ['2', 'w', 'e', '@', '4'],
	'4': ['3', 'e', 'r', '#', '5'],
	'5': ['4', 'r', 't', '$', '6'],
	'6': ['5', 't', 'y', '%', '7'],
	'7': ['6', 'y', 'u', '^', '8'],
	'8': ['7', 'u', 'i', '&', '9'],
	'9': ['8', 'i', 'o', '*', '0'],
	'0': ['9', 'o', 'p', '(', ')'],
	'q': ['1', '2', 'w', 'a', 's', '!', '@'],
	'w': ['q', '3', 'e', 'a', 's', '@', '#'],
	'e': ['2', 'w', 'r', 'd', '$', '@'],
	'r': ['3', 'e', 't', 'f', '%', '#'],
	't': ['4', 'r', 'y', 'g', '$', '%'],
	'y': ['5', 't', 'u', 'h', '^', '&'],
	'u': ['6', 'y', 'i', 'j', '&', '^'],
	'i': ['7', 'u', 'o', 'k', '*', '&'],
	'o': ['8', 'i', 'p', 'l', '(', '*'],
	'p': ['9', 'o', '0', ';', ')', '('],
	'a': ['q', 'w', 's', 'z', '1', '2'],
	's': ['a', 'w', 'e', 'd', 'z', 'x'],
	'd': ['s', 'e', 'r', 'f', 'x', 'c'],
	'f': ['d', 'r', 't', 'g', 'c', 'v'],
	'g': ['f', 't', 'y', 'h', 'v', 'b'],
	'h': ['g', 'y', 'u', 'j', 'b', 'n'],
	'j': ['h', 'u', 'i', 'k', 'n', 'm'],
	'k': ['j', 'i', 'o', 'l', 'm'],
	'l': ['k', 'o', 'p', ';', 'm'],
	';': ['l', 'p', '0', '9'],
	'z': ['a', 's', 'x', '1'],
	'x': ['z', 's', 'd', 'c', '2'],
	'c': ['x', 'd', 'f', 'v', '3'],
	'v': ['c', 'f', 'g', 'b', '4'],
	'b': ['v', 'g', 'h', 'n', '5'],
	'n': ['b', 'h', 'j', 'm', '6'],
	'm': ['n', 'j', 'k', ',', '7'],
	',': ['m', 'k', 'l', '.', '8'],
	'.': [',', 'l', ';', '/', '9'],
	'/': ['.', ';', '0'],
	' ': ['q', 'w', 'e', 'r', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'b', 'v']
};

export type KeyboardNeighbors = typeof keyboardNeighbors

export const shiftChars = {
	'~': '`',  // Backtick -> Tilde
	'!': '1',  // 1 -> Exclamation mark
	'@': '2',  // 2 -> At symbol
	'#': '3',  // 3 -> Hash symbol
	'$': '4',  // 4 -> Dollar symbol
	'%': '5',  // 5 -> Percent symbol
	'^': '6',  // 6 -> Caret symbol
	'&': '7',  // 7 -> Ampersand
	'*': '8',  // 8 -> Asterisk
	'(': '9',  // 9 -> Left parenthesis
	')': '0',  // 0 -> Right parenthesis
	'_': '-',  // Hyphen -> Underscore
	'+': '=',  // Equal sign -> Plus
	'{': '[',  // Left square bracket -> Left curly brace
	'}': ']',  // Right square bracket -> Right curly brace
	'|': '\\', // Backslash -> Pipe
	':': ';',  // Semicolon -> Colon
	'\'': '"',  // Apostrophe -> Quotation mark
	'<': ',',  // Comma -> Less than
	'>': '.',  // Period -> Greater than
	'?': '/',  // Slash -> Question mark
};

export type ShiftChars = typeof shiftChars
