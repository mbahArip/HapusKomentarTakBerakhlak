// ==UserScript==
// @name            Delete doodstrm and other
// @namespace       https://github.com/mbaharip
// @version         1.0.0
// @author          mbaharip
// @description     Hapus komentar bokep dari akun klon
// @downloadURL     https://raw.githubusercontent.com/mbaharip/HapusKomentarTakBerakhlak/main/src/deleteComment.user.js
// @updateURL       https://raw.githubusercontent.com/mbahArip/HapusKomentarTakBerakhlak/main/src/deleteComment.meta.js
// @supportURL      https://github.com/mbahArip/HapusKomentarTakBerakhlak/issues
// @match           https://www.facebook.com/*
// @icon            https://icons.duckduckgo.com/ip2/facebook.com.ico
// @grant           none
// @run-at          document-start
// @license         GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0-standalone.html
// ==/UserScript==

const blockedDomain = ["doodstrm.com"]
var loadUrl = window.location.href;

setInterval( async () => {
        await main();
        loadUrl = window.location.href;
}, 5000 );

async function main(){
    let exists = false
    // Check if comments exists
    const commentHeader = document.querySelectorAll('h2');
    commentHeader.forEach(header => {
        if(header.innerText === "Comments") {
            exists = true;
            return
        }
    })

    if(!exists){
        return
    }

    // Get all comments with link;
    const comments = document.querySelectorAll('div[aria-label*="Comment by"]');
    comments.forEach(comment => {
        const linkElement = comment.querySelector('a[target="_blank"]');
        if(!linkElement) return;

        const link = linkElement.innerText;
        const isBlocked = blockedDomain.some(domain => link.contains(domain));
        if(isBlocked) {
            comment.parentElement.remove();
        }
    });
}

window.addEventListener('load', main, false)