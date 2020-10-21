import { useContext } from 'react';

import { StatusContext } from '../../contexts/StatusContext';
import StatusIndicatorCss from '../../styles/onlinestore/StatusIndicator.css'

function StatusIndicator() {
    const { status } = useContext(StatusContext);
    return (
        <>
            <h1 style={{margin:'auto',textAlign:'center'}}>Checkout</h1>
            <div className="statusIndicator">
                <div style={{flex: '1'}}>
                    <div className="statusItem">
                        <p style={status==='shipping'?{backgroundColor: '#333', color: '#fff'}:{backgroundColor: '#fff', color: '#333'}}>1</p>
                        <a>Shipping</a>
                    </div>
                </div>
                <div style={{flex: '2'}}>
                    <div className="statusLine"></div>
                </div>
                <div style={{flex: '1'}}>
                    <div className="statusItem">
                        <p style={status==='payment'?{backgroundColor: '#333', color: '#fff'}:{backgroundColor: '#fff', color: '#333'}}>2</p>
                        <a>Payment</a>
                    </div>
                </div>
                <div style={{flex: '2'}}>
                    <div className="statusLine"></div>
                </div>
                <div style={{flex: '1'}}>
                    <div className="statusItem">
                        <p style={status==='completed'?{backgroundColor: '#333', color: '#fff'}:{backgroundColor: '#fff', color: '#333'}}>3</p>
                        <a>Completed</a>
                    </div>
                </div>
            </div>
            <StatusIndicatorCss />
        </>
    )
}

export default StatusIndicator;
