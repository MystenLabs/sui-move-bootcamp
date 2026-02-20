import $3Sr93$chalk from "chalk";
import {Command as $3Sr93$Command, InvalidArgumentError as $3Sr93$InvalidArgumentError} from "commander";



var $a2eff9e01820a9b9$exports = {};
$a2eff9e01820a9b9$exports = JSON.parse("{\"name\":\"@wallet-standard/errors\",\"version\":\"0.1.1\",\"author\":\"Solana Maintainers <maintainers@solana.foundation>\",\"repository\":\"https://github.com/wallet-standard/wallet-standard\",\"license\":\"Apache-2.0\",\"publishConfig\":{\"access\":\"public\"},\"files\":[\"bin\",\"lib\",\"src\",\"LICENSE\"],\"engines\":{\"node\":\">=16\"},\"type\":\"module\",\"sideEffects\":false,\"bin\":\"./bin/cli.mjs\",\"main\":\"./lib/cjs/index.js\",\"module\":\"./lib/esm/index.js\",\"types\":\"./lib/types/index.d.ts\",\"exports\":{\"require\":\"./lib/cjs/index.js\",\"import\":\"./lib/esm/index.js\",\"types\":\"./lib/types/index.d.ts\"},\"targets\":{\"bin\":{\"context\":\"node\",\"distDir\":\"lib/\",\"isLibrary\":true,\"optimize\":false,\"sourceMap\":false}},\"scripts\":{\"clean\":\"shx mkdir -p lib && shx rm -rf lib\",\"build\":\"parcel build --target bin src/cli.ts\",\"package\":\"shx mkdir -p lib/cjs && shx echo '{ \\\"type\\\": \\\"commonjs\\\" }' > lib/cjs/package.json\",\"test\":\"jest -c ../../../node_modules/@wallet-standard/test-config/jest.config.ts --rootDir .\"},\"dependencies\":{\"chalk\":\"^5.4.1\",\"commander\":\"^13.1.0\"},\"devDependencies\":{\"parcel\":\"^2.14.4\",\"shx\":\"^0.4.0\"}}");


function $a9fe8b2a0a510d92$export$5cdc53290040c8ea(encodedContext) {
    const decodedUrlString = atob(encodedContext);
    return Object.fromEntries(new URLSearchParams(decodedUrlString).entries());
}
function $a9fe8b2a0a510d92$var$encodeValue(value) {
    if (Array.isArray(value)) {
        const commaSeparatedValues = value.map($a9fe8b2a0a510d92$var$encodeValue).join('%2C%20' /* ", " */ );
        return '%5B' /* "[" */  + commaSeparatedValues + /* "]" */ '%5D';
    } else if (typeof value === 'bigint') return `${value}n`;
    else return encodeURIComponent(String(value != null && Object.getPrototypeOf(value) === null ? // Convert them before stringifying them.
    {
        ...value
    } : value));
}
function $a9fe8b2a0a510d92$var$encodeObjectContextEntry([key, value]) {
    return `${key}=${$a9fe8b2a0a510d92$var$encodeValue(value)}`;
}
function $a9fe8b2a0a510d92$export$718674e070bbe277(context) {
    const searchParamsString = Object.entries(context).map($a9fe8b2a0a510d92$var$encodeObjectContextEntry).join('&');
    return btoa(searchParamsString);
}



