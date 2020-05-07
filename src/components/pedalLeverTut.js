function PedalLeverTut() {
    return (
        <>
        <div className='pedalLeverTut'>
            <figure className='pedalLeverTutImg'>      
                <img src='./img/ReesAberdeen.jpg' alt='lever harp example'/>
                <figcaption>lever harp</figcaption>
            </figure>
            <div className='pedalLeverTutText'>
                <h3>Lever Harp vs. Pedal Harp</h3>
                <p>On a lever harp, the lever is found at the top of each string. Raising the lever changes the pitch of the string up the equivalent of one adjacent key on a piano (also called a ½ step).</p>
                <p>A pedal harp has pedals at the bottom of the instrument which can change a group of strings <span style={{fontWeight: '500'}}>up or down</span> a ½ step, enabling the harpist to play a wider variety of music. Pedal harps are also significantly larger than lever harps.</p> 
                <p>Bottom line: a pedal harp is the type of harp you would see in an orchestra. A lever harp is the type of harp you would see in the fields of Ireland.</p>
            </div>
            <figure className='pedalLeverTutImg'>
                <img src='./img/SwansonLaScuola.jpg' alt='pedal harp example'/>
                <figcaption>pedal harp</figcaption>
            </figure>
        </div>
        <div className='pedalLeverTutMobile'>
            <div className='flexSB'>
                <figure className='pedalLeverTutImg'>      
                    <img src='./img/ReesAberdeen.jpg' alt='lever harp example'/>
                    <figcaption>lever harp</figcaption>
                </figure>
                <figure className='pedalLeverTutImg'>
                    <img src='./img/SwansonLaScuola.jpg' alt='pedal harp example'/>
                    <figcaption>pedal harp</figcaption>
                </figure>
            </div>
            <div className='pedalLeverTutText'>
                <h3>Lever Harp vs. Pedal Harp</h3>
                <p>On a lever harp, the lever is found at the top of each string. Raising the lever changes the pitch of the string up the equivalent of one adjacent key on a piano (also called a ½ step).</p>
                <p>A pedal harp has pedals at the bottom of the instrument which can change a group of strings <span style={{fontWeight: '500'}}>up or down</span> a ½ step, enabling the harpist to play a wider variety of music. Pedal harps are also significantly larger than lever harps.</p> 
                <p>Bottom line: a pedal harp is the type of harp you would see in an orchestra. A lever harp is the type of harp you would see in the fields of Ireland.</p>
            </div>
        </div>
        </>
    )
}

export default PedalLeverTut;
