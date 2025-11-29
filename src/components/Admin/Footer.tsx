import React from 'react';

const FooterAdmin: React.FC = () => {
    const year = new Date().getFullYear()
    return (
        <footer className='p-5 flex flex-col gap-5 bg-white'>
            <div className="max-w-[1500px] mx-auto flex flex-col gap-4">
                <div className="mx-auto flex flex-col gap-4">
                <p className='text-center'>&copy; {year} Spree Commerce DEMO. All Rights Reserved. Provided by <a className='' href="https://spreecommerce.org/docs/api-reference"><strong>Spre Ecommerce</strong></a></p>
            </div>
            </div>
        </footer>
    )
}

export default FooterAdmin;