/**
 * To add a new error, follow the instructions at
 * https://github.com/wallet-standard/wallet-standard/tree/master/packages/core/errors/#adding-a-new-error
 *
 * WARNING:
 *   - Don't remove error codes
 *   - Don't change or reorder error codes.
 *
 * Good naming conventions:
 *   - Prefixing common errors — e.g. under the same package — can be a good way to namespace them. E.g. All codec-related errors start with `WALLET_STANDARD_ERROR__ACCOUNT__`.
 *   - Use consistent names — e.g. choose `PDA` or `PROGRAM_DERIVED_ADDRESS` and stick with it. Ensure your names are consistent with existing error codes. The decision might have been made for you.
 *   - Recommended prefixes and suffixes:
 *     - `MALFORMED_`: Some input was not constructed properly. E.g. `MALFORMED_BASE58_ENCODED_ADDRESS`.
 *     - `INVALID_`: Some input is invalid (other than because it was MALFORMED). E.g. `INVALID_NUMBER_OF_BYTES`.
 *     - `EXPECTED_`: Some input was different than expected, no need to specify the "GOT" part unless necessary. E.g. `EXPECTED_DECODED_ACCOUNT`.
 *     - `_CANNOT_`: Some operation cannot be performed or some input cannot be used due to some condition. E.g. `CANNOT_DECODE_EMPTY_BYTE_ARRAY` or `PDA_CANNOT_END_WITH_PDA_MARKER`.
 *     - `_MUST_BE_`: Some condition must be true. E.g. `NONCE_TRANSACTION_FIRST_INSTRUCTION_MUST_BE_ADVANCE_NONCE`.
 *     - `_FAILED_TO_`: Tried to perform some operation and failed. E.g. `FAILED_TO_DECODE_ACCOUNT`.
 *     - `_NOT_FOUND`: Some operation lead to not finding something. E.g. `ACCOUNT_NOT_FOUND`.
 *     - `_OUT_OF_RANGE`: Some value is out of range. E.g. `ENUM_DISCRIMINATOR_OUT_OF_RANGE`.
 *     - `_EXCEEDED`: Some limit was exceeded. E.g. `PDA_MAX_SEED_LENGTH_EXCEEDED`.
 *     - `_MISMATCH`: Some elements do not match. E.g. `ENCODER_DECODER_FIXED_SIZE_MISMATCH`.
 *     - `_MISSING`: Some required input is missing. E.g. `TRANSACTION_FEE_PAYER_MISSING`.
 *     - `_UNIMPLEMENTED`: Some required component is not available in the environment. E.g. `SUBTLE_CRYPTO_VERIFY_FUNCTION_UNIMPLEMENTED`.
 */ // Registry-related errors.
// Reserve error codes in the range [3834000-3834999].
const $530d27d1911236a2$export$52bc1fe1597469c4 = 3834000;
const $530d27d1911236a2$export$2d71e59415bfcd93 = 3834001;
const $530d27d1911236a2$export$6aef8b8f5962a16 = 4001000;
const $530d27d1911236a2$export$4a71b6cd17f698 = 6160000;
const $530d27d1911236a2$export$37ca37218d933bd9 = 6160001;
const $530d27d1911236a2$export$82cec0501ccee60d = 6160002;


const $07e15bc1b3e9ee4c$export$7349a4bcf219522a = {
    [(0, $530d27d1911236a2$export$4a71b6cd17f698)]: 'The wallet account $address does not support the chain `$chain`',
    [(0, $530d27d1911236a2$export$37ca37218d933bd9)]: 'The wallet account $address does not support the `$featureName` feature',
    [(0, $530d27d1911236a2$export$82cec0501ccee60d)]: "The wallet '$walletName' does not support the `$featureName` feature",
    [(0, $530d27d1911236a2$export$2d71e59415bfcd93)]: "No account with address $address could be found in the '$walletName' wallet",
    [(0, $530d27d1911236a2$export$52bc1fe1597469c4)]: "No underlying Wallet Standard wallet could be found for this handle. This can happen if the wallet associated with the handle has been unregistered.",
    [(0, $530d27d1911236a2$export$6aef8b8f5962a16)]: 'The user rejected the request'
};


