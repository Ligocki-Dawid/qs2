import Feed from '@components/Feed';
import React from 'react';

const Home = () => {
    return (
        <section className='w-full flex-center flex-col'>
            <h1 className='head_text text-center'>TEST
                <br className='max-md:hidden' />
                <span className='orange_gradient text-center'>test2</span>
            </h1>
            <p className="desc text-center">
                Description
            </p>

            <Feed></Feed>
        </section>
    );
}
 
export default Home;