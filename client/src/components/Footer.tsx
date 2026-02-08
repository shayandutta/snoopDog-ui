import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return(
        //main container
        <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:justify-between md:items-start md:gap-0 bg-gray-800 p-8 rounded-lg">
            {/* left container */}
            <div className="flex flex-col gap-4 items-center md:items-start">
                <Link href="/" className="flex items-center">
                <Image
                src="/logo.png"
                alt="SnoopDog"
                width={36}
                height={36}
                />
                <p className="hidden md:block text-md font-medium tracking-wider text-white">SNOOPDOG</p>
                </Link>
                <p className="text-gray-400 text-sm"> 2025 SnoopDog</p>
                <p className="text-gray-400 text-sm">All rights reserved</p>
            </div>
            {/* middle container -1 */}
            <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
                <p className="text-amber-50 text-sm font-medium">Links</p>
                <Link href="/" className="text-gray-400 text-sm">Homepage</Link>
                <Link href="/" className="text-gray-400 text-sm">Contact</Link>
                <Link href="/" className="text-gray-400 text-sm">Terms of Service</Link>
                <Link href="/" className="text-gray-400 text-sm">Privacy Policy</Link>
            </div>
            {/* middle container -2 */}
            <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
                <p className="text-amber-50 text-sm font-medium">Links</p>
                <Link href="/" className="text-gray-400 text-sm">All Products</Link>
                <Link href="/" className="text-gray-400 text-sm">New Arrivals</Link>
                <Link href="/" className="text-gray-400 text-sm">Best Sellers</Link>
                <Link href="/" className="text-gray-400 text-sm">Sales</Link>
            </div>
            {/* middle container -3 */}
            <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
                <p className="text-amber-50 text-sm font-medium">Links</p>
                <Link href="/" className="text-gray-400 text-sm">About</Link>
                <Link href="/" className="text-gray-400 text-sm">Contact</Link>
                <Link href="/" className="text-gray-400 text-sm">Blog</Link>
                <Link href="/" className="text-gray-400 text-sm">Affiliate Program</Link>
            </div>
        </div>
    )
}

export default Footer