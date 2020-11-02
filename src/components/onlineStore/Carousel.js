import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class Carousel extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            items: this.props.items,
            active: this.props.active,
            direction: ''
        }
        this.rightClick = this.moveRight.bind(this)
        this.leftClick = this.moveLeft.bind(this)
    }

    generateItems() {
        var items = []
        var level
        console.log(this.state.active)
        for (var i = this.state.active - 2; i < this.state.active + 3; i++) {
            var index = i
            if (i < 0) {
                index = this.state.items.length + i
            } else if (i >= this.state.items.length) {
                index = i % this.state.items.length
            }
            level = this.state.active - i
            items.push(<Item key={index} id={this.state.items[index]} level={level} />)
        }
        return items
    }
    
    moveLeft() {
        var newActive = this.state.active
        newActive--
        this.setState({
            active: newActive < 0 ? this.state.items.length - 1 : newActive,
            direction: 'left'
        })
    }
    
    moveRight() {
        var newActive = this.state.active
        this.setState({
            active: (newActive + 1) % this.state.items.length,
            direction: 'right'
        })
    }
    
    render() {
        return(
            <>
                <div id="carousel" className="noselect">
                    <div className="arrow arrow-left" onClick={this.leftClick}>&#10094;</div>
                    <ReactCSSTransitionGroup 
                        transitionName={this.state.direction}>
                        {this.generateItems()}
                    </ReactCSSTransitionGroup>
                    <div className="arrow arrow-right" onClick={this.rightClick}>&#10095;</div>
                    {/* <div className="arrow arrow-right" onClick={this.rightClick}><i className="fi-arrow-right"></i></div> */}
                </div>

                <style>{`
                

                
                #carousel {
                    height: 200px;
                    width: 810px;
                    margin: 70px auto;
                    display: flex;
                    justify-items: space-between;
                    position: relative;
                }

                #carousel span {
                    // display: flex;
                    // justify-items: space-between;
                    position: relative;
                }
                
                .arrow {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background-color: #f9bf1e;
                    text-align: center;
                    font-size: 25px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 20px;
                    color: #fffeee;
                    line-height: 30px;
                    margin-top: 85px;
                    z-index: 1000;
                }
                
                .arrow-right {
                    left: 780px;
                }
                
                .item {
                    text-align: center;
                    color: white;
                    font-size: 40px;
                    position: absolute;
                    transition: height 1s, width 1s, left 1s, margin-top 1s, line-height 1s, background-color 1s;
                    display: flex;
                    align-items: center;
                }
                
                .level-2 {
                    height: 150px;
                    width: 110px;
                    line-height: 150px;
                    background-color: #fff;
                    left: 650px;
                    margin-top: 25px;
                }

                .level-1 {
                    height: 180px;
                    width: 130px;
                    line-height: 180px;
                    background-color: #fff;
                    left: 500px;
                    margin-top: 10px;
                }

                .level0 {
                    height: 200px;
                    width: 150px;
                    line-height: 200px;
                    background-color: #fff;
                    left: 330px;
                }

                .level1 {
                    height: 180px;
                    width: 130px;
                    line-height: 180px;
                    background-color: #fff;
                    margin-top: 10px;
                    left: 180px;
                }

                .level2 {
                    height: 150px;
                    width: 110px;
                    line-height: 150px;
                    background-color: #fff;
                    margin-top: 25px;
                    left: 50px;
                }

                .left-enter {
                    opacity: 0;
                    left: 50px - 110px;
                    height: 150px - 30;
                    width: 110px - 20;
                    line-height: 150px - 30;
                    margin-top: 40px;
                }

                .left-enter.left-enter-active {
                    opacity: 1;
                    left: 50px;
                    height: 150px;
                    width: 110px;
                    line-height: 150px;
                    margin-top: 25px;
                    transition: left 1s, opacity 1s, height 1s, width 1s, margin-top 1s, line-height 1s;
                }

                .left-leave {
                    opacity: 1;
                    left: 650px;
                    height: 150px;
                    width: 110px;
                    line-height: 150px;
                    margin-top: 25px;
                }

                .left-leave.left-leave-active {
                    left: 650px + 110px + 20;
                    opacity: 0;
                    height: 150px - 30;
                    line-height: 120px;
                    margin-top: 40px;
                    width: 110px - 20;
                    transition: left 1s, opacity 1s, height 1s, width 1s, margin-top 1s, line-height 1s;
                }

                .right-enter {
                    opacity: 0;
                    left: 650px + 110px;
                    height: 150px - 30;
                    width: 110px - 20;
                    line-height: 150px - 30;
                    margin-top: 40px;
                }

                .right-enter.right-enter-active {
                    left: 650px;
                    opacity: 1;
                    height: 150px;
                    margin-top: 25px;
                    line-height: 150px;
                    width: 110px;
                    transition: left 1s, opacity 1s, height 1s, width 1s, margin-top 1s, line-height 1s;
                }

                .right-leave {
                    left: 50px;
                    height: 150px;
                    opacity: 1;
                    margin-top: 25px;
                    line-height: 150px;
                    width: 110px;
                }

                .right-leave.right-leave-active {
                    left: 50px - 110px;
                    opacity: 0;
                    height: 150px - 30;
                    width: 110px - 20;
                    line-height: 150px - 30;
                    margin-top: 40px;
                    transition: left 1s, opacity 1s, height 1s, width 1s, margin-top 1s, line-height 1s;
                }

                .noselect {
                    -webkit-user-select: none; 
                     -khtml-user-select: none; 
                       -moz-user-select: none; 
                        -ms-user-select: none;  
                            user-select: none;
                }
                `}
                </style>
            </>




        )
    }
}

class Item extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            level: this.props.level
        }
    }
    
    render() {
        const className = 'item level' + this.props.level
        return(
            <div className={className}>
                {this.props.id}
            </div>
        )
    }
}

var items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default Carousel;
// ReactDOM.render(<Carousel items={items} active={0}/>, document.getElementById('app'))