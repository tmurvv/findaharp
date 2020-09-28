import uuid from 'react-uuid';

export const FINDAHARP_PRODUCTS = {   
    products_cds: [
        {
            id: uuid(),
            category: 'cd',
            title: "Live Test Item", 
            artist: "",
            price: '1.50',
            image: "../../../img/factoryFloor.jpg", 
            description: "This item is included for testing the strore functionality. Please choose credit card payment and use the following card: '4242 4242 4242 4242 exp. 04/24 CVC 242 zip 42424"
        },
        {
            id: uuid(),
            category: 'cd',
            title: "A Quiet Afternoon", 
            artist: "Tisha Murvihill",
            price: '15.00',
            image: "../../../img/store/findaharp/cds/QuietAfternoon.jpg", 
            description: "Winner, Instrumental Album of the Year, Gospel Music Association of Canada. Fourteen beautiful arrangements of some of our most beautiful worship melodies, including: I Exalt Thee; Oh, How He Loves You and Me; Fairest Lord Jesus; As the Deer; Jesus, Name Above All Names."
        },
        {
            id: uuid(),
            category: 'cd', 
            title: "If Brahms Wrote For Harp",
            artist: 'Tisha Murvihill', 
            price: 15.00, 
            image: "../../../img/store/findaharp/cds/IfBrahmsWrote.jpg", 
            description: "“Stunning Presentation of the music of Johannes Brahms” - The HarpColumn - Eleven Intermezzi and a Rhapsody Arranged and performed by Tisha Murvihill, Calgary Philharmonic Orchestra Principal Harp."
        },
        {
            id: uuid(),
            category: 'cd', 
            title: "Come Just As You Are", 
            artist: "Tisha Murvihill",
            price: 15.00, 
            image: "../../../img/store/findaharp/cds/ComeJustAs.webp", 
            description: "Come Just As You Are is a follow-up CD to Tisha’s award winning CD, A Quiet Afternoon. The CD features 14 inspirational praise and worship songs including Amazing Grace, Draw Me Close to You, Lord Be Glorified, and You Are My All in All."
        },
    ],  
    products_music: [
        {
            id: uuid(),
            category: 'music', 
            title: "Christmas Harpist", 
            artist: "Marylyn Marzuki",
            price: '5.00', 
            condition: '6',
            level: 'Beg-Int',
            harptype: 'pedal',
            newprice: '12.95',
            notes: 'Some markings. Some yellowing from age.',
            image: "../../../img/store/findaharp/sheetmusic/christmasharpist.jpg", 
            description: "Beautiful Christmas arrangements for pedal harp."
        },
        {
            id: uuid(),
            artist: 'Rossini',
            category: 'music',
            title: "Andante con Variationi for violin and harp", 
            price: 3.00, 
            condition: '7',
            level: 'Adv',
            harptype: 'Pedal',
            notes: 'Some yellowing around edges. No markings.',
            image: "../../../img/store/findaharp/sheetmusic/rossiniandante.jpg", 
            description: "edited by Amedeo Cerasa."
        },
        {
            id: uuid(),
            category: 'music', 
            title: "5 Popular Greek Melodies for voice and harp", 
            artist: "Ravel/Salzedo",
            price: '7.00', 
            condition: '9',
            level: 'Adv',
            harptype: 'pedal',
            newprice: '15.00',
            notes: 'Good shape. No markings. Small water mark in upper l.h. corner.',
            image: "../../../img/store/findaharp/sheetmusic/ravelgreek.jpg", 
            description: ""
        },
        {
            id: uuid(),
            category: 'music', 
            title: "Sonata No. III for flute (or violin) and harp", 
            artist: "Krumpholz/Avesian",
            price: '7.00', 
            condition: '10',
            level: 'Int-Adv',
            harptype: 'Pedal',
            newprice: '14.00',
            notes: 'Like brand new.',
            image: "../../../img/store/findaharp/sheetmusic/krumpholzsonata3.jpg", 
            description: "Great for setting a classical, sophisticated atmosphere."
        },
        {
            id: uuid(),
            category: 'music', 
            title: "Three Wedding Marches for woodwind quintet and harp.", 
            artist: "Wagner, Mozart, Mendelssohn",
            price: '10.00', 
            condition: '9',
            level: 'Int',
            harptype: 'lever',
            newprice: '25.00',
            notes: 'Like brand new inside. Slightly worn on cover (see photo).',
            image: "../../../img/store/findaharp/sheetmusic/weddingmarchesquintet.jpg", 
            description: 'Mozart, March from "Marriage of Figaro"; Wagner, Bridal Chorus from "Lohengrin" (Here Comes the Bride); Mendelssohn, Wedding March from "A Mid-Summer Nights Dream". Arranged by Ryohel Nakagawa.'
        },
        {
            id: uuid(),
            category: 'music', 
            title: "Garden of Adonis for flute and harp (or piano)", 
            artist: "Hovaness",
            price: '13.00', 
            condition: '7',
            level: 'Adv',
            harptype: 'Pedal',
            newprice: '25.00',
            notes: 'A few markings in harp part. Many markings in flute part. Otherwise excellent condition.',
            image: "../../../img/store/findaharp/sheetmusic/hovanessadonis.jpg", 
            description: 'Beautiful, sweeping, sophisticated recital piece for flute and harp.'
        },
        {
            id: uuid(),
            category: 'music', 
            title: "Canon in D for harp solo or duet", 
            artist: "Pachelbel/Woods",
            price: '5.00', 
            condition: '8',
            level: 'Int',
            harptype: 'lever',
            notes: 'Like new. No markings.',
            image: "../../../img/store/findaharp/sheetmusic/canonind.jpg", 
            description: "Versatile arrangement of a classic. Can be played as a solo or with a 2nd harp or with flute or violin."
        }
    ]   
}
