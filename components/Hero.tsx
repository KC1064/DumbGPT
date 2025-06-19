import React from 'react'

const Hero = () => {
    return (
        <div className='w-full flex items-center justify-center mt-8'>
            <div className='max-w-2xl'>
                <p className='font-bold text-7xl wrap-break text-balance text-center tracking-wide bg-gradient-to-br bg-clip-text text-transparent from-purple-400 via-red-300 to-pink-400'>Complex Stuff, Made Simple</p>
                <p className='text-white text-xl font-semibold mt-2 text-balance text-center tracking-tight'>DumbGPT explains anything in plain language, no jargons.
                    Like explaining to your grandma, Or a confused 5 years old.
                    <span className='text-emerald-300'> Thats You, right?</span></p>
            </div>
        </div>
    )
}

export default Hero