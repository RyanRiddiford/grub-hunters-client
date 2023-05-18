/**
 * Mascot svg partial template. 
 * Used in header logo and for animation.
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import lit html
import {html } from 'lit-html';

/**
 * Mascot SVG HTML template
 */
const mascot = html`
    <svg class="mascot" width="150" height="80">
    <g class="body-part body-part-one" transform="translate(0 32)" fill="#fff" stroke="#6f7a82" stroke-width="2">
        <circle cx="15" cy="15" r="15" stroke="none"/>
        <circle cx="15" cy="15" r="14" fill="none"/>
    </g>
    <g class="body-part body-part-two" transform="translate(13 15)" fill="#fff" stroke="#6f7a82" stroke-width="2">
        <circle cx="17.5" cy="17.5" r="17.5" stroke="none"/>
        <circle cx="17.5" cy="17.5" r="16.5" fill="none"/>
    </g>
    <g class="body-part body-part-three" transform="translate(37 15)" fill="#fff" stroke="#6f7a82" stroke-width="2">
        <circle cx="20" cy="20" r="20" stroke="none"/>
        <circle cx="20" cy="20" r="19" fill="none"/>
    </g>
    <g class="body-part body-part-four" transform="translate(57 25)" fill="#fff" stroke="#6f7a82" stroke-width="2">
        <circle cx="22.5" cy="22.5" r="22.5" stroke="none"/>
        <circle cx="22.5" cy="22.5" r="21.5" fill="none"/>
    </g>
    <g class="body-part body-part-five" transform="translate(71)" fill="#fff" stroke="#6f7a82" stroke-width="2">
        <circle cx="25" cy="25" r="25" stroke="none"/>
        <circle cx="25" cy="25" r="24" fill="none"/>
    </g>
    <g class="eye left-eye" transform="translate(82 13)" fill="#6f7a82" stroke="#707070">
        <rect width="8" height="19" rx="2" stroke="none"/>
        <rect x=".5" y=".5" width="7" height="18" rx="1.5" fill="none"/>
    </g>
    <g class="eye right-eye" transform="translate(102 13)" fill="#6f7a82" stroke="#707070">
        <rect width="8" height="19" rx="2" stroke="none"/>
        <rect x=".5" y=".5" width="7" height="18" rx="1.5" fill="none"/>
    </g>
</svg>
`;

export default mascot;