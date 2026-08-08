'use client'

import { motion } from "framer-motion"
import { Construction } from "lucide-react"

export default function UnderConstruction () {
    return (
        <main className="flex flex-col items-center justify-center mx-auto text-center font-poppins">
            <motion.div
             animate={{ rotate: 360}}
             transition={{ repeat: Infinity, duration: 8, ease: 'linear'}}
            >
                <Construction className="w-20 h-20" />
            </motion.div>
            <h1 className="text-4xl font-extrabold mb-2">Site Under Construction</h1>
            <p className="text-lg text-gray-600">We are currently working on building this page. Please check back later for updates.</p>
        </main>
    )
}