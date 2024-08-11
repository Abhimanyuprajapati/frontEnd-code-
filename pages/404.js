'use client' // Error components must be Client Components
 
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect } from 'react'
 
export default function NotFound({ error, reset }) {
let router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='errorpage'>
      <h2>Something went wrong!</h2>
      <p>Please Go Back. <Link href="/">click here</Link></p>
    </div>
  )
}