import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="mt-auto overflow-hidden bg-[#10231f] text-white">
            <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 sm:px-10 lg:px-12">
                <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1.2fr] lg:gap-10">
                    <div className="max-w-sm">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e3b341] p-1.5 shadow-lg shadow-black/10">
                                <Image src="/assets/logo.png" alt="University logo" width={50} height={50} className="h-full w-full object-contain" />
                            </span>
                            <span className="text-xl font-bold tracking-tight">Karachi<br /><span className="font-normal text-[#e3b341]">University</span></span>
                        </Link>
                        <p className="mt-6 text-sm leading-7 text-[#c1d1cb]">
                            Where curious minds find their direction, their people, and the confidence to shape what comes next.
                        </p>
                        <div className="mt-7 flex gap-3">
                            <Link aria-label="Instagram" href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm font-semibold transition hover:border-[#e3b341] hover:bg-[#e3b341] hover:text-[#10231f]">ig</Link>
                            <Link aria-label="LinkedIn" href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm font-semibold transition hover:border-[#e3b341] hover:bg-[#e3b341] hover:text-[#10231f]">in</Link>
                            <Link aria-label="YouTube" href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm font-semibold transition hover:border-[#e3b341] hover:bg-[#e3b341] hover:text-[#10231f]">yt</Link>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e3b341]">Explore</h2>
                        <ul className="mt-5 space-y-3 text-sm text-[#c1d1cb]">
                            <li><Link className="transition hover:text-white" href="/about">About us</Link></li>
                            <li><Link className="transition hover:text-white" href="/faculty">Our faculty</Link></li>
                            <li><Link className="transition hover:text-white" href="/courses">Courses</Link></li>
                            <li><Link className="transition hover:text-white" href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e3b341]">Campus life</h2>
                        <ul className="mt-5 space-y-3 text-sm text-[#c1d1cb]">
                            <li><Link className="transition hover:text-white" href="#">Student stories</Link></li>
                            <li><Link className="transition hover:text-white" href="#">Events calendar</Link></li>
                            <li><Link className="transition hover:text-white" href="#">Visit campus</Link></li>
                            <li><Link className="transition hover:text-white" href="#">Give to Northbridge</Link></li>
                        </ul>
                    </div>

                    <div className="relative">
                        <span className="absolute -right-6 -top-12 hidden text-8xl font-bold leading-none text-white/4 lg:block">N</span>
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e3b341]">Stay in the loop</h2>
                        <p className="mt-5 max-w-xs text-sm leading-6 text-[#c1d1cb]">Get the latest campus news, stories, and opportunities in your inbox.</p>
                        <form className="mt-5 flex max-w-sm border-b border-white/40 pb-2 focus-within:border-[#e3b341]">
                            <label htmlFor="footer-email" className="sr-only">Email address</label>
                            <input id="footer-email" type="email" placeholder="Your email address" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#91aaa0]" />
                            <button type="submit" aria-label="Subscribe to newsletter" className="pl-4 text-sm font-bold text-[#e3b341] transition hover:text-white">Join &rarr;</button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col gap-4 pt-7 text-xs text-[#91aaa0] sm:flex-row sm:items-center sm:justify-between">
                    <p>&copy; 2025 Karachi University. All rights reserved.</p>
                    <div className="flex gap-5">
                        <Link className="transition hover:text-white" href="#">Privacy</Link>
                        <Link className="transition hover:text-white" href="#">Accessibility</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
