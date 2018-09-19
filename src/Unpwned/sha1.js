async function sha1(message) {
    const crypto = window.crypto || window.msCrypto; // for IE 11
    if (crypto && crypto.subtle) {
        // from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
        // encode as UTF-8
        const msgBuffer = new TextEncoder('utf-8').encode(message);
        // hash the message
        const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        // convert bytes to hex string
        const hashHex = hashArray
            .map((b) => ('00' + b.toString(16)).slice(-2))
            .join('');
        return hashHex.toUpperCase();
    }
    // if no  window.crypto, polyfill using jshashes
    const Hashes = await import('jshashes');
    const SHA1 = new Hashes.SHA1();
    return SHA1.hex(message).toUpperCase();
}

export { sha1 };