const $d3e987deabbb48c3$var$START_INDEX = 'i';
const $d3e987deabbb48c3$var$TYPE = 't';
function $d3e987deabbb48c3$export$19d2f6f104531a75(code, context = {}) {
    const messageFormatString = (0, $07e15bc1b3e9ee4c$export$7349a4bcf219522a)[code];
    if (messageFormatString.length === 0) return '';
    let state;
    function commitStateUpTo(endIndex) {
        if (state[$d3e987deabbb48c3$var$TYPE] === 2) {
            const variableName = messageFormatString.slice(state[$d3e987deabbb48c3$var$START_INDEX] + 1, endIndex);
            fragments.push(variableName in context ? `${context[variableName]}` : `$${variableName}`);
        } else if (state[$d3e987deabbb48c3$var$TYPE] === 1) fragments.push(messageFormatString.slice(state[$d3e987deabbb48c3$var$START_INDEX], endIndex));
    }
    const fragments = [];
    messageFormatString.split('').forEach((char, ii)=>{
        if (ii === 0) {
            state = {
                [$d3e987deabbb48c3$var$START_INDEX]: 0,
                [$d3e987deabbb48c3$var$TYPE]: messageFormatString[0] === '\\' ? 0 : messageFormatString[0] === '$' ? 2 : 1
            };
            return;
        }
        let nextState;
        switch(state[$d3e987deabbb48c3$var$TYPE]){
            case 0:
                nextState = {
                    [$d3e987deabbb48c3$var$START_INDEX]: ii,
                    [$d3e987deabbb48c3$var$TYPE]: 1
                };
                break;
            case 1:
                if (char === '\\') nextState = {
                    [$d3e987deabbb48c3$var$START_INDEX]: ii,
                    [$d3e987deabbb48c3$var$TYPE]: 0
                };
                else if (char === '$') nextState = {
                    [$d3e987deabbb48c3$var$START_INDEX]: ii,
                    [$d3e987deabbb48c3$var$TYPE]: 2
                };
                break;
            case 2:
                if (char === '\\') nextState = {
                    [$d3e987deabbb48c3$var$START_INDEX]: ii,
                    [$d3e987deabbb48c3$var$TYPE]: 0
                };
                else if (char === '$') nextState = {
                    [$d3e987deabbb48c3$var$START_INDEX]: ii,
                    [$d3e987deabbb48c3$var$TYPE]: 2
                };
                else if (!char.match(/\w/)) nextState = {
                    [$d3e987deabbb48c3$var$START_INDEX]: ii,
                    [$d3e987deabbb48c3$var$TYPE]: 1
                };
                break;
        }
        if (nextState) {
            if (state !== nextState) commitStateUpTo(ii);
            state = nextState;
        }
    });
    commitStateUpTo();
    return fragments.join('');
}
function $d3e987deabbb48c3$export$82f46aa4e6535a45(code, context = {}) {
    if (process.env.NODE_ENV !== 'production') return $d3e987deabbb48c3$export$19d2f6f104531a75(code, context);
    else {
        let decodingAdviceMessage = `Wallet Standard error #${code}; Decode this error by running \`npx @wallet-standard/errors decode -- ${code}`;
        if (Object.keys(context).length) /**
             * DANGER: Be sure that the shell command is escaped in such a way that makes it
             *         impossible for someone to craft malicious context values that would result in
             *         an exploit against anyone who bindly copy/pastes it into their terminal.
             */ decodingAdviceMessage += ` '${(0, $a9fe8b2a0a510d92$export$718674e070bbe277)(context)}'`;
        return `${decodingAdviceMessage}\``;
    }
}



const $a177a3a21b521781$var$program = new (0, $3Sr93$Command)();
$a177a3a21b521781$var$program.name('@wallet-standard/errors').description('Decode Wallet Standard JavaScript errors thrown in production').version((0, $a2eff9e01820a9b9$exports.version));
$a177a3a21b521781$var$program.command('decode').description('Decode a `WalletStandardErrorCode` to a human-readable message').argument('<code>', 'numeric error code to decode', (rawCode)=>{
    const code = parseInt(rawCode, 10);
    if (isNaN(code) || `${code}` !== rawCode) throw new (0, $3Sr93$InvalidArgumentError)('It must be an integer');
    if (!(code in (0, $07e15bc1b3e9ee4c$export$7349a4bcf219522a))) throw new (0, $3Sr93$InvalidArgumentError)('There exists no error with that code');
    return code;
}).argument('[encodedContext]', 'encoded context to interpolate into the error message', (encodedContext)=>{
    try {
        return (0, $a9fe8b2a0a510d92$export$5cdc53290040c8ea)(encodedContext);
    } catch (e) {
        throw new (0, $3Sr93$InvalidArgumentError)('Encoded context malformed');
    }
}).action((code, context)=>{
    const message = (0, $d3e987deabbb48c3$export$19d2f6f104531a75)(code, context);
    console.log(`
${(0, $3Sr93$chalk).bold((0, $3Sr93$chalk).rgb(154, 71, 255)('[') + (0, $3Sr93$chalk).rgb(144, 108, 244)('D') + (0, $3Sr93$chalk).rgb(134, 135, 233)('e') + (0, $3Sr93$chalk).rgb(122, 158, 221)('c') + (0, $3Sr93$chalk).rgb(110, 178, 209)('o') + (0, $3Sr93$chalk).rgb(95, 195, 196)('d') + (0, $3Sr93$chalk).rgb(79, 212, 181)('e') + (0, $3Sr93$chalk).rgb(57, 227, 166)('d') + (0, $3Sr93$chalk).rgb(19, 241, 149)(']')) + (0, $3Sr93$chalk).rgb(19, 241, 149)(' Wallet Standard error code #' + code)}
    - ${message}`);
    if (context) console.log(`
${(0, $3Sr93$chalk).yellowBright((0, $3Sr93$chalk).bold('[Context]'))}
    ${JSON.stringify(context, null, 4).split('\n').join('\n    ')}`);
});
function $a177a3a21b521781$export$889ea624f2cb2c57(argv) {
    $a177a3a21b521781$var$program.parse(argv);
}


export {$a177a3a21b521781$export$889ea624f2cb2c57 as run};
