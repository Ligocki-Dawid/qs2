'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'



const Nav = () => {

    const isLogIn = false
    const {data : session} = useSession();
    const [providers, setProviders] = useState(null)
    const [ToggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }
        setUpProviders();
    }, [])
    
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
            <Image 
                src="/assets/images/logo.svg"
                alt="QS Logo"
                width={30}
                height={30}
                className='object-contain' 
            />
            <p className='logo_text'>QS Marketplace</p>
        </Link>

        {/* Desktop navigation */}
        <div className='sm:flex hidden'>
            {session?.user ? 
            (
                <div className='flex gap-3 md:gap-5'>
                    <Link href="/create-ad" className='black_btn'>Dodaj ogłoszenie</Link>
                    <button type='button' onClick={signOut} className='outline_btn'>Wyloguj się</button>

                    <Link href="/profile">
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                        />
                    </Link>
                </div>
            ) : (
                <>
                {providers && Object.values(providers).map((provider) => (
                    <button 
                        type="button"
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className='black_btn'
                    >
                        Zaloguj się
                    </button>
                ))}
                </>
            )}
        </div>
            
        {/* Mobile Navigation */}
        <div className='sm:hidden flex relative'>
            {session?.user ? (
                <div className="flex">
                    <Image
                        src={session?.user.image}
                        width={37}
                        height={37}
                        className='rounded-full'
                        alt='profile'
                        onClick={() => setToggleDropdown((prev) => !prev)}
                    />

                    {ToggleDropdown && (
                        <div className="dropdown">
                            <Link
                                href="/profile"
                                className='dropdown_link'
                                onClick={() => setToggleDropdown(false)}
                            >
                                Profil
                            </Link>
                            <Link
                                href="/create-ad"
                                className='dropdown_link'
                                onClick={() => setToggleDropdown(false)}
                            >
                                Dodaj ogłoszenie
                            </Link>
                            <button 
                                type='button'
                                onClick={() => {
                                    setToggleDropdown(false)
                                    signOut
                                }}
                                className='mt-5 w-full black_btn'
                            >
                                Wyloguj się
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                {providers && Object.values(providers).map((provider) => (
                    <button 
                        type="button"
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className='black_btn'
                    >

                    </button>
                ))}
                </>    
            )}
        </div>

    </nav>
  )
}

export default Nav