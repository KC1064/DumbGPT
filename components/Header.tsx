'use client'
import { motion } from "motion/react"
import Link from "next/link"


const Header = () => {
    return (
        <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full px-8 flex justify-between items-center py-2">
            <img
                src="./Logo-20.png"
                alt="Logo"
                className="h-20 w-24"
            />
            <div className="text-white flex gap-4 items-center">
                <Link href="/login">
                    <motion.button
                        whileHover={{ rotate: 5, scale: 1.2 }}
                        transition={{ duration: 0.15 }}
                        className="cursor-pointer border-2 font-extrabold p-2 min-w-[90px] h-max rounded-md text-sm">
                        Sign In
                    </motion.button>
                </Link>
                <Link href="/signup" >
                    <motion.button
                        whileHover={{ rotate: 5, scale: 1.2 }}
                        transition={{ duration: 0.15 }}
                        className="cursor-pointer border-2 font-extrabold p-2 min-w-[90px] h-max rounded-md text-sm">
                        Sign Up
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    )
}

export default Header
