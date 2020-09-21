import { useContext } from 'react';

import { StatusContext } from '../../contexts/StatusContext';
import StatusIndicatorCss from '../../styles/onlineStore/StatusIndicator.css'

function StatusIndicator() {
    const { status } = useContext(StatusContext);
    return (
        <>
             <div class="statusIndicator">
                {/* <ol> */}
                    <div style={{flex: '1'}}>
                        <div className="statusItem">
                            <p style={status==='shipping'?{backgroundColor: '#333', color: '#fff'}:{backgroundColor: '#fff', color: '#333'}}>1</p>
                            <a>Shipping</a>
                        </div>
                    </div>
                    <div style={{flex: '2'}}>
                        <div className="statusLine">
                            
                        </div>
                    </div>
                    <div style={{flex: '1'}}>
                        <div className="statusItem">
                            <p style={status==='payment'?{backgroundColor: '#333', color: '#fff'}:{backgroundColor: '#fff', color: '#333'}}>2</p>
                            <a>Payment</a>
                        </div>
                    </div>
                    <div style={{flex: '2'}}>
                        <div className="statusLine">
                            
                        </div>
                    </div>
                    <div style={{flex: '1'}}>
                        <div className="statusItem">
                            <p style={status==='review'?{backgroundColor: '#333', color: '#fff'}:{backgroundColor: '#fff', color: '#333'}}>3</p>
                            <a>Review</a>
                        </div>
                    </div>
                {/* </ol> */}
            </div>
            <StatusIndicatorCss />
        </>
    )
}

export default StatusIndicator;
