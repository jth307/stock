import React from 'react';
import phone from '../../../dist/images/splashphone.png';
import Nav from './Nav';


class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
            <div>
                <Nav/>
            </div>
            <div className='splash-div'>
                <div className='splash-section-1 inverted'>
                    <div className='splash-body-1'>
                        <h1 className='splash-h1-1'>It's Time to Do Money</h1>
                        <p className='splash-description-1'>Robinwood, a pioneer of commission-free investing, gives you access to investing and more ways to make your money work harder.</p>
                    </div>
                    <div>
                        <img  width='400' height='300' className='splash-image-1' src={phone}/>
                    </div>
                </div>
                <div className='splash-section-2'>
                    <h1 className='splash-h1-2'>Break Free from Commission Fees</h1>
                    <p className='splash-description-2'>Make unlimited commission-free trades in stocks, funds, and options with The Benevolent Financial. The same goes for buying and selling cryptocurrencies with The Benevolent Crypto. Zero commission fees.</p>
                </div>
                <div className='splash-section-3'>
                    <div className='splash-body-3'>
                        <h1 className='splash-h1-3'>Introducing Cash Management</h1>
                        <p className='splash-description-3'>Invest, spend, and earn 1.80% APY*—all through your brokerage account.</p>
                    </div>
                    <video width='400' height='300' autoPlay muted  loop>
                        <source src={'https://the-benevolent.herokuapp.com/credit-card-video.mp4'} type="video/mp4" />
                    </video>
                </div>
            </div>
            </>
        )
    }
}

export default About;