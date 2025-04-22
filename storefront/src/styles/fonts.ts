import localFont from 'next/font/local'

// Define Guakala font
export const guakala = localFont({
    src: [
        {
            path: '../../public/fonts/Guakala.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Guakala.woff',
            weight: '400',
            style: 'normal',
        },
    ],
    display: 'swap',
    preload: true,
    variable: '--font-guakala',
    adjustFontFallback: false,
})

// Define Scratchy Lemon font
export const scratchyLemon = localFont({
    src: [
        {
            path: '../../public/fonts/ScratchyLemon.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/ScratchyLemon.woff',
            weight: '400',
            style: 'normal',
        },
    ],
    display: 'swap',
    preload: true,
    variable: '--font-scratchy-lemon',
    adjustFontFallback: false,
})

// Define Good Brush font
export const goodBrush = localFont({
    src: [
        {
            path: '../../public/fonts/GOODBRUSH.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/GOODBRUSH.woff',
            weight: '400',
            style: 'normal',
        },
    ],
    display: 'swap',
    preload: true,
    variable: '--font-good-brush',
    adjustFontFallback: false,
})

// Define Archistico font
export const archistico = localFont({
    src: [
        {
            path: '../../public/fonts/Archistico_Simple-webfont.woff',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Archistico_Bold-webfont.woff',
            weight: '700',
            style: 'normal',
        },
    ],
    display: 'swap',
    preload: true,
    variable: '--font-archistico',
    adjustFontFallback: false,
}) 
